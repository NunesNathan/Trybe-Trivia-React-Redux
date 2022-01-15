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
        component={ Home }
      />
      <Route
        path="/settings"
        component={ Settings }
      />
      <Route
        path="/game"
        component={ Game }
      />
    </Switch>
  );
}
