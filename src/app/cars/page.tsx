'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Customer, Car } from '@/lib/types';
import { Car as CarIcon, User, Plus, Settings } from 'lucide-react';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, customersRes] = await Promise.all([
          fetch('/api/cars'),
          fetch('/api/customers'),
        ]);

        const [carsData, customersData] = await Promise.all([
          carsRes.json(),
          customersRes.json(),
        ]);

        setCars(carsData);
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown Customer';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Vehicle database and service history
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Card key={car.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <CarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{car.model}</h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{getCustomerName(car.customerId)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Vehicle ID:</strong> {car.id}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Service History
                  </Button>
                  <Button variant="outline" size="sm">
                    Book Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cars.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <CarIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No vehicles yet</h3>
            <p className="text-muted-foreground mb-4">
              Add customer vehicles to track service history
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add First Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
