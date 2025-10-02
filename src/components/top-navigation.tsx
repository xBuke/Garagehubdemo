'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚗</span>
              </div>
              <span className="text-xl font-bold text-gray-900">GarageHub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side - Notifications & Settings */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                3
              </Badge>
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">M</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
