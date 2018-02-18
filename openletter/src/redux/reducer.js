import axios from 'axios';

const initialState = {
    user: {},
    following: [{id: 50, first_name: 'Bill', last_name: 'Nye', picture: 'http://robohash.org/bill'}, {id: 51, first_name: 'Donovan', last_name: 'Mitchell', picture: 'http://robohash.org/donovan'}],
    followers: [{id: 53, first_name: 'Tiger', last_name: 'Woods', picture: 'http://robohash.org/eldrick'}, {id: 20, first_name: 'Jordan', last_name: 'Spieth', picture: 'http://robohash.org/jordan'}, {id: 22, first_name: 'Rudy', last_name: 'Gobert', picture: 'http://robohash.org/Rudy'}],
    myLetters: [],
    topTen: [],
    recommended: [],
    followingLetters: [],
    selectedLetter: {content: '<p>Letter</p>'},
    authorLetters: [],
    author: {first_name: 'first_name', last_name: 'last_name'},
    notifications: [],
}

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const POST_LETTER = 'POST_LETTER';
const FETCH_MY_LETTERS = 'FETCH_MY_LETTERS';
const FETCH_THIS_LETTER = 'FETCH_THIS_LETTER';
const FETCH_AUTHOR_LETTERS = 'FETCH_AUTHOR_LETTERS';
const FETCH_AUTHOR = 'FETCH_AUTHOR';
const FETCH_USER = 'FETCH_USER';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const EDIT_LETTER = 'EDIT_LETTER';
const GET_FOLLOWERS = 'GET_FOLLOWERS';
const GET_FOLLOWING = 'GET_FOLLOWING';
const DELETE_LETTER = 'DELETE_LETTER';
const ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS';
const GET_RECOMMENDED = 'GET_RECOMMENDED';


//reducer
export default function reducer(state = initialState, action){
    let { payload } = action;
    switch(action.type){
        case AUTHENTICATE_USER + '_FULFILLED':
            return Object.assign({}, state, {user: payload});
        case FETCH_MY_LETTERS + '_FULFILLED':
            return Object.assign({}, state, {myLetters: payload});
        case FETCH_THIS_LETTER + '_FULFILLED':
            return Object.assign({}, state, {selectedLetter: payload});
        case FETCH_AUTHOR_LETTERS + '_FULFILLED':
            return Object.assign({}, state, {authorLetters: payload});
        case FETCH_AUTHOR + '_FULFILLED':
            return Object.assign({}, state, {author: payload});
        case FETCH_USER + '_FULFILLED':
            return Object.assign({}, state, {user: payload});
        case UPDATE_PROFILE + '_FULFILLED':
            return Object.assign({}, state, {user: payload});
        case EDIT_LETTER + '_FULFILLED':
            return Object.assign({}, state, {selectedLetter: payload});
        case GET_FOLLOWING + '_FULFILLED':
            return Object.assign({}, state, {following: payload});
        case GET_FOLLOWERS + '_FULFILLED':
            return Object.assign({}, state, {followers: payload});
        case DELETE_LETTER + '_FULFILLED':
            return Object.assign({}, state, {myLetters: payload});
        case GET_RECOMMENDED + '_FULFILLED':
            return Object.assign({}, state, {recommended: payload});
        default: 
            return state;
    };
};

//action creators
export function authenticated(history){
    let promise = axios.get('/auth/authenticated').then( resp => {
        getFollowing();
        getFollowers();
        return resp.data;
    }).catch(err => history.push('/'));

    return{
        type: AUTHENTICATE_USER,
        payload: promise
    };
};

export function postLetter(letter, history){
    let promise = axios.post('/letters/new', letter).then( resp => {
        history.push('/myletters');        
        return resp.data;
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

export function fetchAuthorLetters(id){
    let promise = axios.get(`/authletters/${id}`).then(resp => {
        return resp.data;
    });
    return{
        type: FETCH_AUTHOR_LETTERS,
        payload: promise
    };
};

export function fetchAuthor(id){
    let promise = axios.get(`/user/${id}`).then(resp => {
        return resp.data;
    });
    return{
        type: FETCH_AUTHOR,
        payload: promise
    };
};

export function fetchUser(){
    let promise = axios.get('/user').then(resp => resp.data);
    return{
        type: FETCH_USER,
        payload: promise
    };
};

export function updateProfile(update){
    let promise = axios.put('/user', update).then(resp => resp.data);
    return{
        type: UPDATE_PROFILE,
        payload: promise
    };
};

export function editLetter(id, update, history){
    let promise = axios.put(`/letters/${id}`, update).then( resp => {
        history.push(`/letter/${id}`);        
        return resp.data;
    });
    return{
        type: EDIT_LETTER,
        payload: promise
    };
};

export function getFollowing(){
    let promise = axios.get('/following').then(resp => resp.data);
    return{
        type: GET_FOLLOWING,
        payload: promise
    };
};

export function getFollowers(){
    let promise = axios.get('/followers').then(resp => resp.data);
    return{
        type: GET_FOLLOWERS,
        payload: promise
    };
};

export function handleDelete(id, history){
    let promise = axios.delete(`/letters/${id}`).then(resp => {
    history.push('/myletters');
    return resp.data;
    });
    return{
        type: DELETE_LETTER,
        payload: promise
    };    
};

export function handleCosign(body, socket){
    socket.emit('cosign', body);
    return{
        type: ADD_NOTIFICATIONS,
        payload: body
    };
};

export function getRecommended(){
    let promise = axios.get('/recommended').then(resp => resp.data);
    return{
        type: GET_RECOMMENDED,
        payload: promise
    };
};

export function followAuthor(authId){
    let promise = axios.post('/following/new', {id: authId}).then(resp => resp.data);
    return{
        type: GET_FOLLOWING,
        payload: promise
    };
};