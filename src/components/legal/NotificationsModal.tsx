import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, X, CheckCircle, Clock, AlertTriangle, Calendar, Gavel, FileText, Users, Settings, Trash2, BookMarked as MarkAsRead } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Notification {
  id: string;
  type: 'case_update' | 'hearing_reminder' | 'document_received' | 'system_alert';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOTIF001',
      type: 'hearing_reminder',
      title: 'විභාගය මතක් කිරීම',
      message: 'CASE003 සඳහා හෙට දින 2:00 PM විභාගය නියමිතයි',
      timestamp: Date.now() - 3600000,
      read: false,
      priority: 'high'
    },
    {
      id: 'NOTIF002',
      type: 'case_update',
      title: 'නව සිද්ධියක් පවරන ලදී',
      message: 'CASE004 - කොන්ත්‍රාක්ටු ගැටළුව ඔබට පවරන ලදී',
      timestamp: Date.now() - 7200000,
      read: false,
      priority: 'medium'
    },
    {
      id: 'NOTIF003',
      type: 'document_received',
      title: 'නව ලේඛනයක් ලැබුණි',
      message: 'CASE001 සඳහා අතිරේක සාක්ෂි ලේඛන ලැබුණි',
      timestamp: Date.now() - 14400000,
      read: true,
      priority: 'medium'
    },
    {
      id: 'NOTIF004',
      type: 'system_alert',
      title: 'පද්ධති යාවත්කාලීනය',
      message: 'නීතිමය ලේඛනාගාර පද්ධතිය අද රාත්‍රී 11:00 PM සිට යාවත්කාලීන වේ',
      timestamp: Date.now() - 21600000,
      read: true,
      priority: 'low'
    },
    {
      id: 'NOTIF005',
      type: 'case_update',
      title: 'සිද්ධියක් නිරාකරණය',
      message: 'CASE002 සාර්ථකව නිරාකරණය කරන ලදී',
      timestamp: Date.now() - 86400000,
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'hearing_reminder':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'case_update':
        return <Gavel className="w-5 h-5 text-blue-600" />;
      case 'document_received':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'system_alert':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} මිනිත්තුවකට පෙර`;
    } else if (hours < 24) {
      return `${hours} පැයකට පෙර`;
    } else {
      return `${days} දිනකට පෙර`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">දැනුම්දීම්</h3>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} නව දැනුම්දීම්` : 'සියලු දැනුම්දීම් කියවා ඇත'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { key: 'all', label: 'සියල්ල', count: notifications.length },
            { key: 'unread', label: 'නොකියවූ', count: unreadCount },
            { key: 'high', label: 'වැදගත්', count: notifications.filter(n => n.priority === 'high').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <Button
              variant="outline"
              size="sm"
              icon={CheckCircle}
              onClick={markAllAsRead}
            >
              සියල්ල කියවූ ලෙස සලකුණු කරන්න
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[50vh]">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">දැනුම්දීම් නොමැත</h4>
              <p className="text-gray-600">
                {filter === 'unread' ? 'සියලු දැනුම්දීම් කියවා ඇත' : 'නව දැනුම්දීම් නොමැත'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="කියවූ ලෙස සලකුණු කරන්න"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="ඉවත් කරන්න"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              මුළු දැනුම්දීම්: {notifications.length}
            </p>
            <Button variant="outline" size="sm" icon={Settings}>
              දැනුම්දීම් සැකසුම්
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationsModal;