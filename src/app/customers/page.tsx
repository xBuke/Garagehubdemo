'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Customer, Car } from '@/lib/types';
import { Phone, Car as CarIcon, Plus, User } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, carsRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/cars'),
        ]);

        const [customersData, carsData] = await Promise.all([
          customersRes.json(),
          carsRes.json(),
        ]);

        setCustomers(customersData);
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCustomerCars = (customerId: string) => {
    return cars.filter(car => car.customerId === customerId);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database and their vehicles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-4">
        {customers.map((customer, index) => {
          const customerCars = getCustomerCars(customer.id);
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 ease-in-out">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{customer.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{customer.contact}</span>
                          </div>
                        </div>
                      </div>
                      
                      {customerCars.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Vehicles:</h4>
                          <div className="space-y-1">
                            {customerCars.map((car) => (
                              <div key={car.id} className="flex items-center space-x-2 text-sm">
                                <CarIcon className="h-4 w-4 text-gray-400" />
                                <span>{car.model}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Vehicle
                      </Button>
                      <Button variant="outline" size="sm">
                        New Booking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {customers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No customers yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your customer database
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add First Customer
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}