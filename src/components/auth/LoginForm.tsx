import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { login, resetPassword } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      setErrors({
        password: 'Mail o contraseña incorrectos'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setErrors({ email: 'Email requerido' });
      return;
    }
    
    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetEmailSent(true);
    } catch (error) {
      setErrors({
        email: 'No se pudo enviar el correo electrónico de restablecimiento'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        {!showForgotPassword ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#f0faf1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-700">Bienvenido de nuevo</h2>
              <p className="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    placeholder="ejemplo@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Recordarme
                  </label>
                </div>
                
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
                  onClick={() => setShowForgotPassword(true)}
                >
                  ¿Olvidó la contraseña?
                </button>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center"
              >
                <span>Iniciar sesión</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                  ¿Eres nuevo en Spa Sentirse Bien?
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/register">
                  <Button
                    variant="outline"
                    fullWidth
                    className="flex items-center justify-center"
                  >
                    Crear una cuenta
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#f0faf1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-700">Restablecer contraseña</h2>
              <p className="mt-2 text-gray-600">
                Ingresa tu correo electrónico para recibir instrucciones de restablecimiento
              </p>
            </div>
            
            {resetEmailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Revisa tu correo electrónico</h3>
                <p className="text-gray-600 mb-6">
                  Hemos enviado instrucciones para restablecer la contraseña a<br />
                  <span className="font-medium">{resetEmail}</span>
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                    setResetEmail('');
                  }}
                >
                  Volver al inicio de sesión
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    error={errors.email}
                    placeholder="ejemplo@email.com"
                    className="pl-10"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                  
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    fullWidth
                  >
                    Enviar enlace de restablecimiento
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default LoginForm;