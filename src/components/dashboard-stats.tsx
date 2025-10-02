'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead, Message, Booking } from '@/lib/types';
import { Users, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';

export function DashboardStats() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, messagesRes, bookingsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/messages'),
          fetch('/api/bookings'),
        ]);

        const [leadsData, messagesData, bookingsData] = await Promise.all([
          leadsRes.json(),
          messagesRes.json(),
          bookingsRes.json(),
        ]);

        setLeads(leadsData);
        setMessages(messagesData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  const urgentLeads = leads.filter(lead => lead.urgent).length;
  const urgentMessages = messages.filter(message => message.urgent).length;
  const urgentBookings = bookings.filter(booking => booking.urgent).length;
  const todayBookings = bookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    return booking.date === today;
  }).length;

  const stats = [
    {
      title: 'Total Leads',
      value: leads.length,
      icon: Users,
      urgent: urgentLeads,
      color: 'text-blue-600',
    },
    {
      title: 'New Messages',
      value: messages.length,
      icon: MessageSquare,
      urgent: urgentMessages,
      color: 'text-green-600',
    },
    {
      title: 'Today\'s Bookings',
      value: todayBookings,
      icon: Calendar,
      urgent: urgentBookings,
      color: 'text-purple-600',
    },
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: AlertTriangle,
      urgent: urgentBookings,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.urgent > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {stat.urgent} urgent
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
