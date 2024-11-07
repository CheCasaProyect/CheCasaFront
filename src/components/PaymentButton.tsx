import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { IPropiedad } from '@/interfaces/Properties';

const stripePromise = loadStripe('your-public-stripe-key'); // Clave pública de Stripe

interface propertyStripeProps {
  property: IPropiedad; 
}

const PaymentButton: React.FC<propertyStripeProps> = ({ property }) => {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  if (!property) {
    return <div className='text-black'>No se ha proporcionado una propiedad válida.</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Error al cargar Stripe');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/stripe/testingPayments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property,
          checkIn,
          checkOut,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Error al obtener la URL de pago:', data);
      }
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Check In</label>
        <input 
          type="date" 
          value={checkIn || ""} // Usa una cadena vacía si checkIn es null
          onChange={(e) => setCheckIn(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Check Out</label>
        <input 
          type="date" 
          value={checkOut || ""} // Usa una cadena vacía si checkOut es null
          onChange={(e) => setCheckOut(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Pagar con Stripe</button>
    </form>
  );
}


export default PaymentButton;