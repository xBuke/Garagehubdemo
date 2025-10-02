import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: string;
}

type Language = 'en' | 'hr';

const translations: Record<Language, Translations> = {
  en: {
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
    
    // Navigation
    inbox: 'Inbox',
    leads: 'Leads',
    bookings: 'Bookings',
    customers: 'Customers',
    cars: 'Cars',
    
    // Chat
    chatTitle: 'Hi! How can I help you with your vehicle today?',
    chatResponse: 'Thanks for your message! Our team will get back to you shortly. For urgent matters, please call us directly.',
    chatSupport: 'GarageHub Support',
    chatSubtitle: 'We\'re here to help!',
    chatPlaceholder: 'Type your message...',
    chatReplyTime: 'Typically replies in a few minutes',
  },
  hr: {
    // Dashboard
    dashboard: 'Nadzorna ploča',
    welcomeMessage: 'Dobrodošli! Evo što se događa u vašoj radionici danas.',
    totalLeads: 'Ukupno potencijalnih klijenata',
    totalBookings: 'Ukupno rezervacija',
    messages: 'Poruke',
    urgentItems: 'Hitni predmeti',
    recentLeads: 'Nedavni potencijalni klijenti',
    todaysSchedule: 'Današnji raspored',
    total: 'ukupno',
    appointments: 'termini',
    notifications: 'Obavijesti',
    allCaughtUp: 'Sve je ažurno! Nema hitnih predmeta.',
    roadmap: 'Nadolazeće značajke',
    marketing: 'Marketing alati',
    marketingDesc: 'Značajke za privlačenje i zadržavanje klijenata',
    reminders: 'Pametni podsjetnici',
    remindersDesc: 'Automatski praćenje i obavijesti',
    comingSoon: 'Uskoro dostupno',
    
    // Navigation
    inbox: 'Dolazna pošta',
    leads: 'Potencijalni klijenti',
    bookings: 'Rezervacije',
    customers: 'Klijenti',
    cars: 'Vozila',
    
    // Chat
    chatTitle: 'Pozdrav! Kako vam mogu pomoći s vašim vozilom danas?',
    chatResponse: 'Hvala na poruci! Naš tim će vam se uskoro javiti. Za hitne stvari, molimo nazovite nas direktno.',
    chatSupport: 'GarageHub podrška',
    chatSubtitle: 'Tu smo da pomognemo!',
    chatPlaceholder: 'Unesite vašu poruku...',
    chatReplyTime: 'Obično odgovaramo u nekoliko minuta',
  }
};

// Language state management
let currentLanguage: Language = 'en';
const languageChangeListeners: (() => void)[] = [];

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(language: Language) {
  currentLanguage = language;
  languageChangeListeners.forEach(listener => listener());
}

export function useTranslation() {
  const [language, setCurrentLanguage] = useState<Language>(currentLanguage);

  useEffect(() => {
    const listener = () => setCurrentLanguage(currentLanguage);
    languageChangeListeners.push(listener);
    
    return () => {
      const index = languageChangeListeners.indexOf(listener);
      if (index > -1) {
        languageChangeListeners.splice(index, 1);
      }
    };
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return { t, language, setLanguage };
}