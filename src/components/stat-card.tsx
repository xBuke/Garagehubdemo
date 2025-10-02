'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  urgent?: number;
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
};

const iconBgClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  orange: 'bg-orange-100',
  red: 'bg-red-100',
  purple: 'bg-purple-100',
};

export function StatCard({ title, value, icon: Icon, trend, color, urgent }: StatCardProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {urgent && urgent > 0 && (
              <div className="ml-3 flex items-center">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="ml-1 text-sm font-medium text-red-600">{urgent} {t('urgent')}</span>
              </div>
            )}
          </div>
          {trend && (
            <div className="flex items-center mt-2">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={cn(
                'text-sm font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">{t('fromLastWeek')}</span>
            </div>
          )}
        </div>
        <div className={cn(
          'h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200',
          iconBgClasses[color]
        )}>
          <Icon className={cn('h-6 w-6', colorClasses[color].split(' ')[1])} />
        </div>
      </div>
    </div>
  );
}
