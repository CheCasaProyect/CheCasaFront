"use client";
import React, { useState, useEffect } from "react";
import IAccommodation from "../../../interfaces/Accomodation";
import dynamic from "next/dynamic";
import { use } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter para manejar la navegación
import ReservationForm from "@/app/ReservationForm/page";

const Map = dynamic(() => import("../../map/cheMap"), { ssr: false });

interface Params {
  id: string;
}

const AccommodationDetail = ({ params }: { params: Promise<Params> }) => {
  const unwrappedParams = use(params);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState<IAccommodation | null>(null);
  const router = useRouter(); // Hook para manejar la redirección

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/properties/${unwrappedParams.id}`
        );
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`${response.status} - ${errorMessage}`);
        }
        const data = await response.json();
        setAccommodation(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [unwrappedParams.id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!accommodation) return <p>No se encontró información de alojamiento.</p>;

  return (
    <>
      <div className="flex justify-start my-4">
  <button
    onClick={() => router.push("/")}
    className="inline-flex items-center border border-black px-3 py-1.5 rounded-md text-black hover:bg-indigo-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
    <span className="ml-1 font-bold text-lg">Back</span>
  </button>
</div>

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {accommodation.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {accommodation.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${accommodation.title} photo ${index + 1}`}
              className="rounded-lg object-cover w-full h-48 sm:h-64"
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <p className="text-lg text-gray-800 mb-4">
              {accommodation.description}
            </p>
            <p className="text-xl font-semibold text-blue-600">
              Precio: ${accommodation.price} / noche
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-lg font-medium">4.92</span>
            <span className="text-sm">(13 evaluaciones)</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación</h2>
          {accommodation.latitude && accommodation.longitude ? (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <Map
                latitude={accommodation.latitude}
                longitude={accommodation.longitude}
              />
            </div>
          ) : (
            <p>
              No se pudo cargar el mapa debido a información de ubicación
              faltante.
            </p>
          )}
        </div>

        <ReservationForm propertyId={unwrappedParams.id} />
      </div>
    </>
  );
};

export default AccommodationDetail;
