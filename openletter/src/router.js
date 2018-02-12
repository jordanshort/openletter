import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Home from './components/home/Home';



export default (
    <Switch>
        <Route path='/home' component={Home} />
        <Route path='/' component={Login} />
    </Switch>
)