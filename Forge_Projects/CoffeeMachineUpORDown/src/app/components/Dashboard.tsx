import { Activity, AlertTriangle, Clock, Coffee, Droplet, Power, Wrench } from 'lucide-react';
import coffeeMachineImage from '../../assets/62b631ceb3e3e0cbf0b73a1c5bd9b5f8b8c90a68.png';

interface MachineStatus {
  status: 'online' | 'offline' | 'maintenance';
  lastRunning: string;
  lastOffline: string;
  needsMaintenance: boolean;
  coffeeLevel: number;
  milkLevel: number;
}

export function Dashboard() {
  // Mock data for the coffee machine
  const machineData: MachineStatus = {
    status: 'online',
    lastRunning: 'February 3, 2026 09:45 AM',
    lastOffline: 'February 1, 2026 11:30 PM',
    needsMaintenance: false,
    coffeeLevel: 75,
    milkLevel: 60,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online & Running';
      case 'offline':
        return 'Offline';
      case 'maintenance':
        return 'Maintenance Required';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Main Status Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Coffee Machine Image */}
          <div className="flex-shrink-0">
            <img
              src={coffeeMachineImage}
              alt="Red Hat Coffee Machine"
              className="w-64 h-64 object-contain rounded-lg"
            />
          </div>

          {/* Status Overview */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(machineData.status)} animate-pulse`}></div>
              <h2 className="text-3xl">Machine Status: {getStatusText(machineData.status)}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Last Running */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-5 text-[#EE0000]" />
                  <h3 className="text-sm text-gray-600">Last Running</h3>
                </div>
                <p className="text-lg">{machineData.lastRunning}</p>
              </div>

              {/* Last Offline */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Power className="size-5 text-[#EE0000]" />
                  <h3 className="text-sm text-gray-600">Last Offline/Breaking</h3>
                </div>
                <p className="text-lg">{machineData.lastOffline}</p>
              </div>

              {/* Maintenance Status */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="size-5 text-[#EE0000]" />
                  <h3 className="text-sm text-gray-600">Maintenance Required</h3>
                </div>
                <div className="flex items-center gap-2">
                  {machineData.needsMaintenance ? (
                    <>
                      <AlertTriangle className="size-5 text-yellow-500" />
                      <p className="text-lg text-yellow-600">Yes - Schedule Service</p>
                    </>
                  ) : (
                    <p className="text-lg text-green-600">No - Running Smoothly</p>
                  )}
                </div>
              </div>

              {/* Uptime */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="size-5 text-[#EE0000]" />
                  <h3 className="text-sm text-gray-600">Current Status</h3>
                </div>
                <p className="text-lg text-green-600">Active - Brewing Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supply Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coffee Level */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Coffee className="size-6 text-[#EE0000]" />
            <h3 className="text-xl">Coffee Level</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current Level</span>
              <span>{machineData.coffeeLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#6F4E37] to-[#4B3621] h-full flex items-center justify-center text-white text-sm transition-all duration-500"
                style={{ width: `${machineData.coffeeLevel}%` }}
              >
                {machineData.coffeeLevel}%
              </div>
            </div>
            {machineData.coffeeLevel < 30 && (
              <div className="flex items-center gap-2 mt-2 text-yellow-600">
                <AlertTriangle className="size-4" />
                <span className="text-sm">Low coffee level - Refill soon</span>
              </div>
            )}
          </div>
        </div>

        {/* Milk Level */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="size-6 text-[#EE0000]" />
            <h3 className="text-xl">Milk Level</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current Level</span>
              <span>{machineData.milkLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-white via-gray-100 to-gray-200 h-full flex items-center justify-center text-gray-800 text-sm border-r-2 border-gray-300 transition-all duration-500"
                style={{ width: `${machineData.milkLevel}%` }}
              >
                {machineData.milkLevel}%
              </div>
            </div>
            {machineData.milkLevel < 30 && (
              <div className="flex items-center gap-2 mt-2 text-yellow-600">
                <AlertTriangle className="size-4" />
                <span className="text-sm">Low milk level - Refill soon</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl mb-4">Machine Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Model</span>
            <span className="text-lg">Red Hat Enterprise Brewer</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Serial Number</span>
            <span className="text-lg">RH-CM-2024-001</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Location</span>
            <span className="text-lg">Ground Floor - Break Room</span>
          </div>
        </div>
      </div>
    </div>
  );
}