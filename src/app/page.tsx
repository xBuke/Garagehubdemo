'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/stat-card';
import { Users, MessageSquare, Calendar, AlertTriangle, Clock, Car, Bell, Zap, Megaphone, Settings, TrendingUp, Activity, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

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
  const { t } = useTranslation();
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
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <span>{t('dashboard')}</span>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600 mt-1">{t('welcomeMessage')}</p>
        </div>
      </div>

      {/* Stats Grid - 2x2 responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title={t('totalLeads')}
          value={leads.length}
          icon={Users}
          color="blue"
          urgent={urgentLeads}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title={t('totalBookings')}
          value={bookings.length}
          icon={Calendar}
          color="green"
          urgent={urgentBookings}
          trend={{ value: "15%", isPositive: true }}
        />
        <StatCard
          title={t('messages')}
          value={messages.length}
          icon={MessageSquare}
          color="orange"
          urgent={urgentMessages}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title={t('urgentItems')}
          value={urgentLeads + urgentMessages + urgentBookings}
          icon={AlertTriangle}
          color="red"
          urgent={urgentLeads + urgentMessages + urgentBookings}
          trend={{ value: "3%", isPositive: false }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Recent Leads */}
         <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center space-x-3">
               <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                 <Target className="h-5 w-5 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">{t('recentLeads')}</h3>
             </div>
             <span className="text-base font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{leads.length} {t('total')}</span>
           </div>
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
               <div
                 key={lead.id}
                 className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 ease-in-out border border-gray-200 hover:border-blue-300"
               >
                 <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                   <Users className="h-6 w-6 text-white" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center space-x-2">
                     <p className="text-base font-bold text-gray-900 truncate">{lead.name}</p>
                     {lead.urgent && (
                       <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                     )}
                   </div>
                   <p className="text-sm font-medium text-gray-700 truncate">{lead.carModel} - {lead.issue}</p>
                 </div>
                 <div className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                   {new Date(lead.date).toLocaleDateString()}
                 </div>
               </div>
            ))}
          </div>
        </div>

         {/* Today's Bookings */}
         <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center space-x-3">
               <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                 <Calendar className="h-5 w-5 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">{t('todaysSchedule')}</h3>
             </div>
             <span className="text-base font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{todayBookings.length} {t('appointments')}</span>
           </div>
          <div className="space-y-4">
            {todayBookings.length > 0 ? (
              todayBookings.map((booking, index) => (
                 <div
                   key={booking.id}
                   className="flex items-center space-x-4 p-4 rounded-lg hover:bg-green-50 transition-all duration-200 ease-in-out border border-gray-200 hover:border-green-300"
                 >
                   <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                     <Clock className="h-6 w-6 text-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center space-x-2">
                       <p className="text-base font-bold text-gray-900 truncate">{booking.customerName}</p>
                       {booking.urgent && (
                         <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                       )}
                     </div>
                     <p className="text-sm font-medium text-gray-700 truncate">{booking.service} - {booking.carModel}</p>
                   </div>
                   <div className="text-base font-bold text-gray-900 bg-green-100 px-3 py-1 rounded-lg">
                     {booking.time}
                   </div>
                 </div>
              ))
             ) : (
               <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-gray-200">
                 <div className="h-16 w-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <Car className="h-8 w-8 text-white" />
                 </div>
                 <p className="text-lg font-semibold text-gray-700">No appointments scheduled for today</p>
               </div>
             )}
          </div>
        </div>
      </div>

       {/* Notifications Section */}
       <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
         <div className="flex items-center space-x-3 mb-6">
           <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
             <Bell className="h-5 w-5 text-white" />
           </div>
           <h3 className="text-xl font-bold text-gray-900">{t('notifications')}</h3>
         </div>
         <div className="space-y-3">
           {(urgentLeads > 0 || urgentMessages > 0 || urgentBookings > 0) ? (
             <>
               {urgentLeads > 0 && (
                 <div className="flex items-center space-x-3 p-4 bg-red-500 border-2 border-red-600 rounded-lg shadow-sm">
                   <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
                   <span className="text-base font-semibold text-white">
                     {urgentLeads} urgent lead{urgentLeads > 1 ? 's' : ''} require immediate attention
                   </span>
                 </div>
               )}
               {urgentMessages > 0 && (
                 <div className="flex items-center space-x-3 p-4 bg-orange-500 border-2 border-orange-600 rounded-lg shadow-sm">
                   <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
                   <span className="text-base font-semibold text-white">
                     {urgentMessages} urgent message{urgentMessages > 1 ? 's' : ''} need response
                   </span>
                 </div>
               )}
               {urgentBookings > 0 && (
                 <div className="flex items-center space-x-3 p-4 bg-purple-500 border-2 border-purple-600 rounded-lg shadow-sm">
                   <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
                   <span className="text-base font-semibold text-white">
                     {urgentBookings} urgent booking{urgentBookings > 1 ? 's' : ''} coming up
                   </span>
                 </div>
               )}
             </>
           ) : (
             <div className="text-center py-8 bg-green-50 rounded-lg border-2 border-green-200">
               <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                 <Bell className="h-8 w-8 text-white" />
               </div>
               <p className="text-lg font-semibold text-green-800">{t('allCaughtUp')}</p>
             </div>
           )}
         </div>
       </div>

       {/* Roadmap Section */}
       <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
         <div className="flex items-center space-x-3 mb-6">
           <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">
             <Zap className="h-5 w-5 text-white" />
           </div>
           <h3 className="text-xl font-bold text-gray-900">{t('roadmap')}</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors duration-200">
             <div className="h-14 w-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
               <Megaphone className="h-7 w-7 text-white" />
             </div>
             <h4 className="text-lg font-bold text-gray-900 mb-2">{t('marketing')}</h4>
             <p className="text-sm font-medium text-gray-700 mb-3">{t('marketingDesc')}</p>
             <div className="px-3 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg">{t('comingSoon')}</div>
           </div>
           <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors duration-200">
             <div className="h-14 w-14 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
               <Settings className="h-7 w-7 text-white" />
             </div>
             <h4 className="text-lg font-bold text-gray-900 mb-2">{t('reminders')}</h4>
             <p className="text-sm font-medium text-gray-700 mb-3">{t('remindersDesc')}</p>
             <div className="px-3 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg">{t('comingSoon')}</div>
           </div>
         </div>
    </div>
    </motion.div>
  );
}