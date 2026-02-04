import { Calendar, CheckCircle, Clock, Wrench } from 'lucide-react';

interface Repair {
  id: number;
  date: string;
  issue: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  technician: string;
  notes: string;
}

export function RepairsPage() {
  const repairs: Repair[] = [
    {
      id: 1,
      date: 'January 28, 2026',
      issue: 'Descaling and deep cleaning',
      status: 'completed',
      technician: 'John Smith',
      notes: 'Performed full descaling, replaced water filter, cleaned brewing unit',
    },
    {
      id: 2,
      date: 'January 15, 2026',
      issue: 'Milk frother not working',
      status: 'completed',
      technician: 'Sarah Johnson',
      notes: 'Replaced milk frother motor, tested and calibrated',
    },
    {
      id: 3,
      date: 'February 10, 2026',
      issue: 'Scheduled maintenance',
      status: 'scheduled',
      technician: 'TBD',
      notes: 'Quarterly preventive maintenance scheduled',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm flex items-center gap-1">
            <CheckCircle className="size-4" />
            Completed
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm flex items-center gap-1">
            <Calendar className="size-4" />
            Scheduled
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm flex items-center gap-1">
            <Clock className="size-4" />
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="size-8 text-[#EE0000]" />
          <h2 className="text-3xl">Repair History</h2>
        </div>

        <div className="space-y-4">
          {repairs.map((repair) => (
            <div
              key={repair.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1">{repair.issue}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="size-4" />
                    <span>{repair.date}</span>
                  </div>
                </div>
                {getStatusBadge(repair.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Technician:</span>
                  <span className="ml-2">{repair.technician}</span>
                </div>
                <div>
                  <span className="text-gray-600">Notes:</span>
                  <span className="ml-2">{repair.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg mb-2">Schedule New Repair</h3>
          <p className="text-gray-700 mb-4">
            Need to schedule a repair or maintenance? Contact the facilities team at{' '}
            <a href="mailto:facilities@redhat.com" className="text-[#EE0000] underline">
              facilities@redhat.com
            </a>
          </p>
          <button className="bg-[#EE0000] text-white px-6 py-2 rounded hover:bg-[#CC0000] transition-colors">
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
}
