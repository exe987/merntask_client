import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareasContext";

const Proyecto = ({ proyecto }) => {
  //CONTEXT DE PROYECTOS
  const proyectosDeContext = useContext(proyectoContext);
  const { seleccionarProyecto } = proyectosDeContext;

  //CONTEXT DE TAREAS
  const tareasDeContext = useContext(tareasContext);
  const { obtenerTareas } = tareasDeContext;

  //FUNCION PARA FIJAR PROYECTO Y OBTENER SUS TAREAS
  const fijarProyecto = (id) => {
    seleccionarProyecto(id); //FUNCION PARA SELECCIONAR EL PROYECTO QUE VIENE DEL CONTEXT DE PROYECTOS
    obtenerTareas(id); //FUNCION PARA OBTENER TAREAS SEGUN ID. VIENE DEL CONTEXT DE TAREAS
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => fijarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
