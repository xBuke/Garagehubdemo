'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lead } from '@/lib/types';
import { Phone, Clock, AlertTriangle, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage potential customers and follow up on inquiries
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className={lead.urgent ? 'border-red-200 bg-red-50' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    {lead.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Car:</strong> {lead.carModel}</p>
                    <p><strong>Issue:</strong> {lead.issue}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{lead.contact}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{format(new Date(lead.date), 'MMM dd, yyyy HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Call
                  </Button>
                  <Button size="sm">
                    Convert to Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No leads yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first potential customer
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add First Lead
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
