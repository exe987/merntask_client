import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //USAMOS EL CONTEXT DE AUTENTICACION
  const authContext = useContext(AuthContext);
  const { cerrarSesion, usuarioAutenticado, usuario } = authContext;

  //CUANDO SE RECARGUE ESTE COMPONENTE DE PROYECTOS MANDAMOS A LLAMAR A LOS DATOS DEL USUARIO AUTENTICADO
  //ESTO PERMITE QUE AL RECARGARSE LA PAGINA NO SE PIERDAN LOS DATOS DEL USUARIO
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion" onClick={cerrarSesion}>
          CERRAR SESION
        </button>
      </nav>
    </header>
  );
};

export default Barra;
