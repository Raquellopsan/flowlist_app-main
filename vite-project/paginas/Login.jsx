import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // Usamos useNavigate para redirigir al dashboard después del login exitoso
  const navigate = useNavigate();

  // Estado para almacenar los valores de email y contraseña
  const [Valor, setValor] = useState({
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

  // Función que maneja el envío del formulario (login)
  const login = async (evento) => {
    evento.preventDefault(); // Evita el comportamiento predeterminado del formulario
    try {
      // Realizamos la petición POST al backend para hacer login
      const respuesta = await axios.post(
        "http://localhost:4000/api/v1/login", // Endpoint de login en el backend
        Valor, // Los datos a enviar: email y contraseña
        {
          withCredentials: true, // Enviamos las cookies con la solicitud
        }
      );

      // Si el login es exitoso, almacenamos la información en localStorage
      localStorage.setItem("userLoggedIn", "yes");

      // Redirigimos al dashboard
      navigate("/dashboard");
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
          Inicia sesión en Flowlist
        </h3>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form
            autoComplete="on" // Activamos la autocompletación para mejorar la experiencia de usuario
            className="flex flex-col gap-4"
            onSubmit={login} // Llamamos a la función login cuando se envía el formulario
          >
            <input
              type="email" // El campo de email
              required // Hacemos que este campo sea obligatorio
              placeholder="email"
              className="border rounded px-4 py-2 border-[#FA9F42] w-[100%] outline-none placeholder-[#A4A2A2] text-[#FFB468] focus:shadow-[0_0_10px_#FA9F42]"
              name="email" // El nombre del input que se corresponde con el estado
              value={Valor.email} // El valor del input es el valor del estado
              onChange={change} // Llamamos a la función change cuando el valor cambia
              autoComplete="email" // Sugerimos el autocompletado para emails
            />

            <input
              type="password" // Campo de contraseña
              required // También obligatorio
              placeholder="contraseña"
              className="border rounded px-4 py-2 border-[#FA9F42] w-[100%] outline-none placeholder-[#A4A2A2] text-[#FFB468] focus:shadow-[0_0_10px_#FA9F42]"
              name="contraseña" // Lo asociamos con el estado para la contraseña
              value={Valor.contraseña} // El valor es el estado de contraseña
              onChange={change} // Actualizamos el estado cuando cambia
              autoComplete="current-password" // Sugerimos autocompletar con la contraseña actual
            />

            <button
              type="submit" // El botón envía el formulario
              className="bg-[#FA9F42] text-white font-semibold py-2 rounded hover:bg-[#FFB972] transition all duration-300"
            >
              Iniciar sesión
            </button>

            <p className="text-center text-[#A4A2A2]">
              {/* Si no tienes cuenta, puedes registrarte */}
              ¿No tienes una cuenta?{" "}
              <Link to={"/registro"} className="text-[#815BCE] font-semibold">
                Registrarse
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
