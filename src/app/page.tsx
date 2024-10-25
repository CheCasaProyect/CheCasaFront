import React from 'react';
import CardAccommodation from './accommodations/CardAccommodation';
import { accommodations } from './utilities/accommodations';

export default function Home() {
  return (
    <>
<div className="Home flex flex-wrap justify-center gap-5 p-8"> {/* Usar flex y justify-center */}
  {accommodations.map((accommodation) => (
    <CardAccommodation
      key={accommodation.id}
      id={accommodation.id}
      title={accommodation.title}
      description={accommodation.description}
      price={accommodation.price}
      image={accommodation.image}
    />
  ))}
</div>


      
    </>
  );
}
