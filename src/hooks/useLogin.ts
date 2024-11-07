"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface LoginValues {
  email: string;
  password: string;
}

interface UseAuthReturn {
  login: (values: LoginValues) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  sendTokenToBackend: (token: string) => Promise<boolean>;
  error: string | null;
  successMessage: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { setToken, setUser} = useAuthStore();
  const router = useRouter();

  const login = async (values: LoginValues) => {
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Enviando solicitud de login...");

      const response = await fetch("http://localhost:3000/auth/login", {
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
      const user = data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      console.log("Token guardado:", token);
      console.log("Usuario guardado:", user);
      setSuccessMessage("Inicio de sesión exitoso!");

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso!",
        text: "Serás redirigido al perfil.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/profile");
        },
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

  const loginWithGoogle = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/google", {
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
          },
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

  const sendTokenToBackend = async (token: string) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("https://proyectochecasa.onrender.com/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el token al backend");
      }

      const data = await response.json();
      setSuccessMessage("Token enviado exitosamente.");
      console.log("Respuesta del backend:", data);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
      console.error("Error al enviar el token:", error);
      setError(message);
      return false;
    }
  };

  return { login, loginWithGoogle, sendTokenToBackend, error, successMessage };
};



