import axios from 'axios';

const initialState = {
    user: null,
    following: [],
    followers: [],
    myLetters: [],
    topTen: [],
    recommended: [],
    followingLetters: [],
    selectedLetter: {content: '<p>Letter</p>'}
}

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const POST_LETTER = 'POST_LETTER';
const FETCH_MY_LETTERS = 'FETCH_MY_LETTERS';
const FETCH_THIS_LETTER = 'FETCH_THIS_LETTER';


//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case AUTHENTICATE_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload});
        case FETCH_MY_LETTERS + '_FULFILLED':
            return Object.assign({}, state, {myLetters: action.payload});
        case FETCH_THIS_LETTER + '_FULFILLED':
            return Object.assign({}, state, {selectedLetter: action.payload})
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
        return letters.data;
    });
    return{
        type: FETCH_MY_LETTERS,
        payload: promise
    };
};

export function fetchThisLetter(id){
    let promise = axios.get(`/letters/${id}`).then(resp => {
        return resp.data;
    })

    return{
        type: FETCH_THIS_LETTER,
        payload: promise
    };
};