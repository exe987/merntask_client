import React, { useState, useContext, useEffect  } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
const Login = (props) => {
  //CONTEXT DE ALERTAS
  const alertaDeContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaDeContext;

  //CONTEXT DE AUTENTICACION
  const authDeContext = useContext(AuthContext);
  const {autenticado, mensaje, iniciarSesion } = authDeContext;


  //EN CASO DE QUE EL LOGIN SSEA EXITOSO
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
     // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //STATE DE DATOS USUARIO

  const [user, saveUser] = useState({
    email: "",
    password: "",
  });

  //EXTRAER DATOS DE USUARIO

  const { email, password } = user;

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = (e) => {
    //ACTUALIZA EL STATE
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT DE DATOS PARA INICIAR SESION

  const submitData = (e) => {
    e.preventDefault();
    //VALIDACION
    if (email.trim() === "" || password.trim() === ""){ 
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return;
    };
    //PASARLO AL ACTION
    iniciarSesion({ email, password})
  };

  return (
    <div className="form-usuario">
        {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>INICIAR SESION</h1>

        <form onSubmit={submitData}>
          <div className="campo-form">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="INGRESA EMAIL"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="INGRESA TU CONTRASEÑA"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="INICIAR SESION"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
