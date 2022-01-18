import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

const PARAM_SCORE = 3;

class FeedbackMessage extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        {score > PARAM_SCORE
          ? <h1 data-testid="feedback-text">Could be better...</h1>
          : <h1 data-testid="feedback-text">Well Done!</h1>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

FeedbackMessage.propTypes = {
  score: PropType.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
