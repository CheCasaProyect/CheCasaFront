"use client";
import React, { useState, useEffect } from 'react';
import DatePickerComponent from '@/components/Calendar';
import PaymentButton from '@/components/PaymentButton';
import IAccommodation from '../../../interfaces/Accomodation';
import dynamic from 'next/dynamic';
import { use } from 'react'; // Importa use de React

const Map = dynamic(() => import('../../map/cheMap'));

interface Params {
  id: string;
}

const AccommodationDetail = ({ params }: { params: Promise<Params> }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState<IAccommodation | null>(null);

  const unwrappedParams = use(params); // Desenvuelve params aquí

  useEffect(() => {
    const fetchAccommodation = async () => {
      if (!unwrappedParams) return; // Asegúrate de que params esté disponible

      try {
        const response = await fetch(`http://localhost:3001/properties/${unwrappedParams.id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`${response.status} - ${errorMessage}`);
        }
        const data = await response.json();
        setAccommodation(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [unwrappedParams]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!accommodation) return <p>No se encontró información de alojamiento.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{accommodation.title}</h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {accommodation.photos.map((photos, index) => (
          <img
            key={index}
            src={photos}
            alt={`${accommodation.title} photo ${index + 1}`} // Corrección aquí
            className="rounded-lg object-cover"
          />
        ))}
      </div>
  <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <p className="text-lg text-gray-800 mb-4">{accommodation.description}</p>
          <p className="text-xl font-semibold text-blue-600">Precio: ${accommodation.price} / noche</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-lg font-medium">4.92</span>
          <span className="text-sm">(13 evaluaciones)</span>
        </div>
      </div>
  
      <div className="mt-6">
        <h2 className="text-2x1 font-bold text-gray-900 mb-4"> Ubicación</h2>
        {accommodation.latitude && accommodation.longitude ? (
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <Map latitude={accommodation.latitude} longitude={accommodation.longitude} />
          </div>
        ) : (
          <p>No se pudo cargar el mapa debido a información de ubicación faltante.</p>
        )}
      </div>
  
      <div className="mt-6">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Reservar
        </button>
        <DatePickerComponent />
        <PaymentButton
          propertyId={accommodation.id as number}
          price={accommodation.price}
          stripeProductId={accommodation.stripeProductId}
          stripePriceId={accommodation.stripePriceId}
        />
      </div>
    </div>
  );
};

export default AccommodationDetail;