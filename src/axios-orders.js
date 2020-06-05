import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-d3afc.firebaseio.com/'
});

export default instance;