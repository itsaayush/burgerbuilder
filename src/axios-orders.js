import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-1c03e.firebaseio.com/'
});

export default instance;