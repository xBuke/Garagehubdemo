'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Clock, Reply, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  channel: 'whatsapp' | 'facebook' | 'instagram' | 'sms' | 'site-chat';
  from: string;
  contact: string;
  text: string;
  createdAt: string;
  urgent?: boolean;
}

const channels = [
  { id: 'all', name: 'All Messages', icon: MessageSquare, color: 'gray' },
  { id: 'site-chat', name: 'Site Chat', icon: MessageSquare, color: 'indigo', emoji: '💻' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'green', emoji: '📱' },
  { id: 'facebook', name: 'Facebook', icon: MessageSquare, color: 'blue', emoji: '📘' },
  { id: 'instagram', name: 'Instagram', icon: MessageSquare, color: 'pink', emoji: '📷' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'gray', emoji: '💬' },
];

// Demo site chat messages for simulation
const demoSiteChatMessages: Omit<Message, 'id'>[] = [
  {
    channel: 'site-chat',
    from: 'Alex Johnson',
    contact: 'alex.johnson@email.com',
    text: 'Hi! I need urgent help with my 2020 Honda Civic. The engine is making strange noises.',
    createdAt: new Date().toISOString(),
    urgent: true
  },
  {
    channel: 'site-chat',
    from: 'Sarah Miller',
    contact: 'sarah.m@gmail.com',
    text: 'Can you check availability for brake service this week? My brakes are squeaking.',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    urgent: false
  },
  {
    channel: 'site-chat',
    from: 'Mike Chen',
    contact: 'mike.chen@company.com',
    text: 'Emergency! My car won\'t start and I have an important meeting. Can someone help ASAP?',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    urgent: true
  }
];

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChannel, setActiveChannel] = useState('all');
  const [loading, setLoading] = useState(true);

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

  // Simulate real-time messages from site chat
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = demoSiteChatMessages[Math.floor(Math.random() * demoSiteChatMessages.length)];
      const newMessage: Message = {
        ...randomMessage,
        id: `site-${Date.now()}`,
        createdAt: new Date().toISOString(),
        urgent: Math.random() > 0.7 // 30% chance of being urgent
      };

      setMessages(prev => [newMessage, ...prev]);
    }, Math.random() * 20000 + 20000); // Random interval between 20-40 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredMessages = activeChannel === 'all' 
    ? messages 
    : messages.filter(message => message.channel === activeChannel);

  const getChannelCount = (channelId: string) => {
    if (channelId === 'all') return messages.length;
    return messages.filter(m => m.channel === channelId).length;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="space-y-4">
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
        <p className="text-gray-600 mt-2">Manage customer messages from all channels</p>
      </div>

      {/* Channel Tabs */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {channels.map((channel) => {
            const count = getChannelCount(channel.id);
            const isActive = activeChannel === channel.id;
            
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {channel.emoji && <span>{channel.emoji}</span>}
                <span>{channel.name}</span>
                <span className={cn(
                  'px-2 py-0.5 text-xs rounded-full',
                  isActive
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-gray-200 text-gray-600'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-200">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'flex items-start space-x-4 p-4 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer group',
                  index % 2 === 1 && 'odd:bg-gray-50',
                  message.urgent && 'border-l-4 border-red-500 bg-red-50 hover:bg-red-100'
                )}
              >
                {/* Channel Icon */}
                <div className={cn(
                  'h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0',
                  message.channel === 'site-chat' && 'bg-indigo-100',
                  message.channel === 'whatsapp' && 'bg-green-100',
                  message.channel === 'facebook' && 'bg-blue-100',
                  message.channel === 'instagram' && 'bg-pink-100',
                  message.channel === 'sms' && 'bg-gray-100'
                )}>
                  <span className="text-lg">
                    {message.channel === 'site-chat' && '💻'}
                    {message.channel === 'whatsapp' && '📱'}
                    {message.channel === 'facebook' && '📘'}
                    {message.channel === 'instagram' && '📷'}
                    {message.channel === 'sms' && '💬'}
                  </span>
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">{message.from}</h4>
                      {message.urgent && (
                        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="text-xs text-gray-500 capitalize">{message.channel}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatTime(message.createdAt)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.text}</p>
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Phone className="h-3 w-3" />
                    <span>{message.contact}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Simulate reply - would integrate with actual chat system
                      if (message.channel === 'site-chat') {
                        alert('Reply sent to website chat!');
                      }
                    }}
                  >
                    <Reply className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <Archive className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No messages</h3>
              <p className="text-gray-500">
                {activeChannel === 'all' 
                  ? 'No messages in your inbox yet' 
                  : `No ${activeChannel} messages`}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
