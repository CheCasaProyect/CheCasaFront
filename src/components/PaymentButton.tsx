"use client"; 

import React from 'react';

interface PaymentButtonProps {
  propertyId: any;
  stripeProductId: any;
  stripePriceId: any;
  price: number;
 
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ stripeProductId , stripePriceId, price, propertyId}) => {
 console.log( stripeProductId ,stripePriceId );
  const handlePayment = async () => {
    if (!stripeProductId || !stripePriceId) {
      console.error('stripeProductId o stripePriceId están vacíos');
      return;
    }
    try {
      const response = await fetch('http://localhost:3002/stripe/testingPayments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripePriceId: stripePriceId,
          stripeProductId:  stripeProductId

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
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Reservar ahora por ${price}
    </button>
  );
};

export default PaymentButton;