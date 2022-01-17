import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../services/tokenAPI';
import { decodeCharacter, shuffleOptions, timerSeconds } from '../services/events';
import { fetchAPIToken } from '../redux/actions';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionIndex: 0,
      actualQuestion: {},
      haveOptions: false,
      disabledButton: false,
      correctStyle: '',
      incorrectStyle: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
    timerSeconds(this.disabledButtons);
  }

  getQuestions = async () => {
    const { token, dispatch } = this.props;
    const questions = await fetchQuestions(token);
    if (questions.response_code === 0) {
      this.setState({
        questions: questions.results,
      }, () => this.renderQuestion());
    } else {
      dispatch(await fetchAPIToken());
      await this.getQuestions();
    }
  }

  renderQuestion = () => {
    const { questions, questionIndex } = this.state;
    this.setState({
      actualQuestion: questions[questionIndex],
      haveOptions: true,
    }, () => shuffleOptions());
  }

  disabledButtons = () => {
    this.setState({ disabledButton: true });
  }

  answerClicked = () => {
    this.setState({
      correctStyle: '3px solid rgb(6, 240, 15)',
      incorrectStyle: '3px solid rgb(255, 0, 0)',
    });
  }

  renderOptions = ({ correct_answer: correct, incorrect_answers: incorrect }) => {
    const { correctStyle, incorrectStyle, disabledButton } = this.state;
    return (
      <div id="options" data-testid="answer-options">
        <button
          key={ decodeCharacter(correct) }
          type="button"
          disabled={ disabledButton }
          style={ ({ border: correctStyle }) }
          data-testid="correct-answer"
          onClick={ () => this.answerClicked() }
        >
          {decodeCharacter(correct)}
        </button>
        {incorrect.map((each, i) => (
          <button
            key={ decodeCharacter(each) }
            type="button"
            disabled={ disabledButton }
            style={ ({ border: incorrectStyle }) }
            data-testid={ `wrong-answer-${i}` }
            onClick={ () => this.answerClicked() }
          >
            {decodeCharacter(each)}
          </button>
        ))}
      </div>);
  };

  render() {
    const { actualQuestion, haveOptions } = this.state;
    return (
      <main>
        { !haveOptions
          ? (<p>Carregando</p>)
          : (
            <div>
              <p data-testid="question-category">{ actualQuestion.category }</p>
              <p
                data-testid="question-text"
              >
                { decodeCharacter(actualQuestion.question) }
              </p>
              { this.renderOptions(actualQuestion) }
            </div>) }
      </main>
    );
  }
}

GameScreen.propTypes = {
  token: PropType.string.isRequired,
  dispatch: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(GameScreen);
