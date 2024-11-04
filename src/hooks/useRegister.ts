import { useState } from "react";
import useAuthStore  from "@/store/authStore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const { setToken, setUser, setError, setSuccessMessage, clearMessages } =
    useAuthStore();
  const router = useRouter();
  const [localError, setLocalError] = useState("");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const registerUser = async (values: any) => {
    setError("");
    setSuccessMessage("");
    clearMessages();
    try {
      console.log("Enviando solicitud de registro...");
      values.phone = String(values.phone);
      console.log("Datos enviados:", JSON.stringify(values));

      const response = await fetch("https://proyectochecasa.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Datos enviados:", JSON.stringify(values));

      if (response.status === 201) {
        const contentType = response.headers.get("Content-Type");
        const data = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        console.log("Datos recibidos:", data);

        setToken(data.token);
        setUser(data.user);
        setSuccessMessage("¡Registro exitoso!");

        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Serás redirigido al login",
          confirmButtonColor: "#0a0a0a",
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            router.push("/login");
          },
        });
      } else if (response.status === 400) {
        const contentType = response.headers.get("Content-Type");
        const errorData = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        console.log("Error en la respuesta:", errorData);
        throw new Error(errorData.message || "Error en la solicitud. Revisa los datos ingresados.");
      } else {
        throw new Error("Ocurrió un error inesperado. Intentá de nuevo más tarde.");
      }
    } catch (error) {
      console.log("Error en el catch:", error);
      if (error instanceof Error) {
        setLocalError(error.message);
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonColor: "#0a0a0a",
        });
      } else {
        setLocalError("Un error desconocido ocurrió.");
        setError("Un error desconocido ocurrió.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Un error desconocido ocurrió.",
          confirmButtonColor: "#0a0a0a",
        });
      }
    }
  };

  return { registerUser, localError };
};
