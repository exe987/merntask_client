import React from "react";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from "./context/proyectos/proyectoState";
import TareasState from "./context/tareas/tareasState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from './components/rutas/RutaPrivada'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//REVISAR SI HAY TOKEN PARA QUE AL RECARGAR LA PAGINA NO PIERDA LOS DATOS DEL USUARIO AUTENTICADO
const token = localStorage.getItem("token");

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <ProyectoState>
        <TareasState>
          <AlertaState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AlertaState>
        </TareasState>
      </ProyectoState>
    </AuthState>
  );
}

export default App;
