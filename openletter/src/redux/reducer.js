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

export default function reducer(state = initialState, action){
    return state;
};

export function authenticated(history){
    let promise = axios.get('/auth/authenticated').then( resp => {
        if (resp.data){
            return resp.data
        }
    }).catch(err => history.push('/'));

    return{
        type: AUTHENTICATE_USER,
        payload: promise
    };
};