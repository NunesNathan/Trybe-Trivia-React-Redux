import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import getGravatarUrl from '../helpers/gravatar';

export class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header>
        <img
          src={ getGravatarUrl(email) }
          alt={ name }
          data-testid="header-profile-picture"
        />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropType.string.isRequired,
  name: PropType.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
