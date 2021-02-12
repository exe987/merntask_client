import React, { useReducer } from "react";
import ProyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  SELECCIONAR_PROYECTO,
  ELIMINAR_PROYECTO,
} from "../../types/Index";

const ProyectoState = (props) => {
  //ESTADO INICIAL
  const initialState = {
    proyectos: [],
    formulario: false,
    errorform: false,
    proyecto: null,
    mensaje: null,
  };

  //DISPATCH PARA EJECUTAR LAS ACCIONES
  //DONDE STATE ES NUESTRO ESTADO INICIAL Y DISPATCH LA FUNCION QUE LO CAMBIA
  //USE REDUCER TOMA COMO PARAMETROS EL REDUCER QUE CREAMOS Y EL ESTADO INICIAL
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //FUNCIONES PARA HACER EL CRUD

  //FUNCION PARA MOSTRAR EL FORMULARIO
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //OBTENER PROYECTOS
  const obtenerProyectos = async () => {
    try {
      //EN CASO DE EXITO SE HACE LA LLAMADA A API Y SE GUARDAN LOS DATOS
      const respuesta = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: respuesta.data.proyectos,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error ",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //AGREGAR PROYECTO
  const agregarProyecto = async (proyecto) => {
    try {
      //EN CASO DE EXITO SE HACE LA LLAMADA A API Y SE GUARDAN LOS DATOS
      const respuesta = await clienteAxios.post("/api/proyectos", proyecto);

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error ",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //FUNCION PARA VALIDAR FORMULARIO
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //FUNCION PARA SELECCIONAR PROYECTO
  const seleccionarProyecto = (proyectoId) => {
    dispatch({
      type: SELECCIONAR_PROYECTO,
      payload: proyectoId,
    });
  };

  //FUNCION PARA ELIMINAR PROYECTO
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error ",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //RETORNA
  return (
    <ProyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorform: state.errorform,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        seleccionarProyecto,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
