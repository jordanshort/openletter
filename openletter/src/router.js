import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Home from './components/home/Home';
import NewPost from './components/newPost/NewPost';
import Profile from './components/profile/Profile';
import MyLetters from './components/myLetters/MyLetters';



export default (
    <Switch>
        <Route path='/home' component={Home} />
        <Route path='/newpost' component={NewPost} />
        <Route path='/profile' component={Profile} />
        <Route path='/myletters' component={MyLetters} />
        <Route path='/' component={Login} />
    </Switch>
)