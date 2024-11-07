"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import FilterProperties from './Filterproperty';


const Navbar: React.FC = () => {

  const router = useRouter();
  const { user, resetForm } = useAuthStore();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);


  const handleLogout = () => {
    resetForm();
    setUserData(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="https://gcdnb.pbrd.co/images/iTKeM8yxSMmq.png?o=1"
              alt="Logo"
              className="h-10 w-20 md:h-15 md:w-20 mr-2"
            />
          </Link>
        </div>
        <div className="flex space-x-2 md:space-x-4 mt-3 md:mt-0">
          {userData ? (
            <>
              <Link href="/profile">
                <button className="px-4 py-2 bg-black text-white font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-gray-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
                  Perfil
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 bg-black text-white font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-gray-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2">
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 bg-black text-white font-medium text-sm md:text-base rounded-md shadow-lg hover:bg-gray-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
