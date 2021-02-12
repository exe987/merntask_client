import clienteAxios from './axios';


//FUNCION PARA COLOCAR EL TOKEN EN LOS HEADERS
const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token
    }else{
        delete clienteAxios.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth;