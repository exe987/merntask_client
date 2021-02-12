import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/Index";

const AuthState = (props) => {
  //ESTADO INICIAL
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  //REDUCER
  const [state, dispatch] = useReducer(authReducer, initialState);

  //FUNCION PARA REGISTRAR USUARIO
  const registrarUsuario = async (datos) => {
    try {
      //EN CASO DE EXITO SE HACE LA LLAMADA A API Y SE GUARDAN LOS DATOS
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.usuario,
      });
      //OBTENER EL USUARIO
      usuarioAutenticado();
    } catch (error) {
      //EN CASO DE ERROR PODEMOS VER POR CONSOLA QUE NOS TRAE EL MSG DEL BACK
      //UTILIZARLO EN EL PAYLOAD COMO UNA ALERTA
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };
  //RETORNA EL USUARIO AUTENTICADO PARA INICIO DE SESION
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO: FUNCION PARA COLOCAR EL TOKEN POR HEADERS
      tokenAuth(token);
    }
    try {
      //EN CASO DE EXITO SE HACE LA LLAMADA A API Y SE GUARDAN LOS DATOS
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //FUNCION PARA INICIO DE SESION
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //OBTENER EL USUARIO
      usuarioAutenticado();
    } catch (error) {
      //EN CASO DE ERROR PODEMOS VER POR CONSOLA QUE NOS TRAE EL MSG DEL BACK
      //UTILIZARLO EN EL PAYLOAD COMO UNA ALERTA
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };


  //CERRAR SESION
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
