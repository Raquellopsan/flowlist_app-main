import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Importación de componentes y hooks de React Router
import Registro from "../paginas/Registro"; // Componente de registro
import "./App.css"; // Estilos para la aplicación
import Login from "../paginas/Login"; // Componente de login
import Dashboard from "../paginas/Dashboard"; // Componente de dashboard

const App = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    // Si hay un usuario logueado en el localStorage, redirige al dashboard
    if (localStorage.getItem("userLoggedIn")) {
      navigate("/dashboard");
    } else {
      // Si no hay usuario logueado, redirige al login
      navigate("/login");
    }
  }, []); // Se ejecuta una sola vez cuando el componente se monta

  return (
    <>
      <div className="animated-bg h-screen w-full">
        {" "}
        {/* Fondo con animación que cubre toda la pantalla */}
        <Routes>
          {" "}
          {/* Configuración de rutas */}
          {/* Rutas de la aplicación */}
          <Route path="/registro" element={<Registro />} />{" "}
          {/* Ruta para la página de registro */}
          <Route path="/login" element={<Login />} />{" "}
          {/* Ruta para la página de login */}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Ruta para el dashboard */}
        </Routes>
      </div>
    </>
  );
};

export default App;
