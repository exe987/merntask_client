import React, { useContext } from "react";
import tareasContext from "../../context/tareas/tareasContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  //STATE DE PROYECTO SELECCIONADO
  const proyectosDeContext = useContext(proyectoContext);
  const { proyecto } = proyectosDeContext;

  //CONTEXT DE TAREAS
  const tareasDeContext = useContext(tareasContext);
  const {
    eliminarTarea,
    obtenerTareas,
    editarTarea,
    guardarTareaActual,
  } = tareasDeContext;

  //ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto;

  //ELIMINAR TAREA
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  //CAMBIAR ESTADO DE TAREA
  const cambiaEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    editarTarea(tarea);
  };

  //SELECCIONAR TAREA PARA EDITAR
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiaEstado(tarea)}
          >
            COMPLETO
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiaEstado(tarea)}
          >
            INCOMPLETO
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          EDITAR
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          ELIMINAR
        </button>
      </div>
    </li>
  );
};

export default Tarea;
