import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import { getServiceById } from '../../data/services';
import { formatTime } from '../../data/appointments';
import Button from '../common/Button';
import Card from '../common/Card';

const AppointmentList: React.FC = () => {
  const { user } = useAuth();
  const { userAppointments, deleteAppointment } = useAppointments();
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
  
  if (!user) return null;
  
  const appointments = userAppointments(user.id);
  
  const handleDeleteClick = (appointmentId: string) => {
    setAppointmentToDelete(appointmentId);
  };
  
  const confirmDelete = () => {
    if (appointmentToDelete) {
      deleteAppointment(appointmentToDelete);
      setAppointmentToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setAppointmentToDelete(null);
  };

  if (appointments.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="mb-4">
            <CalendarDays size={48} className="mx-auto text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay citas todavía</h3>
          <p className="text-gray-500 mb-6">
            No tienes citas programadas. ¡Reserva tu primer tratamiento hoy mismo!
          </p>
          <Link to="/book">
            <Button>Reservar una cita</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-700">Sus citas</h2>
        <Link to="/book">
          <Button>Nueva cita</Button>
        </Link>
      </div>
      
      {appointments.map((appointment) => {
        const service = getServiceById(appointment.serviceId);
        
        return (
          <Card key={appointment.id} className="transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-emerald-800 mb-1">
                  {service?.name || 'Unknown Service'}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-2">
                  <div className="flex items-center">
                    <CalendarDays size={16} className="mr-1" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{formatTime(appointment.time)}</span>
                  </div>
                </div>
                
                <div>
                  <span 
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmado' 
                        ? 'bg-green-100 text-green-800' 
                        : appointment.status === 'pendiente' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link to={`/appointments/edit/${appointment.id}`}>
                  <Button variant="outline" className="flex items-center">
                    <Edit2 size={16} className="mr-1" />
                    Editar
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50 flex items-center"
                  onClick={() => handleDeleteClick(appointment.id)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
            
            {/* Delete confirmation dialog */}
            {appointmentToDelete === appointment.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700 mb-3">
                ¿Estás seguro de que deseas cancelar esta cita?
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    // size="sm"
                    onClick={cancelDelete}
                  >
                    Mantener cita
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    // size="sm"
                    onClick={confirmDelete}
                  >
                    Si, cancelar
                  </Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentList;