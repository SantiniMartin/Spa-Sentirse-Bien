import React from 'react';
import Carousel from '../components/common/Carousel';
import Hero from '../components/home/Hero';
import ServiceCarousel from '../components/home/ServiceCarousel';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 ',
      alt: 'Deep tissue massage treatment'
    },
    {
      url: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Facial treatment'
    },
    {
      url: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Spa atmosphere with candles'
    }
  ];

  return (
    <>
      <div className="relative h-screen">
        <Carousel autoPlay={true} interval={5000}>
          {carouselImages.map((image, index) => (
            <div key={index} className="relative h-screen">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">Bienvenidos a Spa Sentirse Bien</h1>
                  <p className="text-xl">Tu viaje hacia la relajación comienza aquí</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Hero />
      <ServiceCarousel />
      <Features />
      <Testimonials />
    </>
  );
};

export default HomePage;