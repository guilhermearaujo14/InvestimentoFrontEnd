import axios from 'axios'

console.log(import.meta.env.VITE_APP_URL_BASE)

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_BASE

})
export default api;


    //'https://high-deadpool-orange-bahrain.bohr.io/api/core/'
    //'http://localhost:3300/'