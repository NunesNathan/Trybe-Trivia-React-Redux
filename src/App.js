import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';

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
    </Switch>
  );
}
