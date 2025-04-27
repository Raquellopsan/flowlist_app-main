import React from "react";
import CardTareas from "./CardTareas";

const EnProceso = ({ tarea, handleClickEditarTarea }) => {
  // Verificamos si 'tarea' es un array antes de intentar renderizar
  if (!Array.isArray(tarea)) {
    return <p>No hay tareas para mostrar</p>; // Mensaje en caso de que no haya tareas
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Recorremos todas las tareas en el array 'tarea' */}
      {tarea.map((items) => (
        <div
          key={items._id || items.titulo} // Usamos _id o un fallback con el título como key
          className="cursor-pointer" // Hacemos que la tarea sea clickeable
          onClick={() => handleClickEditarTarea(items)} // Al hacer clic, pasamos el objeto de la tarea para editarla
        >
          {/* Componente para mostrar la tarea, pasamos la información y el handler */}
          <CardTareas
            key={items._id || items.titulo}
            data={items} // Pasamos todos los datos de la tarea
            handleClickEditarTarea={handleClickEditarTarea} // Pasamos la función para editar la tarea
          />
        </div>
      ))}
    </div>
  );
};

export default EnProceso;
