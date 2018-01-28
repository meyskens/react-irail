import React, { Component } from 'react';
import { Liveboard } from 'react-irail'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Liveboard station="Antwerpen-centraal" lang="nl" max={15}/>
      </div>
    );
  }
}

export default App;
