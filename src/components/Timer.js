import React, { Component } from 'react';
import { timerSeconds } from '../services/events';

export default class Timer extends Component {
  componentDidMount() {
    timerSeconds();
  }

  render() {
    return (
      <div>
        <h1
          id="count-down-timer"
        >
          { 30 }
        </h1>
      </div>
    );
  }
}
