import React, { Component } from 'react';
import FeedbackInfo from '../components/FeedbackInfo';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />
        <FeedbackInfo />
      </>
    );
  }
}
