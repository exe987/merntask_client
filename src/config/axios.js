import axios from 'axios';

//ENDPOINT PARA HACER PETICIONES AL BACKEND
const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;