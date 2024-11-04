import { useState, useEffect } from 'react';
import  useAuthStore  from '../store/authStore'; 
import IUser from '../interfaces/Iuser';

const useFetchUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useAuthStore((state: { token: any; }) => state.token);
  const authUser = useAuthStore((state: { user: any; }) => state.user); 

  useEffect(() => {
    if (!token || !authUser?.id) return; 

    const fetchUser = async () => {
      console.log("Token:", token);
      console.log("Auth User ID:", authUser.id);
      try {
        const response = await fetch(`https://proyectochecasa.onrender.com/users/${authUser.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          switch (response.status) {
            case 401:
              throw new Error('No autorizado. Por favor, inicia sesión.');
            case 404:
              throw new Error('Usuario no encontrado.');
            case 500:
              throw new Error('Error del servidor. Intenta nuevamente más tarde.');
            default:
              throw new Error('Error desconocido al obtener la información del usuario.');
          }
        }

        const data: IUser = await response.json();
        console.log("User data:", data);
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'No se pudo obtener la información del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, authUser]);

  return { user, loading, error };
};

export default useFetchUser;
