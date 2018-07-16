import React, { Component } from 'react';
import Endpoints from './components/Endpoints/Endpoints.js';
import Button from '@material-ui/core/Button';
import './App.css';
import Card from '@material-ui/core/Card';

class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SubDog API - Documentation</h1>
        </header>

         <Endpoints/>

      </div>
    );
  }
}

export default App;
