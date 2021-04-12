import React, { Component } from 'react';
import './App.css';
import './FetchUser';
import FetchUser from './FetchUser';
class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>List of users</h1>
          <FetchUser />
      </div>
    );
  }
}

export default App;