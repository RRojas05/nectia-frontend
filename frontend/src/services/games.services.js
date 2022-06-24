import axios from 'axios';
import authHeader from '../common/authheader';
const API_URL = 'http://localhost:5000/games/';

const getGames = async () => {
  return axios.get(API_URL, { headers: authHeader() }).then((response) => {
    
    return response.data;
  }).catch((err)=>{
  //   if( err.response.status===401){
  //     localStorage.setItem('user', {});
  // }
});
};

const deleteGame = async (code) => {
  const urlDelete = API_URL + '/' + code;

  return axios.delete(urlDelete, { headers: authHeader() }).then((response) => {
    if (response.status === 201) {
      return response.data;
    }
  });
};

const updateGame = async (game) => {
  const urlUpdate = API_URL + '/' + game.code;

  return axios
    .patch(urlUpdate, game, { headers: authHeader() })
    .then((response) => {
      if (response.status === 201) {
        return response.data;
      }
    });
};

const insertGame = async (game) => {
  return axios
    .post(API_URL, game, { headers: authHeader() })
    .then((response) => {
      if (response.status === 201) {
        return response.data;
      }else{
        return false;
      }
    }).catch((err)=>{
      return false
    });
};

const GamesServices = {
  getGames,
  deleteGame,
  insertGame,
  updateGame,
};

export default GamesServices;
