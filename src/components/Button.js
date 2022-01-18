import React from 'react';
import PropType from 'prop-types';

class Button extends React.Component {
  render() {
    const { text, test, style, onClick, disabled } = this.props;
    return (
      <button
        data-testid={ `btn-${test}` }
        style={ style }
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
  style: PropType.shape({
    border: PropType.string,
  }),
  disabled: PropType.bool.isRequired,
  onClick: PropType.func.isRequired,
};

Button.defaultProps = {
  style: { border: '' },
};

export default Button;
