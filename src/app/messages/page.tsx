'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Message, Channel } from '@/lib/types';
import { MessageSquare, Phone, AlertTriangle, Reply } from 'lucide-react';
import { format } from 'date-fns';

const channelIcons = {
  whatsapp: '📱',
  facebook: '📘',
  instagram: '📷',
  sms: '💬',
};

const channelColors = {
  whatsapp: 'bg-green-100 text-green-800',
  facebook: 'bg-blue-100 text-blue-800',
  instagram: 'bg-pink-100 text-pink-800',
  sms: 'bg-gray-100 text-gray-800',
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Channel | 'all'>('all');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data.sort((a: Message, b: Message) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(message => message.channel === filter);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Customer messages from all channels
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Messages
        </Button>
        {(['whatsapp', 'facebook', 'instagram', 'sms'] as Channel[]).map((channel) => (
          <Button
            key={channel}
            variant={filter === channel ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(channel)}
            className="capitalize"
          >
            {channelIcons[channel]} {channel}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={message.urgent ? 'border-red-200 bg-red-50' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <Badge className={channelColors[message.channel]}>
                      {channelIcons[message.channel]} {message.channel}
                    </Badge>
                    <h3 className="font-semibold">{message.from}</h3>
                    {message.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{message.contact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm">
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    Create Lead
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {filter === 'all' ? 'No messages yet' : `No ${filter} messages`}
            </h3>
            <p className="text-muted-foreground">
              Messages from customers will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
