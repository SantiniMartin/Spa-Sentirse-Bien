import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'email invalido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      await register(name, email, password);
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      setErrors({
        email: 'Error en el registro. Es posible que este correo electrónico ya esté en uso.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Crea tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="José Fernandez"
          required
        />
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="ejemplo@email.com"
          required
        />
        
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="••••••••"
          required
        />
        
        <Input
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="••••••••"
          required
        />
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Estoy de acuerdo con las{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">
                Condiciones de servicio
              </a>{' '}
              y{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">
                políticas de privacidad
              </a>
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Crear cuenta
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;