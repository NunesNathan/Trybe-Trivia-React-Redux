import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
      >
        <Home />
      </Route>
      <Route
        path="/game"
      >
        <Game />
      </Route>
    </Switch>
  );
}
