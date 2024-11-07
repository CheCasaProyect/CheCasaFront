import React, { useEffect, useState } from "react";
import { IPropiedad } from "@/interfaces/Properties"; 
import CardAccommodation from "@/app/accommodations/CardAccommodation";

const FilterPropertiesComponent = () => {
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    price: "",
  });
  
  const [properties, setProperties] = useState<IPropiedad[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/properties')
      .then((res) => res.json())
      .then((res) => setProperties(res))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/properties/filter?priceMax=${filters.price || ''}&state=${filters.state || ''}&city=${filters.city || ''}`
      );
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setProperties(data);
      } else {
        setProperties([]);
        console.log("No se encontraron propiedades que coincidan con los filtros.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="state"
          placeholder="Estado"
          className="p-3 border border-gray-300 rounded-md w-1/4 text-black"
          onChange={(e) => handleFilterChange(e, "state")}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          className="p-3 border border-gray-300 rounded-md w-1/4 text-black"
          onChange={(e) => handleFilterChange(e, "city")}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio (min,max)"
          className="p-3 border border-gray-300 rounded-md w-1/4 text-black"
          onChange={(e) => handleFilterChange(e, "price")}
        />
        <button
          type="submit"
          className="bg-black text-white p-3 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Filtrar
        </button>
      </form>

      <div className="flex gap-6 mt-8 mx-auto justify-center">
        {properties.length > 0 ? (
          properties.map((property) => (
            <CardAccommodation
              key={property.id}
              id={property.id}
              title={property.title}
              description={property.description}
              price={Number(property.price)}
              photos={property.photos}
              latitude={property.latitude}
              longitude={property.longitude}
              provincia={''}
              stripePriceId={undefined}
              stripeProductId={undefined}
            />
          ))
        ) : (
          <p className="text-gray-600">
            No se encontraron propiedades que coincidan con los filtros.
          </p>
        )}
      </div>
    </div>
  );
};

export default FilterPropertiesComponent;
