import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppointmentList from '../components/appointments/AppointmentList';

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="bg-[#f0faf1] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <AppointmentList />
      </div>
    </div>
  );
};

export default AppointmentsPage;