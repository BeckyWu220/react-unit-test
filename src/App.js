import React, { Component } from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getLetterMatchCount } from './helpers';

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
          letterMatchCount: getLetterMatchCount('train', 'party')
        }]} />
      </div>
    );
  }
  
}

export default App;
