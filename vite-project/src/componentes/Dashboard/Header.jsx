import React from "react";
import { IoAddCircleOutline, IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ setAñadirTareaDiv }) => {
  const navigate = useNavigate();

  // Función para manejar el logout
  const logout = async () => {
    try {
      // Enviamos la solicitud POST al servidor para cerrar sesión
      const respuesta = await axios.post(
        "https://flowlist-app-main-1.onrender.com/api/v1/logout",
        {},
        { withCredentials: true }
      );

      // Mostramos el mensaje de éxito del servidor
      alert(respuesta.data.message);

      // Limpiamos el localStorage para eliminar cualquier dato guardado del usuario
      localStorage.clear("userLoggedIn");

      // Redirigimos al usuario a la página de login después de cerrar sesión
      navigate("/login");
    } catch (error) {
      // Mostramos cualquier error en la consola si la solicitud falla
      console.log(error);
    }
  };

  return (
    <div className="flex px-12 py-4 items-center justify-between border-b">
      <div>
        {/* Nombre de la aplicación */}
        <h1 className="text-2xl text-[#815BCE] font-bold">Flowlist</h1>
      </div>
      <div className="flex gap-8">
        {/* Botón para abrir la ventana de añadir tarea */}
        <button
          className="text-2xl text-[#636262] hover:text-[#FA9F42] transition-all duration-300"
          onClick={() => setAñadirTareaDiv("block")} // Cambia el estado para mostrar el formulario de agregar tarea
        >
          <IoAddCircleOutline />
        </button>

        {/* Botón para cerrar sesión */}
        <button
          className="text-2xl text-[#636262] hover:text-red-800 transition-all duration-300"
          onClick={logout} // Ejecuta la función de logout al hacer clic
        >
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Header;
