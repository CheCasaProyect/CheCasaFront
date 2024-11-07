import React, { useEffect, useState } from "react";
import { IPropiedad } from "../../interfaces/Properties";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface MyPropertiesProps {}

const AllProperties: React.FC<MyPropertiesProps> = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);

  useEffect(() => {
    const url = 'https://proyectochecasa.onrender.com/properties/';
    const headers = {
      'Content-Type': 'application/json',
    };
  
    console.log('Enviando solicitud con encabezados:', headers); 
  
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener propiedades");
        }
        return response.json();
      })
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => console.error("Error al obtener propiedades:", error));
  }, []);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null); 
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Propiedades</h2>

      {selectedProperty ? (
        <div className="property-detail">
          <button
            onClick={handleBackToList}
            className="flex items-center text-black-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
            Volver a la lista de propiedades
          </button>
          <h3 className="text-xl font-semibold">{selectedProperty.title}</h3>
          <p className="text-gray-600">{selectedProperty.city}</p>
          <p className="text-gray-600">{selectedProperty.street} {selectedProperty.number}</p>
          <p className="font-medium">
            Precio por noche:{" "}
            <span className="text-green-500">${selectedProperty.price}</span>
          </p>
          <p className="text-sm text-gray-500">
            Capacidad: {selectedProperty.capacity} personas, {selectedProperty.bedrooms}{" "}
            habitaciones, {selectedProperty.bathrooms} baño(s)
          </p>
          <p className="text-sm text-gray-500">{selectedProperty.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {selectedProperty.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Propiedad ${selectedProperty.title} Foto ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((property) => (
            <li
              key={property.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
              onClick={() => handlePropertyClick(property)} 
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
      )}
    </div>
  );
};

export default AllProperties;