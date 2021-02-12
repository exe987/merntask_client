import React, { useReducer } from "react";
import TareasContext from "./tareasContext";
import tareasReducer from "./tareasReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREAS,
  VALIDAR_TAREAS,
  ELIMINAR_TAREAS,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/Index";

const TareasState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  //DISPATCH
  const [state, dispatch] = useReducer(tareasReducer, initialState);

  //OBTENER TAREAS SEGUN ID
  const obtenerTareas = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: respuesta.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //AGREGAR TAREAS
  const agregarTareas = async (tarea) => {
    try {
      //EN CASO DE EXITO SE HACE LA LLAMADA A API Y SE GUARDAN LOS DATOS
      const respuesta = await clienteAxios.post("/api/tareas", tarea);

      dispatch({
        type: AGREGAR_TAREAS,
        payload: respuesta,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //VALIDA Y MUESTRA UN ERROR
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREAS,
    });
  };

  //ELIMINAR TAREA
  const eliminarTarea = async (tareaId, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${tareaId}`, {
        params: { proyecto },
      });

      dispatch({
        type: ELIMINAR_TAREAS,
        payload: tareaId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //CAPTURAR TAREA PARA EDITAR
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //EDITAR TAREA
  const editarTarea = async (tarea) => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: respuesta.data.tarea,
      });
    } catch (error) {}
  };

  //ELIMINAR TAREA SELECCIONADA PARA EDITAR
  const eliminarTareaSeleccionada = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  //RETORNA
  return (
    <TareasContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTareas,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        editarTarea,
        eliminarTareaSeleccionada,
      }}
    >
      {props.children}
    </TareasContext.Provider>
  );
};

export default TareasState;
