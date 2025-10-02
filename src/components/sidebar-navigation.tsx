'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Calendar, 
  User, 
  Car,
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Wrench,
  BarChart3,
  Globe,
  Languages
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';

const navigation = [
  { 
    name: 'dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    color: 'text-blue-600 bg-blue-100',
    hoverColor: 'hover:bg-blue-50'
  },
  { 
    name: 'inbox', 
    href: '/inbox', 
    icon: MessageSquare,
    color: 'text-green-600 bg-green-100',
    hoverColor: 'hover:bg-green-50'
  },
  { 
    name: 'leads', 
    href: '/leads', 
    icon: Users,
    color: 'text-purple-600 bg-purple-100',
    hoverColor: 'hover:bg-purple-50'
  },
  { 
    name: 'bookings', 
    href: '/bookings', 
    icon: Calendar,
    color: 'text-orange-600 bg-orange-100',
    hoverColor: 'hover:bg-orange-50'
  },
  { 
    name: 'customers', 
    href: '/customers', 
    icon: User,
    color: 'text-indigo-600 bg-indigo-100',
    hoverColor: 'hover:bg-indigo-50'
  },
  { 
    name: 'cars', 
    href: '/cars', 
    icon: Car,
    color: 'text-cyan-600 bg-cyan-100',
    hoverColor: 'hover:bg-cyan-50'
  },
];

export function SidebarNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md"
      >
        <Globe className="h-5 w-5 text-gray-600" />
      </button>

      <div className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-50",
        "lg:translate-x-0", // Always visible on large screens
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0", // Hidden on mobile unless open
        isCollapsed ? "w-16" : "w-72"
      )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GarageHub
              </h1>
              <p className="text-xs text-gray-500">Pro Manager</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-6 p-1.5 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ChevronRight className="h-3 w-3 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)} // Close mobile menu on navigation
              className={cn(
                "group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                isCollapsed ? "justify-center" : "justify-start",
                isActive
                  ? `${item.color} shadow-lg scale-105`
                  : `text-gray-600 hover:text-gray-900 ${item.hoverColor}`
              )}
              title={isCollapsed ? t(item.name as any) : undefined}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive ? "text-current" : "text-gray-500 group-hover:text-current"
              )} />
              {!isCollapsed && (
                <span className="ml-3 capitalize">{t(item.name as any)}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute right-3 h-2 w-2 bg-current rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-800">Quick Stats</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">8</div>
                <div className="text-xs text-gray-600">Done</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">

        {/* Notifications */}
        <button 
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
            isCollapsed ? "justify-center" : "justify-start",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            shouldShake && "animate-bounce"
          )}
          onClick={() => setUrgentCount(0)}
        >
          <Bell className={cn(
            "h-4 w-4",
            shouldShake && "animate-pulse"
          )} />
          {!isCollapsed && <span className="ml-3">Notifications</span>}
          {urgentCount > 0 && (
            <Badge className={cn(
              "h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full animate-pulse",
              isCollapsed ? "absolute -top-1 -right-1" : "ml-auto"
            )}>
              {urgentCount}
            </Badge>
          )}
        </button>

        {/* Settings */}
        <button 
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isCollapsed ? "justify-center" : "justify-start",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </button>

        {/* Profile */}
        <div className={cn(
          "flex items-center space-x-3 p-3 rounded-lg bg-gray-50",
          isCollapsed && "justify-center"
        )}>
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">M</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Marko</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
