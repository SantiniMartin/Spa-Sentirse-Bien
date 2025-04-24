import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, image, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#e0f5e3] transition-all duration-300 hover:shadow-md">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      <p className="text-gray-600 mb-6 italic">{content}</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-emerald-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Client',
      content: "I've been coming to Serene Spa for over a year now, and every visit is a blissful experience. The deep tissue massage is my favorite!",
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'New Client',
      content: 'My first visit exceeded all expectations. The staff was attentive and professional, and the hot stone therapy was absolutely divine.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4
    },
    {
      name: 'Emma Wilson',
      role: 'Monthly Member',
      content: 'The membership program is worth every penny. I love how easy it is to book appointments online, and the aromatherapy facials are incredible.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 5
    }
  ];

  return (
    <div className="py-16 bg-[#f0faf1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-700">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it — hear from our satisfied clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;