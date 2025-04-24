import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Swedish Massage',
    description: 'A gentle full body massage designed to relax muscles and improve circulation.',
    duration: 60,
    price: 85,
    image: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description: 'Targets deep layers of muscle and connective tissue, perfect for chronic pain relief.',
    duration: 60,
    price: 95,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Aromatherapy Facial',
    description: 'Rejuvenating facial treatment with essential oils to purify and nourish the skin.',
    duration: 45,
    price: 75,
    image: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Hot Stone Therapy',
    description: 'Smooth, heated stones are placed on key points of the body for deep relaxation.',
    duration: 90,
    price: 110,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    name: 'Detox Body Wrap',
    description: 'Full body treatment that detoxifies, tightens and tones the skin.',
    duration: 60,
    price: 90,
    image: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};