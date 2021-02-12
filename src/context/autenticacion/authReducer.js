import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/Index";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false
      };
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        mensaje: action.payload,
        cargando: false
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false
      };

    default:
      return state;
  }
};
