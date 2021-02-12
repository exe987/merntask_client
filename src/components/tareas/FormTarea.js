import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareasContext";


const FormTarea = () => {
  //STATE DE PROYECTO SELECCIONADO
  const proyectosDeContext = useContext(proyectoContext);
  const { proyecto } = proyectosDeContext;

  //CONTEXT DE TAREAS
  const tareasDeContext = useContext(tareasContext);
  const {
    tareaSeleccionada,
    agregarTareas,
    errorTarea,
    validarTarea,
    obtenerTareas,
    editarTarea,
    eliminarTareaSeleccionada,
  } = tareasDeContext;

  //STATE DE TAREAS
  const [tarea, addTarea] = useState({
    nombre: "",
  });

  //EFFECT QUE VERIFICA SI HAY UNA TAREA SELECCIONADA PARA EDITAR
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      addTarea(tareaSeleccionada);
    } else {
      addTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  //SI NO HAY PROYECTO SELECCIONADO
  if (!proyecto) return null;

  //ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto;

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = (e) => {
    //ACTUALIZA EL STATE
    addTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  //DESTRUCTURING DE TAREA
  const { nombre } = tarea;

  //SUBMIT DE TAREA
  const submitTarea = (e) => {
    e.preventDefault();
    //VALIDACION
    if (nombre.trim() === "") {
      //MOSTRAR ERROR Y NO CARGAR TAREA
      validarTarea();
      return;
    }
    // SI PASA LA VALIDACION....
    //EN CASO DE QUE LA TAREA SEA UNA NUEVA TAREA
    if (tareaSeleccionada === null) {
      tarea.proyecto = proyectoActual._id; //AGREGAMOS ID DE PROYECTO PARA ASIGNARLO
      
      agregarTareas(tarea);
    } else {
      //SI ES UNA TAREA EXISTENTE EDITAR
      editarTarea(tarea);
      //LUEGO LIMPIAR TAREA SELECCIONADA DE STATE
      eliminarTareaSeleccionada();
    }

    //OBTENER Y FILTRAR TAREAS DEL PROYECTO ACTUAL
    obtenerTareas(proyectoActual._id);

    //REINICIAR EL FORMULARIO
    addTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={submitTarea}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="NOMBRE DE TAREA"
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "EDITAR TAREA" : "AGREGAR TAREA"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
