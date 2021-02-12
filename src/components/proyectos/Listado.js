import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  //CONTEXT PROYECTOS
  const proyectosDeContext = useContext(proyectoContext);

  const {mensaje, proyectos, obtenerProyectos } = proyectosDeContext;

  //CONTEXT DE ALERTAS

  const alertasDeContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertasDeContext;

  //SI HAY PROYECTOS..
  useEffect(() => {
    //SI HAY UN ERROR
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  //SI PROYECTOS ESTA VACIO NO RETORNAR NADA
  if (proyectos.length === 0)
    return <p>NO HAY PROYECTOS, COMIENZA CREANDO UNO...</p>;

  return (
    <ul className="listado-proyectos">
         {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={300} classNames="proyecto">
            <Proyecto  proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
