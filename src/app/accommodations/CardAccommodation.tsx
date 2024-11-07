
"use client";
import { useRouter } from 'next/navigation';
import IAccommodation from "@/interfaces/Accomodation";
import React from 'react';


const CardAccommodation: React.FC<IAccommodation> = ({ id, title, description, price, photos, latitude, longitude }) => {

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/accommodations/${id}`);
  };
 
  return (
    <div
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24 cursor-pointer"
      onClick={handleCardClick}
    >
      
      {photos && (
        <img
          src={Array.isArray(photos) ? photos[0] : photos}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
     
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{title}</h3>
      
      <div className="z-10 text-sm leading-6 text-gray-300">{description}</div>
      <div className="z-10 text-sm leading-6 text-gray-300">${price}</div>
    </div>
  );
};

export default CardAccommodation;