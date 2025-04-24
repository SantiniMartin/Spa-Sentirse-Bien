import React from 'react';
import { services } from '../data/services';
import ServiceCard from '../components/services/ServiceCard';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#f0faf1] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">Nuestros servicios</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
          Descubra nuestra gama de tratamientos rejuvenecedores diseñados para ayudarle a relajarse, restaurar y revitalizar su cuerpo y mente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;