import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Home from './components/home/Home';
import NewPost from './components/newPost/NewPost';
import Profile from './components/profile/Profile';
import MyLetters from './components/myLetters/MyLetters';
import Letter from './components/letter/Letter';
import AuthorProfile from './components/authorProfile/AuthorProfile';
import EditLetter from './components/editLetter/EditLetter';
import Network from './components/network/Network';
import Response from './components/response/Response';
import SearchResults from './components/searchResults/SearchResults';
import Saved from './components/saved/Saved';
import MyLetter from './components/myLetter/MyLetter';



export default (
    <Switch>
        <Route path='/home' component={Home} />
        <Route path='/newpost' component={NewPost} />
        <Route path='/profile/:id' component={AuthorProfile} />
        <Route path='/profile' component={Profile} />
        <Route path='/myletters' component={MyLetters} />
        <Route path='/letter/:id' component={Letter} />
        <Route path='/editletter/:id' component={EditLetter} />
        <Route path='/network/:id' component={Network} />
        <Route path='/response/:authorid/:letterid' component={Response} />
        <Route path ='/searchresults' component={SearchResults} />
        <Route path = '/saved' component={Saved} />
        <Route path = '/myletter/:id' component={MyLetter} />
        <Route path='/' component={Login} />
    </Switch>
)