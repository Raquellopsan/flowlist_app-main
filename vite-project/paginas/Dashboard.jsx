import React, { useState, useEffect } from "react";
import Header from "../src/componentes/Dashboard/Header";
import AñadirTarea from "../src/componentes/Dashboard/AñadirTarea";
import Titulo from "../src/componentes/Dashboard/Titulo";
import SinComenzar from "../src/componentes/Dashboard/SinComenzar";
import EnProceso from "../src/componentes/Dashboard/EnProceso";
import Completadas from "../src/componentes/Dashboard/Completadas";
import axios from "axios";
import EditarTarea from "../src/componentes/Dashboard/EditarTarea";
// import MyComponent from "../src/componentes/Dashboard/MyComponent";

const Dashboard = () => {
  // Estados para manejar la visibilidad de las divisiones de añadir y editar tarea
  const [añadirTareaDiv, setAñadirTareaDiv] = useState("hidden");
  const [editarTareasDiv, setEditarTareasDiv] = useState("hidden");
  // Estado para la tarea actual que se va a editar
  const [tareaActual, setTareaActual] = useState(null);
  // Estados para las tareas divididas por estado (sin comenzar, en proceso, completadas)
  const [tareasSinComenzar, setTareasSinComenzar] = useState([]);
  const [tareasEnProceso, setTareasEnProceso] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState([]);

  // Función que se ejecuta al hacer clic en "Editar tarea" para mostrar el modal de edición
  const handleClickEditarTarea = (tarea) => {
    setTareaActual(tarea); // Establecemos la tarea que se va a editar
    setEditarTareasDiv("block"); // Mostramos el div de editar tarea
  };

  // Función para cargar los detalles del usuario, incluidas las tareas
  const fetDetallesUsuario = async () => {
    try {
      const respuesta = await axios.get(
        "https://flowlist-app-main-1.onrender.com/api/v1/detallesUsuario",
        { withCredentials: true } // Aseguramos que se envíen las cookies de sesión
      );
      // Asignamos las tareas a sus respectivos estados
      setTareasSinComenzar(respuesta.data.tareas.sinComenzar || []);
      setTareasEnProceso(respuesta.data.tareas.enProceso || []);
      setTareasCompletadas(respuesta.data.tareas.completadas || []);
    } catch (error) {
      console.error(error); // En caso de error, lo mostramos en la consola
    }
  };

  // useEffect para cargar los detalles del usuario (incluyendo tareas) cuando el componente se monta
  useEffect(() => {
    fetDetallesUsuario();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAñadirTareaDiv={setAñadirTareaDiv} />{" "}
        {/* Componente para el header */}
      </div>

      <div className="px-4 sm:px-8 md:px-12 py-4 flex flex-col md:flex-row gap-8 md:gap-12 bg-white justify-center min-h-[89vh]">
        {/* Sección de tareas sin comenzar */}
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Titulo title="Sin Comenzar" />
          <div className="pt-2">
            <SinComenzar
              tarea={tareasSinComenzar}
              handleClickEditarTarea={handleClickEditarTarea}
            />
          </div>
        </div>

        {/* Sección de tareas en proceso */}
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Titulo title="En Proceso" />
          <div className="pt-2">
            <EnProceso
              tarea={tareasEnProceso}
              handleClickEditarTarea={handleClickEditarTarea}
            />
          </div>
        </div>

        {/* Sección de tareas completadas */}
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Titulo title="Completadas" />
          <div className="pt-2">
            <Completadas
              tarea={tareasCompletadas}
              handleClickEditarTarea={handleClickEditarTarea}
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-8">
        <Titulo title="Nuevo Componente" />
        <MyComponent />
      </div>

      {/* Fondo negro para añadir tarea (cuando se muestra el formulario) */}
      <div
        className={`w-full ${añadirTareaDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${añadirTareaDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AñadirTarea
          setAñadirTareaDiv={setAñadirTareaDiv}
          recargarTareas={fetDetallesUsuario}
        />
      </div>

      {/* Fondo negro para editar tarea (cuando se muestra el modal de edición) */}
      <div
        className={`w-full ${editarTareasDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${editarTareasDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        {tareaActual && (
          <EditarTarea
            setEditarTareasDiv={setEditarTareasDiv}
            tareaActual={tareaActual}
            recargarTareas={fetDetallesUsuario}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
