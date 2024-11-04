"use client"
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

interface LoginValues {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();


  const login = async (values: LoginValues) => {
    setError(null);
    setSuccessMessage(null);
    
    try {
      console.log("Enviando solicitud de login...");

      const response = await fetch("https://proyectochecasa.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        console.log("Error en la respuesta:", errorData);
        throw new Error(errorData.message || "Error en los datos de inicio de sesión.");
      }

      if (!response.ok) {
        throw new Error("Error inesperado en el servidor. Intentá de nuevo más tarde.");
      }

      const data = await response.json();
      console.log("Datos recibidos:", data);

      if (!data.token) {
        throw new Error("La respuesta del servidor no contiene un usuario o token válido.");
      }

      const token = data.token;
      
      setToken(token);
      setSuccessMessage("Inicio de sesión exitoso!");

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso!",
        text: "Serás redirigido al perfil.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/profile");
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
      console.log("Error en el catch:", error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

  return { login, error, successMessage };
};
export const loginWithGoogle = async () => {
  const router = useRouter(); 
  try {
    const response = await fetch("https://proyectochecasa.onrender.com/auth/google", {
      method: "POST",
      credentials: "include", 
    });
    if (response.ok) {
      console.log("Inicio de sesión con Google exitoso");

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso!",
        text: "Serás redirigido al perfil.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/profile"); 
        }
      });
    } else {
      const errorData = await response.json();
      console.error("Error en el inicio de sesión con Google:", errorData.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorData.message || "No se pudo iniciar sesión con Google.",
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Google", error);
  }
};

// export const loginWithGoogle = async () => {
//   try {
//     const response = await fetch("https://proyectochecasa.onrender.com/auth/google", {
//       method: "POST",
//       credentials: "include", 
//     });
//     if (response.ok) {
//       console.log("Inicio de sesión con Google exitoso");
//     } else {
//       const errorData = await response.json();
//       console.error("Error en el inicio de sesión con Google:", errorData.message);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: errorData.message || "No se pudo iniciar sesión con Google.",
//       });
//     }
//   } catch (error) {
//     console.error("Error al iniciar sesión con Google", error);
//   }
// };

