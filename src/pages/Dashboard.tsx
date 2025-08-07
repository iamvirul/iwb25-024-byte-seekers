import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  MapPin, Activity, AlertCircle, TrendingUp,
  BarChart3, Clock, CheckCircle, X, Landmark, Ruler, Calendar, Map, User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/common/EmptyState';

interface Land {
  id: number;
  landId: string;
  landName: string;
  landPlace: string;
  landLat: number;
  landLang: number;
  landSize: number;
  landValue: number;
  landType: string;
  registerDate: {
    year: number;
    month: number;
    day: number;
  };
  landStatus: string;
  priority: number;
}

interface Disputes {
  pendingCount: number;
  resolvedCount: number;
}

interface Stats {
  ownerId: number;
  firstName: string;
  lastName: string;
  transfersSent: number;
  transfersReceived: number;
  currentLandsOwned: number;
}

interface SocketResponse {
  event: string;
  response: {
    success: boolean;
    content: {
      stats: Stats;
      disputes: Disputes;
      lands: Land[];
    };
  };
}

const containerStyle = {
  width: '100%',
  height: '500px',
};

const Dashboard = () => {
  const { user } = useAuth();
  const [lands, setLands] = useState<Land[]>([]);
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [disputesData, setDisputesData] = useState<Disputes | null>(null);
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 6.791835,
    lng: 79.939742
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userHasNoLands, setUserHasNoLands] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCyvFLiqccbWJIzBB4rUMkK5-tUP-dHsfA",
    libraries: ['places']
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const calculateCenter = (lands: Land[]) => {
    if (lands.length === 0) return { lat: 6.791835, lng: 79.939742 };

    let lat = 0, lng = 0;
    lands.forEach(land => {
      lat += land.landLat;
      lng += land.landLang;
    });

    return {
      lat: lat / lands.length,
      lng: lng / lands.length
    };
  };

  const fitBounds = (map: google.maps.Map, lands: Land[]) => {
    if (lands.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    lands.forEach(land => {
      bounds.extend(new window.google.maps.LatLng(land.landLat, land.landLang));
    });

    map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
  };

  useEffect(() => {
    if (lands.length > 0 && map) {
      setMapCenter(calculateCenter(lands));
      fitBounds(map, lands);
    }
  }, [lands, map]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `₨ ${(value / 1000000).toFixed(1)}M`;
    }
    else if (value >= 1000) {
      return `₨ ${(value / 1000).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (date: { year: number; month: number; day: number }) => {
    return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
  };

  const handleMarkerClick = (land: Land) => {
    setSelectedLand(land);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLand(null);
  };

  const stats = [
    {
      title: 'මගේ ඉඩම්',
      value: statsData?.currentLandsOwned.toString() || '0',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      change: '+0'
    },
    {
      title: 'ගනුදෙනු',
      value: statsData ? (statsData.transfersSent + statsData.transfersReceived).toString() : '0',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      change: '+0'
    },
    {
      title: 'ගැටළු',
      value: disputesData?.pendingCount.toString() || '0',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      change: '0'
    },
    {
      title: 'සම්පූර්ණ වටිනාකම',
      value: lands.length > 0
        ? formatCurrency(lands.reduce((sum, land) => sum + land.landValue, 0))
        : '₨ 0.00',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+0%'
    }
  ];

  const disputeStatusData = [
    { name: 'බලාපොරොත්තුවෙන්', value: disputesData?.pendingCount || 0, color: '#3B82F6' },
    { name: 'නිරාකරණය', value: disputesData?.resolvedCount || 0, color: '#10B981' }
  ];

  useEffect(() => {
    let socket: WebSocket;
    const userId = localStorage.getItem("userSessionId");

    const connect = () => {
      socket = new WebSocket(`ws://127.0.0.1:8070/proxy/dashboard/${userId}`);

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data: SocketResponse = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.event === "Initial") {
          if (data.response.success) {
            const content = data.response.content;
            setStatsData(content.stats);
            setDisputesData(content.disputes);
            setLands(content.lands);
            setUserHasNoLands(false);
          } else {
            // User is not a land owner
            setUserHasNoLands(true);
            setStatsData(null);
            setDisputesData(null);
            setLands([]);
          }
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (userHasNoLands) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title={`ආයුබෝවන්, ${user?.name || 'පරිශීලක'}! 👋`}
            description="ඔබේ ඉඩම් ලේඛනාගාර ගිණුමේ සියල්ල මෙහි දැකිය හැකිය"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change} මෙම මාසයේ</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mb-8">
            <EmptyState
              icon={User}
              title="ඔබගේ තොරතුරු හමු නොවීය"
              description="ඔබගේ ඉඩම් හිමි තොරතුරු පද්ධතියට එක් කර නොමැත. කරුණාකර පරිපාලකවරයෙකු අමතන්න."
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title={`ආයුබෝවන්, ${user?.name || 'පරිශීලක'}! 👋`}
          description="ඔබේ ඉඩම් ලේඛනාගාර ගිණුමේ සියල්ල මෙහි දැකිය හැකිය"
        />

        {lands.length === 0 && !userHasNoLands ? (
          <>
            <Card className="mb-8">
              <EmptyState
                icon={Clock}
                title="පූරණය වෙමින් පවතී"
                description="ඔබගේ තොරතුරු පූරණය වෙමින් පවතී. කරුණාකර ටික වේලාවක් රැඳී සිටින්න."
              />
            </Card>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-green-600 mt-1">{stat.change} මෙම මාසයේ</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ගැටළු තත්ත්වය</h3>
                      <p className="text-sm text-gray-600">වර්තමාන ගැටළු වර්ගීකරණය</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={disputeStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {disputeStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, 'ප්‍රමාණය']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {disputeStatusData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card>
                  <div className="space-y-4">
                    {isLoaded ? (
                      <div className="border border-gray-300 rounded-md overflow-hidden relative">
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapCenter}
                          zoom={8}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                          options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                          }}
                        >
                          {lands.map((land) => (
                            <Marker
                              key={land.landId}
                              position={{ lat: land.landLat, lng: land.landLang }}
                              onClick={() => handleMarkerClick(land)}
                            />
                          ))}
                        </GoogleMap>
                        <button
                          onClick={() => map && lands.length > 0 && fitBounds(map, lands)}
                          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                          title="Show all lands"
                        >
                          <MapPin className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-100 flex items-center justify-center">
                        <p>සිතියම පූරණය වෙමින් පවතී...</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Land Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedLand && (
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedLand.landName}</h3>
                  <p className="text-sm text-gray-600">{selectedLand.landPlace}</p>
                </div>
                <Badge variant={selectedLand.landStatus === "VERIFIED" ? "success" : "warning"}>
                  {selectedLand.landStatus === "VERIFIED" ? "Verified" : "Pending"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Landmark className="w-5 h-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">ඉඩම් හැඳුනුම්පත</p>
                    <p className="font-medium">{selectedLand.landId}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-5 h-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">ප්‍රමාණය</p>
                    <p className="font-medium">{selectedLand.landSize} sq ft</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">වටිනාකම</p>
                    <p className="font-medium">{formatCurrency(selectedLand.landValue)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">ලියාපදිංචි දිනය</p>
                    <p className="font-medium">{formatDate(selectedLand.registerDate)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;