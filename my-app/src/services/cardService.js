import axios from 'axios';
import authHeader from './auth-header';

const ALL_CARDS_API = 'http://localhost:8080/api/card/allCards'
const ADD_CARD_API = 'http://localhost:8080/api/card/addCard'
const GET_CARD_API = 'http://localhost:8080/api/card/getCards/'

const GET_TASK_API = 'http://localhost:8080/api/card/getTasks/'
const ADD_TASK_API = 'http://localhost:8080/api/card/addTask'

const EDIT_CARD_API = 'http://localhost:8080/api/card/addCard'
const UPDATE_STATUS_API = 'http://localhost:8080/api/card/update_status/'

const DELETE_CARD_API = 'http://localhost:8080/api/card/deleteCard/' 

const SEARCH_BY_NAME = 'http://localhost:8080/api/card/searchByName/'



class CardService {
    getCards(){
        return axios.get(ALL_CARDS_API, { headers: authHeader()});
    }

    getOneCard(id){
        return axios.get(GET_CARD_API + id, { headers: authHeader() });
    }
    searchCard(searchTxt){
        return axios.post(SEARCH_BY_NAME, searchTxt,{ headers: authHeader() })
    }

    addCard(card){
        return axios.post(ADD_CARD_API, card, { headers: authHeader() });
    }

    addTask(task){
        return axios.post(ADD_TASK_API, task,{ headers: authHeader() });
    }

    updateCard(card){
        return axios.post(EDIT_CARD_API, card,{ headers: authHeader() });
    }

    updateStatus(id){
        return axios.post(UPDATE_STATUS_API + id,{ headers: authHeader() });
    }

    getTasks(card_id){
        return axios.get(GET_TASK_API + card_id,{ headers: authHeader() });
    }
   
    deleteCard(card_id){
        return axios.delete(DELETE_CARD_API + card_id,{ headers: authHeader() })
    }

}
export default new CardService();