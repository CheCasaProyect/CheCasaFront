"use client";
import { useRouter } from 'next/navigation';
import IAccommodation from "@/interfaces/Accomodation";
import React from 'react';

const CardAccommodation: React.FC<IAccommodation> = ({ id, title, description, price, image }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/accommodations/${id}`);
  };

  return (
    <div
      className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer shadow-lg"
      onClick={handleCardClick}
    >
      {/* Imagen ocupando todo el espacio de la carta */}
      <img className="object-cover h-full w-full rounded-3xl" src={image} alt={title} />

      {/* Efecto de hover */}
      <div className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-500 peer"></div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 opacity-0 peer-hover:opacity-100 bg-black bg-opacity-70 rounded-3xl"
      >
        <h2 className="font-bold text-2xl text-white text-center">{title}</h2>
        <p className="text-lg text-white text-center">{description}</p>
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white"> {/* Sin fondo azul */}
          ${price} por noche
        </span>
      </div>

      {/* Contenedor de texto (oculto al hacer hover) */}
      <div className="px-6 py-4 h-28 flex flex-col justify-between items-center transition-opacity duration-500 opacity-100 peer-hover:opacity-0">
        <h2 className="font-bold text-xl mb-2 text-center">{title}</h2>
        <p className="text-gray-700 text-base text-center">{description}</p>
      </div>
    </div>
  );
};

export default CardAccommodation;
