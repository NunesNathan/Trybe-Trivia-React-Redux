import React, { Component } from 'react';
import Logo from '../components/Logo';
import Login from '../components/Login';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <main className="App-header">
        <Logo />
        <Login />
      </main>
    );
  }
}
