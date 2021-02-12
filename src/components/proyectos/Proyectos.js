import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  //USAMOS EL CONTEXT DE AUTENTICACION
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  //CUANDO SE RECARGUE ESTE COMPONENTE DE PROYECTOS MANDAMOS A LLAMAR A LOS DATOS DEL USUARIO AUTENTICADO
  //ESTO PERMITE QUE AL RECARGARSE LA PAGINA NO SE PIERDAN LOS DATOS DEL USUARIO
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
