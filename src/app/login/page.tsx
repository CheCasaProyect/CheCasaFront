"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import {useAuthStore} from "@/store/authStore";
// import { auth, provider } from "../../firebaseConfig"
import { getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useAuth } from "../../hooks/useLogin";
import Swal from "sweetalert2";
import { FirebaseError } from "firebase/app";


const Login = () => {
  const { login, sendTokenToBackend} = useAuth();
  const { error, successMessage, resetForm } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Email es obligatorio"),
    password: Yup.string()
      .matches(
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,15}$/,
        "Debe contener entre 8 y 15 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      )
      .required("Contraseña es obligatoria"),
  });

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
      console.log("Formulario enviado con valores:", values);
      await login(values);
      console.log("Mensaje de éxito:", successMessage);
      console.log("Mensaje de error:", error);
      setSubmitting(false);
      if (successMessage) {
        resetForm();
    }
  };
  // const signInWithGoogle = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if(auth){
  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       const token = await result.user.getIdToken();
  //       const sendSuccess = await sendTokenToBackend(token);
  //       console.log('Token:', token);
  //       if (sendSuccess) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Token enviado exitosamente",
  //           text: "¡Todo está listo!",
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error al enviar el token",
  //           text: error,
  //         });
  //       }
  //     } catch (error: unknown) {
  //       if (error instanceof FirebaseError) {
  //         if (error.code === 'auth/popup-closed-by-user') {
  //           console.warn('La ventana emergente fue cerrada por el usuario.');
  //           Swal.fire({
  //             icon: "warning",
  //             title: "Ventana cerrada",
  //             text: "Has cerrado la ventana emergente antes de completar el inicio de sesión.",
  //           });
  //         } else {
  //           console.error('Error de autenticación:', error);
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error de autenticación",
  //             text: error.message,
  //           });
  //         }
  //       } else {
  //         console.error('Error desconocido:', error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error desconocido",
  //           text: "Ha ocurrido un error inesperado.",
  //         });
  //       }
  //     }
  //   }
  // };
      
  

  // const signInWithGoogle = () => {
  //   console.log("Auth:", auth);
  //   console.log("Provider:", provider);
  //   if(auth){
  //     signInWithPopup(auth, provider)
  //   }else {
  //     console.error("Firebase auth es null")
  //   }
  // };
  // useEffect(() => {
  //   const fetchRedirectResult = async () => {
  //     if (auth) {
  //       try {
  //         const result = await getRedirectResult(auth);
  //         console.log("Resultado de redirección:", result);
  //         if (result) {
  //           const token = await result.user.getIdToken();
  //           console.log("Token recibido:", token);
  //           const sendSuccess = await sendTokenToBackend(token); 
  //           console.log("¿Token enviado con éxito?:", sendSuccess);
  //           if (sendSuccess) {
  //             Swal.fire({
  //               icon: "success",
  //               title: "Token enviado exitosamente",
  //               text: "¡Todo está listo!",
  //             });
  //           } else {
  //             Swal.fire({
  //               icon: "error",
  //               title: "Error al enviar el token",
  //               text: error,
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Error de autenticación:', error);
  //       }
  //     } else {
  //       console.error("Firebase auth es null");
  //     }
  //   };

  //   fetchRedirectResult();
  // }, [auth, sendTokenToBackend])

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#fffefe] text-[#0a0a0a] pt-20 lg:pt-40 pb-20">
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-2xl px-5 sm:px-10 mb-10 lg:mb-0">
        <Image
          src="https://i.postimg.cc/G3QXSw8Y/carpincho.png"
          alt="Carpi Bienvenida"
          width={300}
          height={300}
          layout="responsive"
          className="object-cover w-48 h-48 sm:w-64 sm:h-64 mb-6 lg:mb-0 lg:mr-8"
        />
        <div className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
            Che! Volviste
          </h2>
          <p className="leading-relaxed text-base sm:text-lg lg:text-xl mb-6">
            Bienvenido a la experiencia del turismo argentino. Desde la majestuosidad de la Patagonia hasta las vibrantes ciudades, estamos aquí para ayudarte a planificar tu próxima aventura.
          </p>
        </div>
      </div>
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 lg:ml-20">
        <h2 className="text-xl sm:text-2xl font-bold text-center tracking-wider">
          Inicia sesión
        </h2>

        {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg text-[#0a0a0a] placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Contraseña"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <button
                  type="button"
                  aria-label="Mostrar/Ocultar contraseña"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#a6d2ff] rounded-md hover:bg-[#76bafe] transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Inicia Sesión"}
              </button>
            </Form>
          )}
        </Formik>

        {/* <button onClick={signInWithGoogle} className="flex items-center justify-center w-full border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#f8f9fa] rounded-md hover:bg-[#efefe9] transition duration-300">
          <Image src="https://i.postimg.cc/kX92B8Gx/images-Photoroom.png" alt="Google Logo" width={24} height={24} className="mr-2" />
          Inicia sesión con Google
        </button> */}

        <div className="text-center mt-4">
          <p className="text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register">
              <span className="text-blue-600 hover:underline">Regístrate aquí</span>
            </Link>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="/forgotPassword">
              <span className="text-blue-600 hover:underline">Recuperala aquí</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;