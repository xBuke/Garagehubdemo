'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@/lib/types';
import { Calendar, Clock, User, Car, AlertTriangle, Plus } from 'lucide-react';
import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns';

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

  const getFilteredBookings = () => {
    switch (filter) {
      case 'today':
        return bookings.filter(booking => isToday(parseISO(booking.date)));
      case 'upcoming':
        return bookings.filter(booking => !isPast(parseISO(booking.date)) && !isToday(parseISO(booking.date)));
      case 'past':
        return bookings.filter(booking => isPast(parseISO(booking.date)) && !isToday(parseISO(booking.date)));
      default:
        return bookings;
    }
  };

  const getBookingStatus = (booking: Booking) => {
    const bookingDate = parseISO(booking.date);
    
    if (isToday(bookingDate)) {
      return { label: 'Today', color: 'bg-blue-100 text-blue-800' };
    } else if (isTomorrow(bookingDate)) {
      return { label: 'Tomorrow', color: 'bg-green-100 text-green-800' };
    } else if (isPast(bookingDate)) {
      return { label: 'Completed', color: 'bg-gray-100 text-gray-800' };
    } else {
      return { label: 'Upcoming', color: 'bg-purple-100 text-purple-800' };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            Manage customer appointments and service bookings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Filter buttons */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Bookings
        </Button>
        <Button
          variant={filter === 'today' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('today')}
        >
          Today
        </Button>
        <Button
          variant={filter === 'upcoming' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button
          variant={filter === 'past' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('past')}
        >
          Past
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking) => {
          const status = getBookingStatus(booking);
          return (
            <Card key={booking.id} className={booking.urgent ? 'border-red-200 bg-red-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                      <h3 className="text-lg font-semibold">{booking.customerName}</h3>
                      {booking.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4" />
                        <span>{booking.carModel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{booking.service}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(parseISO(booking.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm"><strong>Notes:</strong> {booking.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Complete
                    </Button>
                    {isToday(parseISO(booking.date)) && (
                      <Button variant="secondary" size="sm">
                        Start Service
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-muted-foreground mb-4">
              Customer appointments will appear here
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create First Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
