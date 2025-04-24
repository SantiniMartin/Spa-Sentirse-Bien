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
      title: 'Terapeutas expertos',
      description: 'Nuestros profesionales licenciados tienen años de experiencia en diversas técnicas terapéuticas.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Productos Premium',
      description: 'Utilizamos únicamente productos orgánicos de alta calidad que nutren tu piel y tu cuerpo.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Horario flexible',
      description: 'Abierto los 7 días de la semana con horario extendido para adaptarnos a su apretada agenda.'
    },
    {
      icon: <Smile size={24} />,
      title: 'Atención personalizada',
      description: 'Cada tratamiento está personalizado para abordar sus necesidades y preferencias específicas.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-700">¿Por qué elegirnos?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experimente la diferencia con nuestro enfoque dedicado al bienestar.
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