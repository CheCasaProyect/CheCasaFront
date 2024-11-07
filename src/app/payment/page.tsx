"use client"; // Marca este archivo como componente del cliente

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentComponent from '@/components/PaymentButton';


const stripePromise = loadStripe('your_public_key');

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Proceso de Pago</h1>
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                  
                </div>
            </div>
        </Elements>
    );
};

export default PaymentPage;