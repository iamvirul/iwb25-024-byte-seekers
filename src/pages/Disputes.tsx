import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import {
  Gavel,
  Plus,
  AlertCircle,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Users,
  ArrowRight,
  BarChart3,
  Shield,
  Scale,
  Eye,
  Download,
  Filter,
  Hash,
  Database
} from 'lucide-react';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';
import toast from 'react-hot-toast';

interface DisputeComment {
  id: number;
  comment: string;
  createdAt: [number, number];
  disputesId: number;
}

interface DisputeDocument {
  id: number;
  docPath: string;
  uploadedDate: [number, number];
  disputesId: number;
}

interface LegalPrecedent {
  id: number;
  year: { year: number; month: number; day: number };
  headline: string;
  court: string;
  decision: string;
  summary: string;
  disputesId: number;
}

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
  registerDate: { year: number; month: number; day: number };
  landStatus: string;
  priority: number;
}

interface LegalOfficer {
  id: number;
  firstName: string;
  lastName: string;
  baslId: string;
  initialCost: number;
}

declare interface PayHere {
  onCompleted: (orderId: string) => void;
  onDismissed: () => void;
  onError: (error: any) => void;
  startPayment: (payment: any) => void;
}

declare interface Window {
  payhere: PayHere;
}

interface UserData {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nic: number[];
  sludi: number[];
  contactNo: number[];
  address: number[];
}

interface Dispute {
  disputecomments: DisputeComment[];
  land: Land;
  legalofficer: LegalOfficer;
  user: UserData;
  disputedocuments: DisputeDocument[];
  legalprecedents: LegalPrecedent[];
  id: number;
  caseId: string;
  witnessName: string;
  disputesDetails: string;
  estimateTime: string;
  status: string;
  createdAt: [number, number];
  landsId: number;
  legalOfficerId: number;
  usersId: number;
}

interface Stats {
  value: {
    usersId: number;
    total_disputes: number;
    pending_disputes: number;
    resolved_disputes: number;
    total_comments: number;
  };
}

interface InitialData {
  event: string;
  response: {
    success: boolean;
    content: {
      disputes: Dispute[];
      stats: Stats;
    };
  };
}

