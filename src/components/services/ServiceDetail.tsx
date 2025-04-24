import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { getServiceById } from '../../data/services';
import Button from '../common/Button';
import Card from '../common/Card';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = id ? getServiceById(id) : null;

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">Service Not Found</h2>
        <p className="mb-6 text-gray-600">
          The service you're looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate('/services')}>
          View All Services
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>
      
      <Card>
        <div className="md:flex gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-emerald-800 mb-4">
              {service.name}
            </h1>
            
            <div className="flex items-center text-gray-500 mb-4">
              <Clock size={18} className="mr-2" />
              <span>{service.duration} minutes</span>
            </div>
            
            <div className="bg-[#f0faf1] rounded-lg p-4 flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-700">Price</span>
              <span className="text-2xl font-bold text-emerald-700">${service.price}</span>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {service.description}
            </p>
            
            <div className="space-y-4">
              <Link to={`/book?service=${service.id}`}>
                <Button fullWidth>
                  Book Now
                </Button>
              </Link>
              
              <Link to="/services">
                <Button variant="outline" fullWidth>
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceDetail;