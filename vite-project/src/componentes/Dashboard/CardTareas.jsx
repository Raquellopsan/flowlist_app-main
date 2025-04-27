import React from "react";

const CardTareas = ({ data, handleClickEditarTarea }) => {
  return (
    <button
      className="bg-white rounded px-4 w-[100%] py-2 hover:shadow transition-all duration-300"
      // Al hacer click, se ejecuta la función handleClickEditarTarea pasando la tarea actual como argumento
      onClick={() => handleClickEditarTarea(data)}
    >
      <div className="flex item-center justify-between">
        {/* Título de la tarea */}
        <h1 className="">{data.titulo}</h1>

        {/* Contenedor para la prioridad de la tarea con estilos condicionales */}
        <div
          className={`text-sm ${
            data.prioridad === "baja"
              ? "text-[#6CBA5A] bg-[#E7F4E4]" // Estilo para prioridad baja
              : data.prioridad === "media"
              ? "text-[#5BCEC9] bg-[#CEF6F5]" // Estilo para prioridad media
              : "text-[#F3533B] bg-[#F4CAC4]" // Estilo para prioridad alta
          } px-2 rounded-full`}
        >
          <p>{data.prioridad}</p>
        </div>
      </div>
      {/* Línea divisoria */}
      <hr className="my-2" />

      {/* Descripción de la tarea */}
      <p className="text-sm text-zinc-500 text-left ">{data.descripcion}</p>
    </button>
  );
};

export default CardTareas;
