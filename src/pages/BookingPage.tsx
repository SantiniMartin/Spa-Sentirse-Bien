import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppointmentForm from '../components/appointments/AppointmentForm';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleSubmitSuccess = () => {
    navigate('/appointments');
  };

  return (
    <div className="bg-[#f0faf1] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">
            Select your preferred service, date, and time
            {!isAuthenticated && ' — you\'ll need to log in to complete your booking'}
          </p>
        </div>
        
        <AppointmentForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  );
};

export default BookingPage;