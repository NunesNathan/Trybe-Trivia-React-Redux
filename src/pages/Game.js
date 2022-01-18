import React, { Component } from 'react';
import GameScreen from '../components/GameScreen';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <GameScreen />
        <Timer />
      </>
    );
  }
}

export default Game;
