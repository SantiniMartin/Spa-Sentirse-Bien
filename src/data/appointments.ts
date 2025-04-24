import { Appointment, TimeSlot } from '../types';

// Mock data for appointments
export const appointments: Appointment[] = [
  {
    id: '1',
    userId: '1',
    serviceId: '2',
    date: '2025-06-15',
    time: '10:00',
    status: 'confirmed'
  },
  {
    id: '2',
    userId: '1',
    serviceId: '1',
    date: '2025-06-20',
    time: '14:30',
    status: 'pending'
  }
];

// Generate time slots for a given day
export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const timeString = `${hour}:00`;
    slots.push({
      id: `${date}-${timeString}`,
      time: timeString,
      available: !appointments.some(a => a.date === date && a.time === timeString && a.status !== 'cancelled')
    });
    
    // Add half-hour slots
    const halfTimeString = `${hour}:30`;
    slots.push({
      id: `${date}-${halfTimeString}`,
      time: halfTimeString,
      available: !appointments.some(a => a.date === date && a.time === halfTimeString && a.status !== 'cancelled')
    });
  }
  
  return slots;
};

// Function to format time for display
export const formatTime = (time: string): string => {
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr);
  const minute = minuteStr;
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  
  return `${displayHour}:${minute} ${period}`;
};