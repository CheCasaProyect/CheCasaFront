import React from "react";
import useFetchUser from "../../hooks/useFetchUser";

const UserProfile: React.FC = () => {
  const { user, loading, error } = useFetchUser();

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
