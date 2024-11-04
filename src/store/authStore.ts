import { create } from "zustand";
import IAuthState from "../interfaces/Auth";
import IUser from "@/interfaces/Iuser";

const useAuthStore = create<IAuthState>((set) => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    set({ token: savedToken });

    fetch("https://proyectochecasa.onrender.com/user-profile-endpoint", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => set({ user: userData }))
      .catch(() => set({ error: "No se pudo cargar la información del usuario" }));
  }

  return {
    token: null,
    user: null as IUser | null,
    error: "",
    successMessage: "",
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    setError: (error) => set({ error }),
    setSuccessMessage: (message) => set({ successMessage: message }),
    clearMessages: () => set({ error: "", successMessage: "" }),
    resetForm: () =>
      set({
        token: null,
        user: null,
        error: "",
        successMessage: "",
      }),
    loginUser: async (email: string, password: string) => {
      try {
        const response = await fetch("https://proyectochecasa.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Credenciales incorrectas.");
        }

        const data = await response.json();
        const { token } = data;

        set({ token, error: "", successMessage: "Inicio de sesión exitoso" });

        localStorage.setItem("token", token);
      } catch (error: any) {
        set({ error: error.message || "Error en el inicio de sesión", successMessage: "" });
      }
    },
    logoutUser: () => {
      set({ token: null, user: null, error: "", successMessage: "" });
      localStorage.removeItem("token");
    },
  };
});

export default useAuthStore;



// export const useAuthStore = create<IAuthState>((set) => ({
//   token: null,
//   user: null as IUser | null,
//   error: "",
//   successMessage: "",

//   setToken: (token) => set({ token }),
//   setUser: (user) => set({ user }),
//   setError: (error) => set({ error }),
//   setSuccessMessage: (message) => set({ successMessage: message }),
//   clearMessages: () => set({ error: "", successMessage: "" }),
//   resetForm: () =>
//   set({
//     token: null,
//     user: null,
//     error: "",
//     successMessage: "",
//   }),

//   loginUser: async (email: string, password: string) => {
//     try {
//       const response = await fetch("https://proyectochecasa.onrender.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Credenciales incorrectas.");
//       }

//       const data = await response.json();
//       const { token } = data;

//       set({ token, error: "", successMessage: "Inicio de sesión exitoso" });

//       localStorage.setItem("token", token);
//     } catch (error: any) {
//       set({ error: error.message || "Error en el inicio de sesión", successMessage: "" });
//     }
//   },
// }));

// logoutUser: () => {
//   set({ token: null, user: null, error: "", successMessage: "" });
//   localStorage.removeItem("token");
// },