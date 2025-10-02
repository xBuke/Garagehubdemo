'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Car, AlertTriangle, Plus, Filter, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data.sort((a: Booking, b: Booking) => 
          new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime()
        ));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  const isPast = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString < today;
  };

  const getFilteredBookings = () => {
    switch (filter) {
      case 'today':
        return bookings.filter(booking => isToday(booking.date));
      case 'upcoming':
        return bookings.filter(booking => !isPast(booking.date) && !isToday(booking.date));
      case 'past':
        return bookings.filter(booking => isPast(booking.date));
      default:
        return bookings;
    }
  };

  const getBookingStatus = (booking: Booking) => {
    if (isToday(booking.date)) {
      return { label: 'Today', color: 'bg-blue-100 text-blue-800' };
    } else if (isPast(booking.date)) {
      return { label: 'Completed', color: 'bg-gray-100 text-gray-800' };
    } else {
      return { label: 'Upcoming', color: 'bg-green-100 text-green-800' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage customer appointments and service bookings</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Bookings', count: bookings.length },
            { id: 'today', label: 'Today', count: bookings.filter(b => isToday(b.date)).length },
            { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => !isPast(b.date) && !isToday(b.date)).length },
            { id: 'past', label: 'Past', count: bookings.filter(b => isPast(b.date)).length }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                filter === filterOption.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service & Vehicle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking, index) => {
                  const status = getBookingStatus(booking);
                  return (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        'hover:bg-gray-50 transition-all duration-200',
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50',
                        booking.urgent && 'border-l-4 border-red-500 bg-red-50/50'
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-green-600">
                              {booking.customerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-semibold text-gray-900">{booking.customerName}</p>
                              {booking.urgent && (
                                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{booking.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Car className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{booking.carModel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{booking.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.notes ? (
                          <p className="text-sm text-gray-600 max-w-xs truncate">{booking.notes}</p>
                        ) : (
                          <span className="text-xs text-gray-400">No notes</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {isToday(booking.date) && (
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-500 mb-6">
              Customer appointments will appear here
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Create First Booking
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
