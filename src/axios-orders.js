import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-8bcb4.firebaseio.com/'
}); 

export default instance;