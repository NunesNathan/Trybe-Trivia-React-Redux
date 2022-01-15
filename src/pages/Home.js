import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import Login from '../components/Login';

export default function Home({ history }) {
  console.log(history);
  return (
    <main className="App-header">
      <Logo />
      <Login history={ history } />
    </main>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
