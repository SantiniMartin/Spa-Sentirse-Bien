import React from 'react';
import Carousel from '../components/common/Carousel';
import Hero from '../components/home/Hero';
import ServiceCarousel from '../components/home/ServiceCarousel';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                  <h1 className="text-5xl font-bold mb-4">Welcome to Serene Spa</h1>
                  <p className="text-xl">Your journey to relaxation begins here</p>
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