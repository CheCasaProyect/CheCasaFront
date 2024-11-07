import React from 'react';
import PaymentButton from './PaymentButton';

interface PropertyDetailProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    provincia: string;
  };
  userId: number;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, userId }) => {
  return (
    <div className="property-detail">
      <img src={property.image} alt={property.title} className="w-full h-auto" />
      <h2 className="text-2xl font-bold">{property.title}</h2>
      <p>{property.description}</p>
      <p className="text-lg font-semibold text-green-600">Ubicación: {property.provincia}</p>
      <p className="text-xl font-bold">Precio: ${property.price}</p>
    </div>
  );
};

export default PropertyDetail;