import React, { Component } from 'react';
import StartSection from './sections/start/StartSection';
import Header from './header/Header';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <StartSection />
        <div className="slideshow">
        <iframe classname="frame" src="https://docs.google.com/presentation/d/e/2PACX-1vR9u-7HFuIYJ4SWLyebxMO50X5YNKZ1bqkBjMUGcaWC66vdDrvcuOQ18RC-lcJx5VfS4ICBxfB-OXrv/embed?start=true&loop=true&delayms=4000" frameborder="0" width="1440" height="839" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
      </div>
    );
  }
}

export default App;
