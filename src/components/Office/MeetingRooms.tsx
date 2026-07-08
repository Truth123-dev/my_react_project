


import React from 'react';

interface Room {
  name: string;
  capacity: number;
  amenities: string[];
  status: 'available' | 'busy';
  nextMeeting?: string;
}

const ROOMS_DATA: Room[] = [
  { name: 'Boardroom Beta', capacity: 12, amenities: ['4K Screen', 'Conference Phone'], status: 'busy', nextMeeting: 'Board review at 2:00 PM' },
  { name: 'Huddle Room 1', capacity: 4, amenities: ['Whiteboard'], status: 'available' },
  { name: 'Design Studio', capacity: 8, amenities: ['Projector', 'Interactive Panel'], status: 'available' },
];

export const MeetingRooms: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Collaboration Spaces</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Real-time occupancy status of shared workspace environments.</p>

      <div className="space-y-3">
        {ROOMS_DATA.map((room, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700/80 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{room.name}</h4>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">Cap. {room.capacity}</span>
              </div>
              <div className="flex gap-1.5 mt-1">
                {room.amenities.map((item, i) => (
                  <span key={i} className="text-[9px] bg-gray-50 dark:bg-gray-900 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200/50 dark:border-gray-800">
                    {item}
                  </span>
                ))}
              </div>
              {room.nextMeeting && (
                <p className="text-[10px] text-orange-500 mt-2 font-medium">↳ {room.nextMeeting}</p>
              )}
            </div>
            
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
              room.status === 'available'
                ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
            }`}>
              {room.status === 'available' ? 'Open' : 'In Use'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};