import React, { useEffect, useState } from 'react';
import { IReview } from '../../interfaces/Reviews';

const AllReviews: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/reviews/");
        if (!response.ok) {
          throw new Error('Error al cargar las reseñas');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); 

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Todas las Reseñas</h2>
      <ul className="space-y-4">
      {reviews.length > 0 ? (
     reviews.map((review) => (
    <li
      key={review.id}
      className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
    >
        <h3 className="text-xl font-semibold">
         {review.property ? review.property.title : "Propiedad no disponible"}
       </h3>
        <p className="text-gray-600">{review.comment}</p>
       <p className="font-medium">
         Calificación: <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
        </p>
       <p className="text-gray-400 text-sm">Fecha: {review.reviewDate}</p>
      </li>
     ))
    ) : (
      <p>No hay reseñas para mostrar.</p>
)}
      </ul>
    </div>
  );
};

export default AllReviews;