import React from "react";
import CardTareas from "../Dashboard/CardTareas";

const SinComenzar = ({ tarea, handleClickEditarTarea }) => {
  // Validación para asegurar que `tarea` es un array
  if (!Array.isArray(tarea)) {
    return <p>No hay tareas para mostrar</p>; // Si no es un array, mostramos un mensaje
  }

  return (
    <div className="flex flex-col gap-2 ">
      {/* Mapeamos las tareas y renderizamos una tarjeta por cada tarea */}
      {tarea.map((items) => (
        <div
          key={items._id || items.titulo} // Usamos _id o un fallback con el título para garantizar que cada elemento tenga una clave única
          className="cursor-pointer"
          onClick={() => handleClickEditarTarea(items)} // Cuando se hace clic en una tarea, se pasa el objeto de tarea a la función `handleClickEditarTarea`
        >
          <CardTareas
            key={items._id || items.titulo} // Se pasa el objeto tarea como prop
            data={items}
            handleClickEditarTarea={handleClickEditarTarea}
          />
        </div>
      ))}
    </div>
  );
};

export default SinComenzar;
