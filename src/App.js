import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Game from './pages/Game';
import './App.css';

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
        path="/settings"
      >
        <Settings />
      </Route>
      <Route
        path="/game"
      >
        <Game />
      </Route>
    </Switch>
  );
}
