// src/componentes/dashboard/MyComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Hacer la solicitud GET usando axios
    axios
      .get(`${apiUrl}/api/endpoint`)
      .then((response) => {
        setData(response.data); // Guardar los datos en el estado
        console.log("Datos obtenidos:", response.data);
      })
      .catch((error) => {
        setError(error); // Guardar el error en el estado
        console.error("Error al obtener los datos:", error);
      });
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez, cuando el componente se monte

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Datos obtenidos</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
