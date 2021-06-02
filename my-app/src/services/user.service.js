import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const GET_USER_API = 'http://localhost:8080/api/profile/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getUser(id){
    return axios.get(GET_USER_API + id, { headers: authHeader() });
}

getPassword(id){
  return axios.get(GET_USER_API +`getPassword/${id}`,{ headers: authHeader() })
}
updateFullname(data){
  return axios.put(GET_USER_API +'updateFullname',data,{ headers: authHeader() })
}
updatePassword(data){
  return axios.put(GET_USER_API +'updatePassword',data,{ headers: authHeader() })
}

}

export default new UserService();