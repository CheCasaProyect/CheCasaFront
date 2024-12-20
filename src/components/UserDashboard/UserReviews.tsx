// import React from 'react';
// import { IReview } from '../../interfaces/Reviews';

// const MyReviews: React.FC = () => {
//   const reviews: IReview[] = [
//     {
//       id: '1',
//       user: {
//           id: '',
//           firstname: '',
//           lastname: '',
//           birthdate: '',
//           phone: '',
//           email: ''
//       }, 
//       property: {
//           id: '1', name: 'Apartamento en la playa',
//           price: 0,
//           direction: '',
//           images: [],
//           capacity: 0,
//           rooms: 0,
//           bathroom: 0,
//           location: ''
//       }, 
//       reviewDate: '2024-10-30',
//       comment: '¡Una experiencia maravillosa! La vista era increíble.',
//       rating: 5,
//     },
//     {
//       id: '',
//       user: {
//           id: '',
//           firstname: '',
//           lastname: '',
//           birthdate: '',
//           phone: '',
//           email: ''
//       },
//       property: {
//           id: '', name: '',
//           price: 0,
//           direction: '',
//           images: [],
//           capacity: 0,
//           rooms: 0,
//           bathroom: 0,
//           location: ''
//       },
//       reviewDate: '2024-10-29',
//       comment: 'El lugar era hermoso, pero un poco frío en la noche.',
//       rating: 4,
//     },
//     {
//       id: '3',
//       user: {
//           id: '',
//           firstname: '',
//           lastname: '',
//           birthdate: '',
//           phone: '',
//           email: ''
//       },
//       property: {
//           id: '', name: '',
//           price: 0,
//           direction: '',
//           images: [],
//           capacity: 0,
//           rooms: 0,
//           bathroom: 0,
//           location: ''
//       },
//       reviewDate: '2024-10-28',
//       comment: 'Excelente ubicación, pero el servicio podría mejorar.',
//       rating: 3,
//     },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
//       <ul className="space-y-4">
//         {reviews.map((review) => (
//           <li
//             key={review.id}
//             className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//           >
//             <h3 className="text-xl font-semibold">{review.property.name}</h3>
//             <p className="text-gray-600">{review.comment}</p>
//             <p className="font-medium">
//               Calificación: <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
//             </p>
//             <p className="text-gray-400 text-sm">Fecha: {review.reviewDate}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyReviews;
import React, { useEffect, useState } from 'react';
import { IReview } from '../../interfaces/Reviews';

const MyReviews: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("auth/reviews/${propertyId}"); 
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
  }, [propertyId]);

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
      <ul className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold">{review.property.title}</h3>
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

export default MyReviews;
