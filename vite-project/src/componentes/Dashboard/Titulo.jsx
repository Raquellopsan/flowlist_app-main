import React from "react";

const Titulo = ({ title }) => {
  return (
    <div className="pb-2">
      {" "}
      {/* Div contenedor con espacio inferior */}
      <h1 className="font-semibold text-lg text-[#636262] text-center">
        {" "}
        {/* Estilos para el título */}
        {title} {/* Se muestra el título pasado como prop */}
      </h1>
    </div>
  );
};

export default Titulo;
