import axios from 'axios';

const initialState = {
    user: null,
    following: [],
    followers: [],
    myLetters: [],
    topTen: [],
    recommended: [],
    followingLetters: []
}

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const POST_LETTER = 'POST_LETTER';
const FETCH_MY_LETTERS = 'FETCH_MY_LETTERS';


//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case AUTHENTICATE_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload});
        case POST_LETTER + '_FULFILLED':
            return Object.assign({}, state, {myLetters: action.payload});
        case FETCH_MY_LETTERS + '_FULFILLED':
            return Object.assign({}, state, {myLetters: action.payload});
        default: 
            return state;
    };
};

//action creators
export function authenticated(history){
    let promise = axios.get('/auth/authenticated').then( resp => {
            return resp.data
    }).catch(err => history.push('/'));

    return{
        type: AUTHENTICATE_USER,
        payload: promise
    };
};

export function postLetter(letter, history){
    let promise = axios.post('/letters/new', letter).then( resp => {
        return resp.data;
        history.push('/myletters');
    }).catch( err => history.push('/'));

    return{
        type: POST_LETTER,
        payload: ['newPost']
    };
};

export function fetchMyLetters(){
    let promise = axios.get('/letters/mine').then( letters => {
        return letters
    });
    return{
        type: FETCH_MY_LETTERS,
        payload: promise
    };
};
