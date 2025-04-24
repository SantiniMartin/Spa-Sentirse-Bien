import React from 'react';
import { Clock, Award, Heart, Smile } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#f0faf1] rounded-lg transition-transform duration-300 hover:scale-105">
      <div className="p-4 bg-[#c0edc7] rounded-full mb-4 text-emerald-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-emerald-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Award size={24} />,
      title: 'Expert Therapists',
      description: 'Our licensed professionals have years of experience in various therapeutic techniques.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Premium Products',
      description: 'We use only high-quality, organic products that nourish your skin and body.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Flexible Hours',
      description: 'Open 7 days a week with extended hours to accommodate your busy schedule.'
    },
    {
      icon: <Smile size={24} />,
      title: 'Personalized Care',
      description: 'Each treatment is customized to address your specific needs and preferences.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-700">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the difference with our dedicated approach to wellness
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;