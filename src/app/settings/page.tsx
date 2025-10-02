import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Bell, User, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your GarageHub configuration and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Garage Name</label>
              <p className="text-sm text-muted-foreground">Auto Servis Marko</p>
            </div>
            <div>
              <label className="text-sm font-medium">Contact</label>
              <p className="text-sm text-muted-foreground">+385 91 123 4567</p>
            </div>
            <Button size="sm">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Messages</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Booking Reminders</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Urgent Alerts</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button size="sm">Change Password</Button>
            <Button variant="outline" size="sm">Two-Factor Authentication</Button>
            <Button variant="outline" size="sm">Login History</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button size="sm">Export Data</Button>
            <Button variant="outline" size="sm">Import Customers</Button>
            <Button variant="destructive" size="sm">Reset All Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
