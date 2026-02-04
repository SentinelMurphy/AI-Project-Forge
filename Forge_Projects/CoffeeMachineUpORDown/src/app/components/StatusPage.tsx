import { Activity, AlertCircle, CheckCircle, Clock, Coffee, TrendingUp } from 'lucide-react';

interface StatusMetric {
  timestamp: string;
  status: 'online' | 'offline';
  duration: string;
}

export function StatusPage() {
  const recentActivity: StatusMetric[] = [
    { timestamp: '2026-02-03 09:45', status: 'online', duration: '2h 15m' },
    { timestamp: '2026-02-03 07:30', status: 'online', duration: '5h 45m' },
    { timestamp: '2026-02-02 23:45', status: 'offline', duration: '7h 45m' },
    { timestamp: '2026-02-02 16:00', status: 'online', duration: '6h 30m' },
    { timestamp: '2026-02-02 09:30', status: 'online', duration: '4h 20m' },
    { timestamp: '2026-02-01 23:30', status: 'offline', duration: '10h 00m' },
  ];

  const uptimeStats = {
    today: 95,
    thisWeek: 92,
    thisMonth: 94,
    totalBrewed: 1247,
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="size-8 text-[#EE0000]" />
          <h2 className="text-3xl">Machine Status Overview</h2>
        </div>

        {/* Uptime Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="size-5 text-green-600" />
              <h3 className="text-sm text-gray-700">Today's Uptime</h3>
            </div>
            <p className="text-3xl text-green-600">{uptimeStats.today}%</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-5 text-blue-600" />
              <h3 className="text-sm text-gray-700">This Week</h3>
            </div>
            <p className="text-3xl text-blue-600">{uptimeStats.thisWeek}%</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="size-5 text-purple-600" />
              <h3 className="text-sm text-gray-700">This Month</h3>
            </div>
            <p className="text-3xl text-purple-600">{uptimeStats.thisMonth}%</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="size-5 text-orange-600" />
              <h3 className="text-sm text-gray-700">Coffees Brewed</h3>
            </div>
            <p className="text-3xl text-orange-600">{uptimeStats.totalBrewed}</p>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div>
          <h3 className="text-xl mb-4">Recent Activity Log</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {activity.status === 'online' ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gray-500" />
                    <span className="text-sm">{activity.timestamp}</span>
                  </div>
                  <div>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        activity.status === 'online'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {activity.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Duration: {activity.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl mb-4">System Health Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Water Temperature</span>
            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle className="size-4" />
              Optimal (92°C)
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Brewing Pressure</span>
            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle className="size-4" />
              Normal (9 bar)
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Water Filter</span>
            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle className="size-4" />
              Good (78% life)
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Descaling Status</span>
            <span className="text-yellow-600 flex items-center gap-2">
              <AlertCircle className="size-4" />
              Due in 15 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
