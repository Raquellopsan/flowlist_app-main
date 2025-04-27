import React from "react";
import CardTareas from "./CardTareas";

const Completadas = ({ tarea, handleClickEditarTarea }) => {
  // Verificamos si 'tarea' es un arreglo, si no, mostramos un mensaje personalizado
  if (!Array.isArray(tarea)) {
    return <p>No hay tareas para mostrar</p>; // Puedes personalizar este mensaje
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Iteramos sobre el arreglo de tareas y creamos un componente CardTareas para cada una */}
      {tarea.map((items) => (
        <div
          key={items._id || items.titulo} // Usamos _id o un fallback con el título en caso de que no exista el _id
          className="cursor-pointer" // Agregamos estilo para que el cursor sea de tipo pointer cuando pase sobre la tarea
          onClick={() => handleClickEditarTarea(items)} // Pasamos la tarea completa a la función handleClickEditarTarea
        >
          {/* Componente CardTareas recibe la tarea y la función para editar */}
          <CardTareas
            key={items._id || items.titulo} // Usamos el mismo key para CardTareas para optimizar la renderización
            data={items} // Pasamos los datos de la tarea
            handleClickEditarTarea={handleClickEditarTarea} // Le pasamos la función handleClickEditarTarea
          />
        </div>
      ))}
    </div>
  );
};

export default Completadas;
