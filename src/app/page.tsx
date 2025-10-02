export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚗 GarageHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            SaaS Demo Web App for Auto Mechanics
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Dashboard</h3>
              <p className="text-blue-700">Real-time statistics and KPIs</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Lead Management</h3>
              <p className="text-green-700">Track potential customers</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Multi-Channel Messaging</h3>
              <p className="text-purple-700">WhatsApp, Facebook, Instagram, SMS</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Booking System</h3>
              <p className="text-orange-700">Calendar with filtering</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Customer Management</h3>
              <p className="text-red-700">Complete customer database</p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Vehicle Management</h3>
              <p className="text-indigo-700">Car tracking and service history</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Built with Next.js 15, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}