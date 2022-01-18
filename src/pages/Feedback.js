import React, { Component } from 'react';
import PropType from 'prop-types';
import Button from '../components/Button';
import FeedbackInfo from '../components/FeedbackInfo';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';

export default class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />
        <FeedbackInfo />
        <Button
          text="Play Again"
          test="btn-play-again"
          onClick={ this.playAgain }
          disabled={ false }
        />
        <Button
          text="Ranking"
          test="btn-ranking"
          onClick={ this.ranking }
          disabled={ false }
        />
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropType.func.isRequired,
};
