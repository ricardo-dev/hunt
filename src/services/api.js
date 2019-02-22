// arquivo para acesso a banco de dados e api
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rocketseat-node.herokuapp.com/api'
});

export default api;