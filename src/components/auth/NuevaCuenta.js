import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  //CONTEXT DE ALERTAS
  const alertaDeContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaDeContext;

  //CONTEXT DE AUTENTICACION
  const authDeContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authDeContext;

  //EN CASO DE QUE EL USUARIO SE HAYA AUTENTICADO, REGISTRADO O EL REGISTRO SEA DUPLICADO
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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //EXTRAER DATOS DE USUARIO

  const { nombre, email, password, confirmar } = user;

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
    //VALIDAR QUE NO HAYA CAMPOS VACIOS
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === "" ||
      nombre.trim() === ""
    ) {
      //MOSTRAMOS ALERTA
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //PASSWORD MINIMO DE 6 CARACTERES
    if (password.length < 6) {
      //MOSTRAMOS ALERTA
      mostrarAlerta(
        "La contraseña debe ser, de al menos seis caracteres",
        "alerta-error"
      );
      return;
    }

    //VERIFICAR SI EL PASSWORD Y SU CONFIRMACION SON IGUALES
    if (password !== confirmar) {
      //MOSTRAMOS ALERTA
      mostrarAlerta("Las contraseñas deben coincidir", "alerta-error");
      return;
    }

    //PASARLO AL ACTION
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>OBTENER UNA CUENTA</h1>

        <form onSubmit={submitData}>
          <div className="campo-form">
            <label htmlFor="nombre">NOMBRE</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="INGRESA NOMBRE"
              value={nombre}
              onChange={handleChange}
            />
          </div>
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
            <label htmlFor="confirmar">CONFIRMA PASSWORD</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="CONFIRMA TU CONTRASEÑA"
              onChange={handleChange}
              value={confirmar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="REGISTRAR USUARIO"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
