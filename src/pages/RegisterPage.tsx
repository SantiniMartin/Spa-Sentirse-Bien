import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRegisterSuccess = () => {
    navigate('/');
  };

  return (
    <div className="bg-[#f0faf1] min-h-screen py-12">
      <div className="max-w-md mx-auto px-4">
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default RegisterPage;