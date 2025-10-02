import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: string;
}

const translations: Translations = {
  // Dashboard
  dashboard: 'Dashboard',
  welcomeMessage: 'Welcome back! Here\'s what\'s happening at your garage today.',
  totalLeads: 'Total Leads',
  totalBookings: 'Total Bookings',
  messages: 'Messages',
  urgentItems: 'Urgent Items',
  recentLeads: 'Recent Leads',
  todaysSchedule: 'Today\'s Schedule',
  total: 'total',
  appointments: 'appointments',
  notifications: 'Notifications',
  allCaughtUp: 'All caught up! No urgent items.',
  roadmap: 'Coming Features',
  marketing: 'Marketing Tools',
  marketingDesc: 'Customer acquisition and retention features',
  reminders: 'Smart Reminders',
  remindersDesc: 'Automated follow-ups and notifications',
  comingSoon: 'Coming Soon',
  
  // Chat
  chatTitle: 'Hi! How can I help you with your vehicle today?',
  chatResponse: 'Thanks for your message! Our team will get back to you shortly. For urgent matters, please call us directly.',
  chatSupport: 'GarageHub Support',
  chatSubtitle: 'We\'re here to help!',
  chatPlaceholder: 'Type your message...',
  chatReplyTime: 'Typically replies in a few minutes',
};

export function useTranslation() {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return { t };
}