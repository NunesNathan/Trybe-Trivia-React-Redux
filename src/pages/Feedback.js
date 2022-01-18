import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />
      </>
    );
  }
}
