import { DashboardStats } from '@/components/dashboard-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to GarageHub - Your complete auto mechanic management system
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New lead: Ana K. - VW Golf</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Message from Marin - Brake issue</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Booking confirmed: Luka S.</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center space-y-2 rounded-lg border p-4 hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">+</span>
                </div>
                <span className="text-sm font-medium">Add Lead</span>
              </button>
              <button className="flex flex-col items-center space-y-2 rounded-lg border p-4 hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">📅</span>
                </div>
                <span className="text-sm font-medium">New Booking</span>
              </button>
              <button className="flex flex-col items-center space-y-2 rounded-lg border p-4 hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-medium">💬</span>
                </div>
                <span className="text-sm font-medium">Messages</span>
              </button>
              <button className="flex flex-col items-center space-y-2 rounded-lg border p-4 hover:bg-gray-50">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-medium">👥</span>
                </div>
                <span className="text-sm font-medium">Customers</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}