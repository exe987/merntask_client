import {
  TAREAS_PROYECTO,
  AGREGAR_TAREAS,
  VALIDAR_TAREAS,
  ELIMINAR_TAREAS,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/Index";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
      };

    case AGREGAR_TAREAS:
      return {
        ...state,
        //AL ARRAY DE TAREAS DEL STATE SE LE AGREGAN LA TAREA INGRESADA POR USUARIO
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errorTarea: false,
      };
    case VALIDAR_TAREAS:
      return {
        ...state,
        errorTarea: true,
      };

    case ELIMINAR_TAREAS:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };

   

    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload,
      };

    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };

    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null,
      };

    default:
      return state;
  }
};
