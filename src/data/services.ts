import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Masaje sueco',
    description: 'Un suave masaje de cuerpo completo diseñado para relajar los músculos y mejorar la circulación.',
    duration: 60,
    price: 85,
    image: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Masaje de tejido profundo',
    description: 'Se enfoca en capas profundas de músculos y tejido conectivo, perfecto para aliviar el dolor crónico.',
    duration: 60,
    price: 95,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Facial de aromaterapia',
    description: 'Tratamiento facial rejuvenecedor con aceites esenciales para purificar y nutrir la piel.',
    duration: 45,
    price: 75,
    image: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Terapia con piedras calientes',
    description: 'Se colocan piedras lisas y calientes en puntos clave del cuerpo para una relajación profunda.',
    duration: 90,
    price: 110,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    name: 'Envoltura corporal desintoxicante',
    description: 'Tratamiento corporal completo que desintoxica, reafirma y tonifica la piel.',
    duration: 60,
    price: 90,
    image: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};