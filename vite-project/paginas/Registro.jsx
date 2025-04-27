import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  // Usamos useNavigate para redirigir al login después de registrarse
  const navigate = useNavigate();

  // Estado para almacenar los valores de nombre de usuario, email y contraseña
  const [Valor, setValor] = useState({
    nombreUsuario: "",
    email: "",
    contraseña: "",
  });

  // Función que maneja el cambio de valor en los inputs
  const change = (evento) => {
    const { name, value } = evento.target;
    setValor({ ...Valor, [name]: value }); // Actualiza el estado con los nuevos valores
  };

  {
    /*console.log(Valor);*/
    // Descomentar para ver el estado actual
  }

  // Función que maneja el envío del formulario (registro)
  const registro = async (evento) => {
    evento.preventDefault(); // Evita el comportamiento predeterminado del formulario
    try {
      // Realizamos la petición POST al backend para registrar al usuario
      const respuesta = await axios.post(
        "http://localhost:4000/api/v1/registro", // Endpoint de registro en el backend
        Valor // Los datos a enviar: nombre de usuario, email y contraseña
      );

      // Si el registro es exitoso, mostramos un mensaje y redirigimos al login
      alert(respuesta.data.success);
      navigate("/login");
    } catch (error) {
      // Si hay un error, mostramos el mensaje de error
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* He usado vw para ajustar el ancho de la caja, el 60% es una medida flexible */}
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-[#815BCE]">
          Flowlist
        </h1>
        <h3 className="text-center font-semibold text-[#A4A2A2] ">
          Registrate en Flowlist
        </h3>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={registro} // Llamamos a la función registro cuando se envía el formulario
            autoComplete="on" // Activamos la autocompletación para mejorar la experiencia de usuario
            method="POST"
          >
            <input
              type="text" // Campo para el nombre de usuario
              required // Hacemos que este campo sea obligatorio
              placeholder="nombre de usuario"
              className="border rounded px-4 py-2 border-[#FA9F42] w-[100%] outline-none placeholder-[#A4A2A2] text-[#FFB468] focus:shadow-[0_0_10px_#FA9F42]"
              name="nombreUsuario" // El nombre del input que se corresponde con el estado
              value={Valor.nombreUsuario} // El valor del input es el valor del estado
              onChange={change} // Llamamos a la función change cuando el valor cambia
              autoComplete="username" // Sugerimos autocompletar con el nombre de usuario
            />

            <input
              type="email" // Campo para el email
              required // También obligatorio
              placeholder="email"
              className="border rounded px-4 py-2 border-[#FA9F42] w-[100%] outline-none placeholder-[#A4A2A2] text-[#FFB468] focus:shadow-[0_0_10px_#FA9F42]"
              name="email" // Asociamos el input al estado para el email
              value={Valor.email} // El valor es el estado de email
              onChange={change} // Actualizamos el estado cuando cambia
              autoComplete="email" // Activamos autocompletar con el email
            />

            <input
              type="password" // Campo de contraseña
              required // Hacemos que sea obligatorio
              placeholder="contraseña"
              className="border rounded px-4 py-2 border-[#FA9F42] w-[100%] outline-none placeholder-[#A4A2A2] text-[#FFB468] focus:shadow-[0_0_10px_#FA9F42]"
              name="contraseña" // Lo asociamos con el estado de contraseña
              value={Valor.contraseña} // El valor es el estado de contraseña
              onChange={change} // Llamamos a la función change cuando cambia
              autoComplete="new-password" // Sugerimos autocompletar con la nueva contraseña
            />

            <button
              type="submit" // El botón envía el formulario
              className="bg-[#FA9F42] text-white font-semibold py-2 rounded hover:bg-[#FFB972] transition all duration-300"
            >
              Registrarse
            </button>

            <p className="text-center text-[#A4A2A2]">
              {/* Si ya tienes cuenta, puedes iniciar sesión */}
              ¿Ya tienes una cuenta?{" "}
              <Link to={"/Login"} className="text-[#815BCE] font-semibold">
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
