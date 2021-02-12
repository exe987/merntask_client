import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //OBTENER STATE DE FORMULARIO
  const proyectosDeContext = useContext(proyectoContext);
  const { formulario, mostrarFormulario, agregarProyecto, errorform,  mostrarError } = proyectosDeContext;

  //STATE DE PROYECTO
  const [proyecto, nuevoProyecto] = useState({
    nombre: "",
  });

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = (e) => {
    //ACTUALIZA EL STATE
    nuevoProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  //EXTRAER NOMBRE DE PROYECTO
  const { nombre } = proyecto;

  //SUBMIT DE PROYECTO
  const submitProyect = (e) => {
    //NO RECARGAR PAGINA
    e.preventDefault();
    //VALIDACION
    if (nombre === ""){
      mostrarError();
      return;
    } 

    //AGREGAR AL STATE
    agregarProyecto(proyecto);
    //REINICIAR EL FORM
    nuevoProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={mostrarFormulario}
      >
        NUEVO PROYECTO
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={submitProyect}>
          <input
            type="text"
            className="input-text"
            placeholder="NOMBRE PROYECTO"
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
          <input
            type="submit"
            className="btn btn-block btn-primario"
            placeholder="AGREGAR PROYECTO"
          />
        </form>
      ) : null}

      {errorform ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p>: null}
    </Fragment>
  );
};

export default NuevoProyecto;
