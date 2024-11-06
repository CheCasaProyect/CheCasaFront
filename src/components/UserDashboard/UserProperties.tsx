// import React, { useState } from "react";
// import { IPropiedad } from "../../interfaces/Properties";
// import RentPropertyForm from "../../app/RentPropertyForm/page"; 

// interface MyPropertiesProps {
//   properties: IPropiedad[];
// }

// const MyProperties: React.FC<MyPropertiesProps> = ({ properties }) => {
//   const [isFormVisible, setIsFormVisible] = useState(false); 

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>
//       <ul className="space-y-4">
//         {properties.map((property) => (
//           <li
//             key={property.id}
//             className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//           >
//             <h3 className="text-xl font-semibold">{property.name}</h3>
//             <p className="text-gray-600">{property.location}</p>
//             <p className="font-medium">
//               Precio por noche:{" "}
//               <span className="text-green-500">${property.price}</span>
//             </p>
//             <p className="text-sm text-gray-500">
//               Capacidad: {property.capacity} personas, {property.rooms}{" "}
//               habitaciones, {property.bathroom} baño(s)
//             </p>
//           </li>
//         ))}
//       </ul>
//         <div className="flex justify-end mt-4"> 
//         <button
//           onClick={toggleFormVisibility}
//           className="w-60 py-2 px-4 bg-[#ffe677] text-black font-semibold rounded-lg shadow-md hover:bg-[#fadc54] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
//         >
//           {isFormVisible ? 'Cancelar' : 'Añadir Nueva Propiedad'}
//         </button>
//       </div>
//       {isFormVisible && <RentPropertyForm />}
//     </div>
//   );
// };

// export default MyProperties;

import React, { useEffect, useState } from "react";
import { IPropiedad } from "../../interfaces/Properties";
import RentPropertyForm from "../../app/RentPropertyForm/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface MyPropertiesProps {}

const MyProperties: React.FC<MyPropertiesProps> = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    if (userId) {
      fetch(`https://proyectochecasa.onrender.com/properties/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener propiedades");
          }
          return response.json();
        })
        .then((data) => {
          const userProperties = data.filter(
            (property: IPropiedad) => property.owner.id === userId
          );
          setProperties(userProperties);
        })
        .catch((error) => console.error("Error al obtener propiedades:", error));
    }
  }, [userId]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>
      <ul className="space-y-4">
        {properties.map((property) => (
          <li
            key={property.id}
            className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.city}</p>
            <p className="font-medium">
              Precio por noche:{" "}
              <span className="text-green-500">${property.price}</span>
            </p>
            <p className="text-sm text-gray-500">
              Capacidad: {property.capacity} personas, {property.bedrooms}{" "}
              habitaciones, {property.bathrooms} baño(s)
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <button
          onClick={toggleFormVisibility}
          className="w-60 py-2 px-4 bg-[#ffe677] text-black font-semibold rounded-lg shadow-md hover:bg-[#fadc54] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          {isFormVisible ? "Cancelar" : "Añadir Nueva Propiedad"}
        </button>
      </div>
      {isFormVisible && <RentPropertyForm />}
    </div>
  );
};

export default MyProperties;
