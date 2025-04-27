import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarTarea = ({ setEditarTareasDiv, tareaActual, recargarTareas }) => {
  // Aseguramos que el estado solo se inicializa si tareaActual tiene valor
  const [Valor, setValor] = useState(tareaActual || {});

  useEffect(() => {
    if (tareaActual) {
      setValor(tareaActual); // Solo actualizamos si tareaActual tiene datos válidos
    }
  }, [tareaActual]);

  const change = (evento) => {
    const { name, value } = evento.target;
    setValor((prevValor) => ({ ...prevValor, [name]: value }));
  };

  const editarTarea = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await axios.put(
        `http://localhost:4000/api/v1/editarTarea/${Valor._id}`,
        Valor,
        { withCredentials: true }
      );

      if (respuesta.data.success) {
        alert(respuesta.data.success);
        setEditarTareasDiv("hidden");
        recargarTareas();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Error al editar tarea");
      } else if (error.request) {
        alert("No se recibió respuesta del servidor.");
      } else {
        alert("Error desconocido: " + error.message);
      }
    }
  };
  const eliminarTarea = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta tarea?")) {
      try {
        const respuesta = await axios.delete(
          `"https://flowlist-app-main-1.onrender.com/api/v1/eliminarTarea/"${Valor._id}`,
          { withCredentials: true }
        );

        // Verificamos si la respuesta contiene la clave 'success'
        if (respuesta.data.success) {
          alert("Tarea eliminada con éxito");
          setEditarTareasDiv("hidden");
          recargarTareas(); // Recargamos las tareas para que se actualicen
        } else {
          alert("No se pudo eliminar la tarea");
        }
      } catch (error) {
        if (error.response) {
          // Error detallado desde el servidor
          alert(error.response.data.error || "Error al eliminar tarea");
        } else if (error.request) {
          // No se recibió respuesta del servidor
          alert("No se recibió respuesta del servidor.");
        } else {
          // Otro tipo de error
          alert("Error desconocido: " + error.message);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-full sm:w-3/4 md:w-2/3 lg:w-[40%] mx-auto">
      <h1 className="text-center font-semibold text-xl text-[#636262]">
        Editar tarea
      </h1>
      <hr className="mb-4 mt-2 border-[#636262]" />

      {/* Verificamos si Valor tiene datos antes de renderizar el formulario */}
      {Valor && (
        <form className="flex flex-col gap-4" onSubmit={editarTarea}>
          <input
            type="text"
            className="border px-2 py-1 rounded border-zinc-300 outline-none"
            placeholder="Título"
            name="titulo"
            value={Valor?.titulo || ""}
            onChange={change}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full">
              <h3 className="mb-2 text-[#636262]">Selecciona la prioridad</h3>
              <select
                name="prioridad"
                className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
                value={Valor?.prioridad || "baja"}
                onChange={change}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className="w-full">
              <h3 className="mb-2 text-[#636262]">Selecciona el estado</h3>
              <select
                name="estado"
                className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
                value={Valor?.estado || "sinComenzar"}
                onChange={change}
              >
                <option value="sinComenzar">Sin comenzar</option>
                <option value="enProceso">En proceso</option>
                <option value="completadas">Completadas</option>
              </select>
            </div>
          </div>

          <textarea
            name="descripcion"
            placeholder="¿Cuál es la tarea?"
            className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
            value={Valor?.descripcion || ""}
            onChange={change}
          ></textarea>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="bg-blue-800 border border-blue-800 text-white py-2 rounded hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 w-full"
            >
              Editar
            </button>

            <button
              type="button"
              className="w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300 rounded"
              onClick={eliminarTarea}
            >
              Borrar
            </button>

            <button
              type="button"
              className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded"
              onClick={() => setEditarTareasDiv("hidden")}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditarTarea;
