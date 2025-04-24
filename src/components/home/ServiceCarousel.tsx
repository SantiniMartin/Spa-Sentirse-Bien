import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import Carousel from '../common/Carousel';
import Button from '../common/Button';

const ServiceCarousel: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-700">Nuestros servicios</h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubra nuestra gama de tratamientos de lujo diseñados para relajarse, rejuvenecer y restaurar.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel autoPlay={true} interval={5000}>
            {services.map((service) => (
              <div key={service.id} className="relative h-96">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-semibold">${service.price}</span>
                      <span className="ml-2 text-sm">({service.duration} min)</span>
                    </div>
                    <Link to={`/services/${service.id}`}>
                      <Button variant="secondary" className="text-emerald-900">
                      Más información
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;