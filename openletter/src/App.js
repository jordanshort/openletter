import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import router from './router';

class App extends Component {
  render() {
    return (
      <div className="App">
       {router}
      </div>
    );
  }
}

export default App;
