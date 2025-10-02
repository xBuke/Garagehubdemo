'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Inbox', href: '/inbox' },
  { name: 'Leads', href: '/leads' },
  { name: 'Bookings', href: '/bookings' },
];

export function TopNavigation() {
  const pathname = usePathname();
  const [urgentCount, setUrgentCount] = useState(3);
  const [shouldShake, setShouldShake] = useState(false);

  // Simulate receiving urgent notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const chance = Math.random();
      if (chance > 0.8) { // 20% chance every 30 seconds
        setUrgentCount(prev => prev + 1);
        setShouldShake(true);
        
        // Stop shaking after 1 second
        setTimeout(() => setShouldShake(false), 1000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">🚗</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">GarageHub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 border-2',
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                      : 'text-gray-700 hover:text-white hover:bg-indigo-500 border-transparent hover:border-indigo-600'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side - Notifications & Settings */}
          <div className="flex items-center space-x-3">
            <button 
              className={cn(
                "relative p-3 text-gray-700 hover:text-white hover:bg-red-500 border-2 border-gray-300 hover:border-red-600 rounded-lg transition-all duration-200 shadow-sm",
                shouldShake && "animate-bounce"
              )}
              onClick={() => setUrgentCount(0)}
            >
              <Bell className={cn(
                "h-5 w-5 transition-transform duration-150",
                shouldShake && "animate-pulse"
              )} />
              {urgentCount > 0 && (
                <div className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full border-2 border-white shadow-md animate-pulse">
                  {urgentCount}
                </div>
              )}
            </button>
            
            <button className="p-3 text-gray-700 hover:text-white hover:bg-gray-600 border-2 border-gray-300 hover:border-gray-700 rounded-lg transition-all duration-200 shadow-sm">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-base font-bold text-white">M</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
