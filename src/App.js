import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
      </div>
    );
  }
}

export default App;