const Disputes = () => {
  const PRECEDENTS_PER_PAGE = 4;
  const COMMENTS_PER_PAGE = 5;

  const { user } = useAuth();
  const { fileDispute, resolveDispute } = useBlockchain();
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [formData, setFormData] = useState({
    propertyId: '',
    defendant: '',
    legalOfficerId: '',
    initialCost: 0,
    description: '',
    documents: []
  });
  const [precedentPage, setPrecedentPage] = useState(0);
  const [commentPage, setCommentPage] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState('');
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [stats, setStats] = useState<Stats['value']>({
    usersId: 0,
    total_disputes: 0,
    pending_disputes: 0,
    resolved_disputes: 0,
    total_comments: 0
  });
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [properties, setProperties] = useState([]);

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch =
      dispute.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.land.landId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.disputesDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.witnessName.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;

    if (statusFilter !== 'all') matchesFilter = matchesFilter && dispute.status === statusFilter;

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start).getTime();
      const disputeDate = new Date(dispute.createdAt[0] * 1000).getTime();
      if (disputeDate < startDate) matchesFilter = false;
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end).getTime() + 86400000; // Add 1 day
      const disputeDate = new Date(dispute.createdAt[0] * 1000).getTime();
      if (disputeDate > endDate) matchesFilter = false;
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt[0] - a.createdAt[0];
      case 'oldest':
        return a.createdAt[0] - b.createdAt[0];
      case 'status':
        return a.status.localeCompare(b.status);
      case 'property':
        return a.land.landId.localeCompare(b.land.landId);
      default:
        return 0;
    }
  });


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Search className="w-3 h-3 mr-1" />
            විමර්ශනය
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            නිරාකරණය
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </span>
        );
    }
  };

  const getDisputeIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'RESOLVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const disputeStats = [
    { label: 'මුළු ගැටළු', value: stats.total_disputes, icon: Gavel, color: 'text-red-600' },
    { label: 'රැදී සිටින', value: stats.pending_disputes, icon: Clock, color: 'text-yellow-600' },
    { label: 'මුළු අදහස්', value: stats.total_comments, icon: Search, color: 'text-blue-600' },
    { label: 'නිරාකරණය', value: stats.resolved_disputes, icon: CheckCircle, color: 'text-green-600' }
  ];

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'PENDING', label: 'රැදී සිටින' },
    { value: 'RESOLVED', label: 'නිරාකරණය' }
    // Add other statuses if needed
  ];

  useEffect(() => {
    let socket: WebSocket;
    const userId = localStorage.getItem("userSessionId");
    const connect = () => {
      socket = new WebSocket(`ws://127.0.0.1:8070/proxy/disputes/${userId}`);

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);

        switch (data.event) {
          case "Dispute Created":
            setDisputes(prev => [...prev, data.message.dispute]);
            setStats(prev => ({
              ...prev,
              total_disputes: prev.total_disputes + 1,
              pending_disputes: prev.pending_disputes + 1
            }));
            break;
          case "Initial":
            setDisputes(data.response.content.disputes);
            setStats(data.response.content.stats.value);
            setLegalOfficers(data.response.content.legal_officers)
            setProperties(data.response.content.lands)
            break;
          case 'Status Updated':
            setDisputes(prev => {
              return prev.map(case_ =>
                case_.id === data.message.id
                  ? { ...case_, status: 'RESOLVED' }
                  : case_
              );
            });
            setStats(prev => ({
              ...prev,
              resolved_disputes: prev.resolved_disputes + 1,
              pending_disputes: prev.pending_disputes - 1
            }));
            break;
          case 'Estimate Time Updated':
            setDisputes(prev => prev.map(case_ =>
              case_.id === data.message.id
                ? { ...case_, estimateTime: data.message.estimateTime }
                : case_
            ));
            break;
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
    connect();
    return () => socket?.close();
  }, []);


  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.propertyId) {
        toast.error('Please select a property');
      }
      if (!formData.defendant) {
        toast.error('Please enter defendant/witness name');
      }
      if (!formData.legalOfficerId) {
        toast.error('Please select a legal officer');
      }
      if (!formData.description) {
        toast.error('Please enter dispute details');
      }
      if (formData.documents.length === 0) {
        toast.error('Please upload at least one document');
      }
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        toast.error('User authentication missing');
      }

      const selectedOfficer = legalOfficers.find(lo => lo.id === parseInt(formData.legalOfficerId));
      if (!selectedOfficer) {
        toast.error('Please select a legal officer');
      }
      const amountString = formData.initialCost.toFixed(2);
      // 1. First get the checkout data
      const checkoutUrl = `/api/land_owner/checkout/${userId}?amount=${amountString}&barslId=${selectedOfficer.baslId}`;

      const checkoutResponse = await fetch(checkoutUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!checkoutResponse.ok) {
        const errorText = await checkoutResponse.text();
        throw new Error(errorText || 'Failed to prepare payment');
      }

      const checkoutData = await checkoutResponse.json();
      const paymentData = checkoutData.content.data;

      const payment = {
        sandbox: paymentData.sandbox,
        merchant_id: paymentData.merchant_id,
        return_url: undefined,
        cancel_url: undefined,
        notify_url: "YOUR_BACKEND_NOTIFY_URL", // Replace with your actual notify URL
        order_id: paymentData.order_id,
        items: paymentData.items,
        amount: paymentData.amount,
        currency: paymentData.currency,
        hash: paymentData.hash,
        first_name: paymentData.first_name,
        last_name: paymentData.last_name,
        email: paymentData.email,
        phone: paymentData.phone,
        address: paymentData.address,
        city: paymentData.city,
        country: paymentData.country,
        delivery_address: paymentData.address || '',
        delivery_city: paymentData.city || '',
        delivery_country: paymentData.country || '',
        custom_1: `dispute_for_property_${formData.propertyId}`,
        custom_2: `legal_officer_${selectedOfficer.id}`
      };

      (window as any).payhere.onCompleted = async function onCompleted(orderId: string) {
        console.log("Payment completed. OrderID:" + orderId);

        try {
          // Only submit dispute after successful payment
          await submitDispute(token, formData);
          toast.success('Payment and dispute submission successful!');
          resetForm();
        } catch (error) {
          console.error('Error submitting dispute:', error);
          toast.success('Payment succeeded but dispute submission failed. Please contact support.');
        }
      };

      (window as any).payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        toast.error('Payment was cancelled. Please complete payment to submit your dispute.');
      };

      (window as any).payhere.onError = function onError(error: any) {
        console.log("Error:" + error);
        toast.error('Payment failed. Please try again.');
      };

      // 4. Start PayHere payment
      (window as any).payhere.startPayment(payment);

    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  const submitDispute = async (token: string, formData: any) => {
    try {
      const disputeData = new FormData();
      const userId = localStorage.getItem('userId');
      disputeData.append('witnessName', formData.defendant); // Assuming defendant is the witness
      disputeData.append('disputesDetails', formData.description);
      disputeData.append('landsId', formData.propertyId);
      disputeData.append('legalOfficerId', formData.legalOfficerId);
      disputeData.append('userId', userId);

      formData.documents.forEach((file: File) => {
        disputeData.append('documents', file);
      });

      // Make the API request
      const response = await fetch('api/land_owner/dispute/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: disputeData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(errorText || 'Failed to submit dispute');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in submitDispute:', error);
      throw error;
    }
  };

  // Updated reset form function
  const resetForm = () => {
    setFormData({
      propertyId: '',
      defendant: '',
      legalOfficerId: '',
      initialCost: 0.00,
      description: '',
      documents: []
    });
    setShowNewDispute(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full text-sm font-medium text-red-700 mb-6">
            <Scale className="w-4 h-4 mr-2" />
            AI සහායක ගැටළු නිරාකරණ පද්ධතිය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ගැටළු කළමනාකරණය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඉඩම් සම්බන්ධ ගැටළු සහ නිරාකරණ - AI සහ බ්ලොක්චේන් තාක්ෂණයෙන් සහාය
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {disputeStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover className="text-center h-full">
                <div className="flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* New Dispute Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={() => setShowNewDispute(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            නව ගැටළුවක් ගොනු කරන්න
          </button>
        </motion.div>

        {/* New Dispute Form */}
        {showNewDispute && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">නව ගැටළුවක් ගොනු කරන්න</h2>

              <form onSubmit={handleSubmitDispute} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                      ඉඩම් ID
                    </label>
                    <select
                      id="propertyId"
                      value={formData.propertyId}
                      onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">ඉඩමක් තෝරන්න</option>
                      {properties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.landName} ({property.landPlace})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="defendant" className="block text-sm font-medium text-gray-700 mb-2">
                      විත්තිකරු
                    </label>
                    <input
                      type="text"
                      id="defendant"
                      value={formData.defendant}
                      onChange={(e) => setFormData({ ...formData, defendant: e.target.value })}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="විත්තිකරුගේ නම"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="legalOfficer" className="block text-sm font-medium text-gray-700 mb-2">
                      නීති නිලධාරී
                    </label>
                    <div className="flex items-center gap-4">
                      <select
                        id="legalOfficer"
                        value={formData.legalOfficerId}
                        onChange={(e) => {
                          const selectedOfficer = legalOfficers.find(lo => lo.id === parseInt(e.target.value));
                          setFormData({
                            ...formData,
                            legalOfficerId: e.target.value,
                            initialCost: selectedOfficer?.initialCost || 0
                          });
                        }}
                        className="block flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">නීති නිලධාරියෙකු තෝරන්න</option>
                        {legalOfficers.map(officer => (
                          <option key={officer.id} value={officer.id}>
                            {officer.firstName} {officer.lastName} (BASL: {officer.baslId})
                          </option>
                        ))}
                      </select>
                      {formData.legalOfficerId && (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium">
                          LKR {formData.initialCost.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    ගැටළුවේ විස්තරය
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="ගැටළුව සම්බන්ධයෙන් සම්පූර්ණ විස්තරයක් ලියන්න"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
                    සහාය ලේඛන (බහු තේරීම්)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors bg-gradient-to-br from-gray-50 to-red-50/30">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      id="documents"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files || []);
                        setFormData({
                          ...formData,
                          documents: [...formData.documents, ...newFiles]
                        });
                      }}
                      className="hidden"
                    />
                    <label htmlFor="documents" className="cursor-pointer">
                      <span className="text-lg font-medium text-red-600 hover:text-red-500">ලේඛන තෝරන්න</span>
                      <span className="text-gray-500"> හෝ මෙහි ඇද දමන්න</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      PDF, DOC, DOCX, JPG, PNG (උපරිම 10MB එක් එක් ගොනුව සඳහා)
                    </p>
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.documents.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                            <p className="text-sm text-gray-700 font-medium">
                              {file.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFiles = [...formData.documents];
                                updatedFiles.splice(index, 1);
                                setFormData({ ...formData, documents: updatedFiles });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewDispute(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-colors"
                  >
                    Pay &  ගැටළුව ගොනු කරන්න
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-8">
            <div className="space-y-4">
              {/* Combined Search and Filter Row */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {/* Search Bar - Takes remaining space */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="ගැටළු ID, ඉඩම් ID හෝ විස්තරය ඇතුළත් කරන්න..."
                  />
                </div>

                {/* Status Filter - Fixed width */}
                <div className="w-full md:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* View Toggle and Results Count */}
                <div className="flex items-center gap-3 ml-auto">
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {filteredDisputes.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Disputes List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ගැටළු
              </h2>
              {filteredDisputes.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredDisputes.length} න් {disputes.length}
                </div>
              )}
            </div>

            {filteredDisputes.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Gavel}
                  title="ගැටළු හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "නව ගැටළුවක් ගොනු කරන්න",
                    onClick: () => setShowNewDispute(true)
                  }}
                />
              </Card>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {filteredDisputes.map((dispute, index) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === 'grid' ? 'h-full' : ''}
                  >
                    {viewMode === 'grid' ? (
                      <div className="h-full">
                        <Card hover onClick={() => setSelectedDispute(dispute)} className="cursor-pointer h-full flex flex-col">
                          <div className="flex items-start justify-between flex-1">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {getDisputeIcon(dispute.status)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {dispute.caseId}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {dispute.disputesDetails}
                                </p>
                                <div className="space-y-1 text-sm text-gray-500 mb-4">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    ඉඩම්: {dispute.land.landId}
                                  </div>
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    සාක්ෂිකරු: {dispute.witnessName}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(dispute.createdAt[0])}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div>
                              {getStatusBadge(dispute.status)}
                            </div>
                            <button className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Card hover onClick={() => setSelectedDispute(dispute)} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                              {getDisputeIcon(dispute.status)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {dispute.caseId}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1">{dispute.land.landId} • {dispute.witnessName}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDate(dispute.createdAt[0])}</span>
                                <span>•</span>
                                {getStatusBadge(dispute.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Full Details Modal */}
          {showFullDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">සම්පූර්ණ ගැටළු විස්තර</h2>
                    <button
                      onClick={() => setShowFullDetails(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* All dispute details */}
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                        <p className="font-medium mt-1">{selectedDispute.land.landId}</p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">ඉඩම් නම:</span>
                        <p className="font-medium mt-1">{selectedDispute.land.landName}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">ගැටළු විස්තර</h3>
                        <p className="text-gray-600">{selectedDispute.disputesDetails}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">තත්ත්වය</h3>
                        {getStatusBadge(selectedDispute.status)}
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">සාක්ෂිකරු:</span>
                        <p className="font-medium mt-1">{selectedDispute.witnessName}</p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">නඩු නීතිඥ:</span>
                        <p className="font-medium mt-1">
                          {selectedDispute.legalofficer?.firstName} {selectedDispute.legalofficer?.lastName}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">ඇස්තමේන්තු කළ කාලය:</span>
                        <p className="font-medium mt-1">
                          {selectedDispute.estimateTime || 'නොදක්වා ඇත'}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">ගොනු කළ දිනය:</span>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(selectedDispute.createdAt[0])}
                        </div>
                      </div>
                    </div>

                    {/* All documents */}
                    {selectedDispute.disputedocuments.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">සියලු ලේඛන</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedDispute.disputedocuments.map((doc, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <FileText className="w-5 h-5 mr-3 text-gray-600" />
                              <div>
                                <p className="font-medium">{doc.docPath.split('/').pop()}</p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(doc.uploadedDate[0])}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All legal precedents */}
                    {selectedDispute.legalprecedents.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium text-gray-900">සියලු නීතිමය පූර්වාදර්ශ</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setPrecedentPage(p => Math.max(p - 1, 0))}
                              disabled={precedentPage === 0}
                              className={`p-1 rounded ${precedentPage === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm text-gray-600">
                              පිටු {precedentPage + 1} / {Math.ceil(selectedDispute.legalprecedents.length / PRECEDENTS_PER_PAGE)}
                            </span>
                            <button
                              onClick={() => setPrecedentPage(p =>
                                Math.min(p + 1, Math.ceil(selectedDispute.legalprecedents.length / PRECEDENTS_PER_PAGE) - 1)
                              )}
                              disabled={(precedentPage + 1) * PRECEDENTS_PER_PAGE >= selectedDispute.legalprecedents.length}
                              className={`p-1 rounded ${(precedentPage + 1) * PRECEDENTS_PER_PAGE >= selectedDispute.legalprecedents.length ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {selectedDispute.legalprecedents
                            .slice(
                              precedentPage * PRECEDENTS_PER_PAGE,
                              (precedentPage + 1) * PRECEDENTS_PER_PAGE
                            )
                            .map((precedent, index) => (
                              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-lg">
                                    {precedent.headline}
                                  </h4>
                                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                    {precedent.court.replace('_', ' ')}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {precedent.year.year} - {precedent.decision}
                                </p>
                                <p className="mt-2 text-gray-700">{precedent.summary}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* All comments */}
                    {selectedDispute.disputecomments.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium text-gray-900">සියලු අදහස්</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setCommentPage(p => Math.max(p - 1, 0))}
                              disabled={commentPage === 0}
                              className={`p-1 rounded ${commentPage === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm text-gray-600">
                              පිටු {commentPage + 1} / {Math.ceil(selectedDispute.disputecomments.length / COMMENTS_PER_PAGE)}
                            </span>
                            <button
                              onClick={() => setCommentPage(p =>
                                Math.min(p + 1, Math.ceil(selectedDispute.disputecomments.length / COMMENTS_PER_PAGE) - 1)
                              )}
                              disabled={(commentPage + 1) * COMMENTS_PER_PAGE >= selectedDispute.disputecomments.length}
                              className={`p-1 rounded ${(commentPage + 1) * COMMENTS_PER_PAGE >= selectedDispute.disputecomments.length ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {selectedDispute.disputecomments
                            .sort((a, b) => b.createdAt[0] - a.createdAt[0])
                            .slice(
                              commentPage * COMMENTS_PER_PAGE,
                              (commentPage + 1) * COMMENTS_PER_PAGE
                            )
                            .map((comment, index) => (
                              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">
                                    {selectedDispute.legalofficer.firstName + selectedDispute.legalofficer.lastName || 'නිලධාරියෙක්'}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {formatDate(comment.createdAt[0])}
                                  </span>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">
                                  {comment.comment}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setShowFullDetails(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      වසන්න
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Dispute Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedDispute ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">ගැටළු විස්තර</h2>

                      <div className="space-y-4">
                        {/* Case header and basic info */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {selectedDispute.caseId}
                          </h3>
                          {getStatusBadge(selectedDispute.status)}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">ගැටළුවේ විස්තරය</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {selectedDispute.disputesDetails}
                          </p>
                        </div>

                        {/* Property details grid */}
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                            <p className="font-medium mt-1">{selectedDispute.land.landId}</p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-600">ඉඩම් නම:</span>
                            <p className="font-medium mt-1">{selectedDispute.land.landName}</p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-600">සාක්ෂිකරු:</span>
                            <p className="font-medium mt-1">{selectedDispute.witnessName}</p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-600">නඩු නීතිඥ:</span>
                            <p className="font-medium mt-1">
                              {selectedDispute.legalofficer.firstName} {selectedDispute.legalofficer.lastName}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-600">ඇස්තමේන්තු කළ කාලය:</span>
                            <p className="font-medium mt-1">
                              {selectedDispute.estimateTime || 'නොදක්වා ඇත'}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-600">ගොනු කළ දිනය:</span>
                            <div className="flex items-center mt-1">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {formatDate(selectedDispute.createdAt[0])}
                            </div>
                          </div>
                        </div>

                        {/* Documents section */}
                        {selectedDispute.disputedocuments.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">සහාය ලේඛන</h4>
                            <div className="space-y-2">
                              {selectedDispute.disputedocuments.slice(0, 3).map((doc, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <FileText className="w-4 h-4 mr-2" />
                                  {doc.docPath.split('/').pop()}
                                </div>
                              ))}
                              {selectedDispute.disputedocuments.length > 3 && (
                                <div className="text-sm text-blue-600">
                                  + {selectedDispute.disputedocuments.length - 3} more documents
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Legal precedents (limited to 3) */}
                        {selectedDispute.legalprecedents.length > 0 && (
                          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                              <Scale className="w-4 h-4 mr-2" />
                              නීතිමය පූර්වාදර්ශ ({selectedDispute.legalprecedents.length})
                            </h4>
                            <div className="space-y-2">
                              {selectedDispute.legalprecedents
                                .slice(0, 3)
                                .map((precedent, index) => (
                                  <div key={index} className="text-sm text-purple-700">
                                    <p className="font-medium">
                                      {precedent.headline} ({precedent.year.year})
                                    </p>
                                    <p className="text-xs">{precedent.court.replace('_', ' ')}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Comments (limited to 3) */}
                        {selectedDispute.disputecomments.length > 0 && (
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                                අදහස් ({selectedDispute.disputecomments.length})
                              </h4>
                            </div>
                            <div className="divide-y divide-gray-200">
                              {selectedDispute.disputecomments
                                .sort((a, b) => b.createdAt[0] - a.createdAt[0])
                                .slice(0, 3)
                                .map((comment, index) => (
                                  <div key={index} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-gray-700">
                                        {selectedDispute.legalofficer.firstName + selectedDispute.legalofficer.lastName || 'නිලධාරියෙක්'}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(comment.createdAt[0])}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">
                                      {comment.comment}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* View full details button */}
                        <div className="border-t pt-4">
                          <button
                            onClick={() => setShowFullDetails(true)}
                            className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            සම්පූර්ණ විස්තර
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Gavel className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ගැටළුවක් තෝරන්න</h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට ගැටළුවක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span>සම්පූර්ණ ගැටළු විස්තර</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span>අදහස් සහ අනුස්මරණ</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>නීතිමය පූර්වාදර්ශ</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Disputes;