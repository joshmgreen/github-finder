import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/users/Users';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <Users />
      </div>
    );
  }
}

export default App;
