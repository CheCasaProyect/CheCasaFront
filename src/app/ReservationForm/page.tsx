"use client";

import { useState } from "react";

interface ReservationFormProps {
  propertyId: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ propertyId }) => {
  const [userId, setUserId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [pax, setPax] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reservationData = {
      propertyId,
      userId,
      checkIn,
      checkOut,
      pax,
    };

    try {
      const reservationResponse = await fetch("http://localhost:3001/reservations/newReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!reservationResponse.ok) {
        const errorData = await reservationResponse.json();
        setError(`Error en la reserva: ${errorData.message}`);
        return;
      }

      const paymentResponse = await fetch("http://localhost:3001/stripe/paymentSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          checkIn,
          checkOut,
        }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok || !paymentData.url) {
        setError("Error al iniciar la sesiÃ³n de pago.");
        return;
      }

      window.location.href = paymentData.url;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      setError("Hubo un problema con la reserva o el pago.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Realizar Reserva</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-800 text-lg">ID de usuario:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Fecha de entrada:</label>
          <input
            type="datetime-local"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Fecha de salida:</label>
          <input
            type="datetime-local"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Cantidad de personas:</label>
          <input
            type="number"
            id="pax"
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            min="1"
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 transition"
        >
          Reservar
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;