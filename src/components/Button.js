import React from 'react';
import PropType from 'prop-types';

class Button extends React.Component {
  render() {
    const { text, test, onClick, disabled } = this.props;
    return (
      <button
        data-testid={ `btn-${test}` }
        type="button"
        disabled={ disabled }
        onClick={ onClick }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropType.string.isRequired,
  test: PropType.string.isRequired,
  disabled: PropType.bool.isRequired,
  onClick: PropType.func.isRequired,
};

export default Button;
