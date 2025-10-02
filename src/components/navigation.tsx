'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  Car,
  Settings,
  UserCheck
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: UserCheck },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Cars', href: '/cars', icon: Car },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold">GarageHub</h1>
      </div>
      
      <div className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
