import React, { useEffect, useState } from "react";
import IUser from "@/interfaces/Iuser";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      } else {
        setError("No se encontró información de usuario.");
      }
    } catch (e) {
      setError("Error al cargar la información del usuario.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="bg-white p-6 rounded-md shadow-md mb-8 flex items-center space-x-6">
      <img
        src={user?.profileImgUrl || "https://i.postimg.cc/G3QXSw8Y/carpincho.png"}
        alt="Foto de perfil"
        className="w-24 h-24 rounded-full object-cover shadow-sm"
      />
      <div>
        <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
        {loading ? (
          <p>Cargando información del usuario...</p>
        ) : error ? (
          <p>{error}</p>
        ) : user ? (
          <div className="mb-4">
            <p>
              <span className="font-semibold">Nombre:</span> {user.firstname} {user.lastname}
            </p>
            <p>
              <span className="font-semibold">Correo electrónico:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span> {user.phone}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default UserProfile;
