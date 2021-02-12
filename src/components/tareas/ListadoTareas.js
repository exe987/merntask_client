import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareasContext";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  //STATE DE PROYECTO SELECCIONADO
  const proyectosDeContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosDeContext;

  //CONTEXT DE TAREAS
  const tareasDeContext = useContext(tareasContext);
  const { tareasProyecto } = tareasDeContext;

  //SI NO HAY PROYECTO SELECCIONADO
  if (!proyecto) return <h2>SELECCIONE UN PROYECTO</h2>;

  //ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto;

  //FUNCION PARA ELIMINAR PROYECTO
  const deleteTask = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>PROYECTO: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li>NO HAY TAREAS</li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition
                key={tarea._id}
                timeout={500}
                classNames="tarea"
              >
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button type="button" className="btn btn-eliminar" onClick={deleteTask}>
        ELIMINAR PROYECTO &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
