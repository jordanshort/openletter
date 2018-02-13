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

//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case AUTHENTICATE_USER:
            return Object.assign({}, state, {user: action.payload});
        case POST_LETTER:
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
    console.log(letter);
    let promise = axios.post('/letters/new', letter).then( resp => {
        return resp.data;
        history.push('/myletters');
    }).catch( err => history.push('/'));

    return{
        type: POST_LETTER,
        payload: ['newPost']
    };
};
