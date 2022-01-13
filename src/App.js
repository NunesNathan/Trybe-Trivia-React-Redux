import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
      >
        <Home />
      </Route>
    </Switch>
  );
}
