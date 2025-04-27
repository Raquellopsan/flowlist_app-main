import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Registro from "../paginas/Registro";
import "./App.css";
import Login from "../paginas/Login";
import Dashboard from "../paginas/Dashboard";

const App = () => {
  const navigate = useNavigate();

  // Redirigir según la autenticación
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    if (userLoggedIn === "yes") {
      navigate("/dashboard"); // Si está logueado, redirige al dashboard
    } else {
      navigate("/login"); // Si no está logueado, redirige al login
    }
  }, [navigate]); // Dependemos solo de navigate para evitar redirección infinita

  return (
    <div className="animated-bg h-screen w-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Ruta de redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
