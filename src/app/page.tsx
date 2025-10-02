'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/stat-card';
import { Users, MessageSquare, Calendar, AlertTriangle, Clock, Car } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  carModel: string;
  issue: string;
  contact: string;
  date: string;
  urgent?: boolean;
}

interface Booking {
  id: string;
  customerName: string;
  carModel: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  urgent?: boolean;
}

interface Message {
  id: string;
  channel: string;
  from: string;
  contact: string;
  text: string;
  createdAt: string;
  urgent?: boolean;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, bookingsRes, messagesRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/bookings'),
          fetch('/api/messages'),
        ]);

        const [leadsData, bookingsData, messagesData] = await Promise.all([
          leadsRes.json(),
          bookingsRes.json(),
          messagesRes.json(),
        ]);

        setLeads(leadsData);
        setBookings(bookingsData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const urgentLeads = leads.filter(lead => lead.urgent).length;
  const urgentMessages = messages.filter(message => message.urgent).length;
  const urgentBookings = bookings.filter(booking => booking.urgent).length;
  const todayBookings = bookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    return booking.date === today;
  });

  const recentLeads = leads.slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your garage today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={leads.length}
          icon={Users}
          color="blue"
          urgent={urgentLeads}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="New Messages"
          value={messages.length}
          icon={MessageSquare}
          color="green"
          urgent={urgentMessages}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title="Today's Bookings"
          value={todayBookings.length}
          icon={Calendar}
          color="orange"
          urgent={urgentBookings}
          trend={{ value: "3%", isPositive: false }}
        />
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          icon={AlertTriangle}
          color="purple"
          urgent={urgentBookings}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            <span className="text-sm text-gray-500">{leads.length} total</span>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                    {lead.urgent && (
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{lead.carModel} - {lead.issue}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(lead.date).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Today's Bookings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <span className="text-sm text-gray-500">{todayBookings.length} appointments</span>
          </div>
          <div className="space-y-4">
            {todayBookings.length > 0 ? (
              todayBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{booking.customerName}</p>
                      {booking.urgent && (
                        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{booking.service} - {booking.carModel}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {booking.time}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}