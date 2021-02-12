import React, { useReducer } from "react";
import AlertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer";

import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from "../../types/Index";


const AlertaState = (props) => {
  //ESTADO INICIAL
  const initialState = {
      alerta: null
  };

  //REDUCER
  const [state, dispatch] = useReducer(alertaReducer, initialState);

 
  //FUNCION PARA MOSTRAR ALERTA
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
          msg,
          categoria
      }
    });
    //LIMPIAR ALERTA DESPUES DE 5 SEGUNDOS
    setTimeout(()=>{
        dispatch({
            type: OCULTAR_ALERTA,
        });
    }, 5000)
  };

  //RETORNA
  return (
    <AlertaContext.Provider value={{
        alerta: state.alerta,
        mostrarAlerta,
    }}>{props.children}</AlertaContext.Provider>
  );
};

export default AlertaState;
