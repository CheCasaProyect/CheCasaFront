import React from "react";
import { travelHistory, user } from "../utilities/user";

const UserDashboard = () => {


  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#0a0a0a]">
        <aside className="w-full md:w-1/4 bg-[#f2f2f2] text-[#0a0a0a] p-5 space-y-6 mt-20 h-full">
  <nav className="space-y-4 mt-24">
    <div className="w-full">
      <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-300 text-left max-w-xs">
        Perfil
      </a>
    </div>
    <div className="w-full">
      <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-300 text-left max-w-xs">
        Historial de viajes
      </a>
    </div>
    <div className="w-full">
      <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-300 text-left max-w-xs">
        Métodos de pago
      </a>
    </div>
    <div className="w-full">
      <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-300 text-left max-w-xs ">
        Ajustes
      </a>
    </div>
  </nav>
</aside>
    <main className="w-3/4 p-8 mt-20"> 
      <section className="bg-white p-6 rounded-md shadow-md mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>
      <section className="bg-white p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4">Historial de Viajes</h3>
        <div className="space-y-4">
          {travelHistory.map((trip) => (
            <div
              key={trip.id}
              className="flex justify-between bg-gray-100 p-4 rounded-md"
            >
              <div>
                <h4 className="font-semibold text-lg">{trip.destination}</h4>
                <p className="text-gray-600">{trip.date}</p>
              </div>
              <button className="text-blue-500 hover:underline">
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
  );
};

export default UserDashboard;
