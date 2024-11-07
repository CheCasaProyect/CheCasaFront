import React, { useEffect, useState } from "react";
import { IReservationDetail } from "../../interfaces/ReservationDetail";
import useFetchUser from "@/hooks/useFetchUser";

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const { user, loading, error } = useFetchUser();

  useEffect(() => {
    if (user?.id) {
      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/reservations/${user.id}/user`
          );
          if (!response.ok) {
            throw new Error("Error al cargar las reservas");
          }
          const data = await response.json();
          setReservations(data);
        } catch (err: any) {
          console.error(err.message);
        }
      };

      fetchReservations();
    }
  }, [user]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
      <ul className="space-y-4">
        {reservations.length > 0 ? (
          reservations.map((reservationDetail) => (
            <li
              key={reservationDetail.id}
              className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {reservationDetail.property}
                </h3>
                <p className="text-gray-600">
                  Fecha de entrada:{" "}
                  <span className="text-blue-500">
                    {reservationDetail.checkIn}
                  </span>
                </p>
                <p className="text-gray-600">
                  Fecha de salida:{" "}
                  <span className="text-blue-500">
                    {reservationDetail.checkOut}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Huéspedes: {reservationDetail.pax}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No tienes reservas.</p>
        )}
      </ul>
    </div>
  );
};

export default MyReservations;
