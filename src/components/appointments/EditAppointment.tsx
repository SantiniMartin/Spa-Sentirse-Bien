import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import { getServiceById } from '../../data/services';
import { generateTimeSlots, formatTime } from '../../data/appointments';
import Button from '../common/Button';
import Card from '../common/Card';

const EditAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAppointment, updateAppointment } = useAppointments();
  
  const appointment = id ? getAppointment(id) : null;
  const service = appointment ? getServiceById(appointment.serviceId) : null;
  
  const [selectedDate, setSelectedDate] = useState<string>(appointment?.date || '');
  const [selectedTime, setSelectedTime] = useState<string>(appointment?.time || '');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    date?: string;
    time?: string;
  }>({});

  useEffect(() => {
    if (!appointment || !user) {
      navigate('/appointments');
      return;
    }
    
    // Only allow users to edit their own appointments
    if (appointment.userId !== user.id) {
      navigate('/appointments');
      return;
    }
  }, [appointment, user, navigate]);

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      
      // Mark the current time as available if it's the original appointment time
      if (appointment && appointment.date === selectedDate) {
        const updatedSlots = slots.map(slot => {
          if (slot.time === appointment.time) {
            return { ...slot, available: true };
          }
          return slot;
        });
        setAvailableTimeSlots(updatedSlots);
      } else {
        setAvailableTimeSlots(slots);
      }
    }
  }, [selectedDate, appointment]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const validateForm = () => {
    const newErrors: {
      date?: string;
      time?: string;
    } = {};
    let isValid = true;

    if (!selectedDate) {
      newErrors.date = 'Please select a date';
      isValid = false;
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a time';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) return;
    
    setIsLoading(true);
    
    // Update appointment
    updateAppointment(id, {
      date: selectedDate,
      time: selectedTime,
      status: 'pending' // Reset to pending when edited
    });
    
    setIsLoading(false);
    navigate('/appointments');
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  if (!appointment || !service) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <button 
        onClick={() => navigate('/appointments')}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Appointments
      </button>
      
      <Card>
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">Reschedule Appointment</h2>
        
        <div className="bg-[#f0faf1] rounded-lg p-4 mb-6">
          <h3 className="font-medium text-emerald-800 mb-2">{service.name}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>{service.duration} minutes</span>
            <span className="mx-2">•</span>
            <span className="font-medium">${service.price}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
              Select New Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarDays size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="appointment-date"
                value={selectedDate}
                onChange={handleDateChange}
                min={today}
                className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
          
          {selectedDate && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Time
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-emerald-600 text-white'
                        : slot.available
                        ? 'bg-white border border-gray-300 text-gray-700 hover:border-emerald-300 hover:bg-[#f0faf1]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => slot.available && handleTimeSelection(slot.time)}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-500">{errors.time}</p>
              )}
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/appointments')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!selectedDate || !selectedTime}
              fullWidth
            >
              Update Appointment
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditAppointment;