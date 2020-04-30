import axios from 'axios'

const ApiBackend = axios.create({
    baseURL: 'http://localhost:7878/'
})

export default ApiBackend;