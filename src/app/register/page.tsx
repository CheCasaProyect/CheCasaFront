"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image';
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import Link from "next/link";

const register = () => {
  const { registerUser, localError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Nombre es obligatorio"),
    lastname: Yup.string().required("Apellido es obligatorio"),
    email: Yup.string().email("Formato de email inválido").required("Email es obligatorio"),
    password: Yup.string()
      .matches(
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,15}$/,
        "La contraseña debe contener entre 8 y 15 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)"
      )
      .required("Contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
      .required("Confirmación de contraseña es obligatoria"),
    phone: Yup.string()
      .required("Teléfono es obligatorio")
      .matches(/^[0-9]+$/, "El teléfono debe contener solo números"),
    birthdate: Yup.date().required("Fecha de nacimiento es obligatoria"),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    registerUser(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen bg-[#fffefe] text-[#0a0a0a] pt-20 lg:pt-40 pb-20">
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center max-w-md px-5 sm:px-10 mb-10 lg:mb-0">
        <Image
          src="https://i.postimg.cc/G3QXSw8Y/carpincho.png"
          alt="Carpi Bienvenida"
          width={256}
          height={256}
          className="object-cover w-48 h-48 sm:w-64 sm:h-64 mb-6 lg:mb-0 lg:mr-2 lg:ml-12"
        />
        <div className="text-center lg:text-left lg:ml-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Che! Registrate
          </h2>
          <p className="leading-relaxed text-base sm:text-lg lg:text-xl mb-6">
            "Bienvenido a tu próxima aventura en Argentina. Registrate para
            descubrir los mejores alojamientos locales y viví una experiencia
            única en cada rincón del país."
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg p-6 sm:p-8 bg-white bg-opacity-90 border border-[#0a0a0a] rounded-md shadow-lg space-y-6 mr-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center tracking-wider">
          Crear una cuenta
        </h2>

        {localError && <div className="text-red-500 text-center">{localError}</div>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Nombre"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                />
                <ErrorMessage name="firstname" component="div" className="text-red-500" />
              </div>

              <div className="relative">
                  <label className="sr-only">Apellido</label>                
                  <Field
                  type="text"
                  name="lastname"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Apellido"
                />
                <ErrorMessage name="lastname" component="div" className="text-red-500" />
              </div>

              <div className="relative">
                <label className="sr-only">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div className="relative">
                <label className="sr-only">Fecha de nacimiento</label>
                <Field
                  type="date"
                  name="birthdate"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                />
                <ErrorMessage name="birthdate" component="div" className="text-red-500" />
              </div>

              <div className="relative">
                <label className="sr-only">Teléfono</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Teléfono"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500" />
              </div>
              
               <div className="relative">
                <label className="sr-only">Contraseña</label>
                <Field
                  type={showPassword ? "text" : "password"}  
                  name="password"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Contraseña"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <div className="relative">
                <label className="sr-only">Confirmar Contraseña</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full bg-transparent border-b border-[#0a0a0a] text-lg placeholder-gray-500 focus:outline-none p-2"
                  placeholder="Confirmar Contraseña"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>
              
        
              
              <div className="flex justify-between mt-6 space-x-4">
                <button
                  type="submit"
                  className="flex-1 border border-[#0a0a0a] text-[#0a0a0a] text-sm py-2 bg-[#a6d2ff] rounded-md hover:bg-[#6486a8] transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Cargando..." : "Registrarse"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <p className="text-sm">
            ¿Ya tenes una cuenta?{" "}
            <Link href="/login">
              <span className="text-blue-600 hover:underline">Inicia sesión</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default register;