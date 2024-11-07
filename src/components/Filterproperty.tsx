import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const PropertyFilter = () => {
   const [location, setLocation] = useState('');
   const [checkInDate, setCheckInDate] = useState(null);
   const [checkOutDate, setCheckOutDate] = useState(null);
   const [guests, setGuests] = useState(1);
   

   const handleSearch = () => {
      console.log({
         location,
         checkInDate,
         checkOutDate,
         guests
      });
      
   };

   return (
      <div className="flex items-center rounded-full shadow-lg p-4">
         <div className="flex-grow">
            <label>Lugar</label>
            <input
               type="text"
               placeholder="Explorar destinos"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
               className="bg-transparent focus:outline-none"
            />
         </div>
         <div className="border-r h-6 mx-4"></div>
         <div className="flex-grow">
            <label>Check-in</label>
            <input
               type="date"
               placeholder="¿Cuándo?"
               value={checkInDate}
               onChange={(e) => setCheckInDate(e.target.value)}
               className="bg-transparent focus:outline-none"
            />
         </div>
         <div className="border-r h-6 mx-4"></div>
         <div className="flex-grow">
            <label>Check-out</label>
            <input
               type="date"
               placeholder="¿Cuándo?"
               value={checkOutDate}
               onChange={(e) => setCheckOutDate(e.target.value)}
               className="bg-transparent focus:outline-none"
            />
         </div>
         <div className="border-r h-6 mx-4"></div>
         <div className="flex-grow">
            <label>Viajeros</label>
            <input
               type="number"
               min="1"
               placeholder="¿Cuántos?"
               value={guests}
               onChange={(e) => setGuests(Number(e.target.value))}
               className="bg-transparent focus:outline-none"
            />
         </div>
         <button onClick={handleSearch} className="ml-4 bg-pink-500 p-3 rounded-full text-white">
            <FaSearch />
         </button>
      </div>
   );
};

export default PropertyFilter;
