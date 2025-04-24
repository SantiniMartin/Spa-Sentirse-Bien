import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import { Service } from '../../types';
import { services } from '../../data/services';
import { generateTimeSlots, formatTime } from '../../data/appointments';
import Button from '../common/Button';
import Card from '../common/Card';

interface AppointmentFormProps {
  onSubmitSuccess?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { addAppointment } = useAppointments();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    service?: string;
    date?: string;
    time?: string;
  }>({});

  // Get preselected service from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('service');
    
    if (serviceId) {
      const service = services.find(s => s.id === serviceId);
      if (service) setSelectedService(service);
    }
  }, [location]);

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime(''); // Reset selected time when date changes
    }
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const validateForm = () => {
    const newErrors: {
      service?: string;
      date?: string;
      time?: string;
    } = {};
    let isValid = true;

    if (!selectedService) {
      newErrors.service = 'Please select a service';
      isValid = false;
    }

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
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Create new appointment
    addAppointment({
      userId: user!.id,
      serviceId: selectedService!.id,
      date: selectedDate,
      time: selectedTime,
      status: 'pendiente'
    });
    
    setIsLoading(false);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      navigate('/appointments');
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Reserve su cita</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione un servicio
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
              <div
                key={service.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedService?.id === service.id
                    ? 'border-emerald-500 bg-[#f0faf1]'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-[#f8fcf9]'
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-emerald-800">{service.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700">${service.price}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.service && (
            <p className="mt-1 text-sm text-red-500">{errors.service}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
            Selecione una fecha
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
            Seleccione un horario
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
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={!isAuthenticated || !selectedService || !selectedDate || !selectedTime}
        >
          {isAuthenticated ? 'Confirmar reserva' : 'Iniciar sesión para reservar'}
        </Button>
      </form>
    </Card>
  );
};

export default AppointmentForm;