import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";


//COMPONENTE PARA REDIRIGIR AL USUARIO AL DASHBOARD O NO SEGUN SI ESTA AUTENTICADO
const RutaPrivada = ({ component: Component, ...props }) => {
  //USAMOS EL CONTEXT DE AUTENTICACION
  const authContext = useContext(AuthContext);
  const { cargando, autenticado, usuarioAutenticado } = authContext;

  //PARA QUE CUANDO SE RECARGUE EL COMPONENTE EL AUTENTICADO NO VUELVA A NULL
  useEffect(()=>{
    usuarioAutenticado();
     // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default RutaPrivada;
