import axios from 'axios';

const API_URL = 'http://localhost:5000/';

const register = (user) => {
  return axios.post(API_URL + 'users', user);
};

const login = (user) => {

  return axios
    .post(API_URL + 'login', user)

    .then((response) => {
      if (response.data.data.token) {  
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  getCurrentUser,
};

export default AuthService;
