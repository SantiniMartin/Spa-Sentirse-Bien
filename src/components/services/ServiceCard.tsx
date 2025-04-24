import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Service } from '../../types';
import Button from '../common/Button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">{service.name}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <Clock size={16} className="mr-2" />
          <span>{service.duration} minutos</span>
        </div>
        <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-emerald-700">${service.price}</span>
          <Link to={`/book?service=${service.id}`}>
            <Button variant="secondary">Reservar ahora</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;