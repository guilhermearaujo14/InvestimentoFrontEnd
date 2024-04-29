import axios from 'axios'

const api = axios.create({
    baseURL: 'https://high-deadpool-orange-bahrain.bohr.io'
    //'http://localhost:3300/'
})
export default api;