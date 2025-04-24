import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../types';
import { appointments as initialAppointments } from '../data/appointments';

interface AppointmentContextType {
  appointments: Appointment[];
  userAppointments: (userId: string) => Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const userAppointments = (userId: string) => {
    return appointments.filter(appointment => appointment.userId === userId);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substring(2, 11),
    };
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prevAppointments => 
      prevAppointments.filter(appointment => appointment.id !== id)
    );
  };

  const getAppointment = (id: string) => {
    return appointments.find(appointment => appointment.id === id);
  };

  const value = {
    appointments,
    userAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointment
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};