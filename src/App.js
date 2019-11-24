import React, { Component } from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div data-test="component-app" className="container">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessedWords guessedWords={[{
          guessedWord: 'train',
          letterMatchCount: 3
        }]} />
      </div>
    );
  }
  
}

export default App;
