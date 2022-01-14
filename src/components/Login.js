import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { addUser, fetchAPIToken } from '../redux/actions';
import Button from './Button';
import Input from './Input';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
  }

  verifyEntries = () => {
    const { email, name } = this.state;
    const minLength = 3;
    /* regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address
    -in-javascript porém com alteração */
    if (email.match(/^[^\s@!#$%"'&*()]+@[^\s@!#$%"'&*()]+\.[^\s@!#$%"'&*()]+$/)
      && name.length >= minLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  changeValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.verifyEntries());
  }

  submitLogin = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(addUser({ email, name }));
    dispatch(await fetchAPIToken());
    history.push('/game');
  }

  render() {
    const { email, name, disabled } = this.state;
    return (
      <div>
        <Input
          id="email"
          test="input-gravatar-email"
          label="Email do Gravatar"
          value={ email }
          type="email"
          changeValue={ this.changeValue }
        />
        <Input
          id="name"
          test="input-player-name"
          label="Nome do Jogador"
          value={ name }
          type="text"
          changeValue={ this.changeValue }
        />
        <Button
          text="Play"
          test="play"
          disabled={ disabled }
          onClick={ this.submitLogin }
        />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropType.func.isRequired,
  history: PropType.shape({
    push: PropType.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
