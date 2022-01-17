import React, { Component } from 'react';
import GameScreen from '../components/GameScreen';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <GameScreen />
      </>
    );
  }
}

export default Game;
