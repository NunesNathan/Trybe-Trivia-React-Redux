import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../services/tokenAPI';
import { decodeCharacter, shuffleOptions } from '../services/events';
import { fetchAPIToken, makeScore } from '../redux/actions';
import calculatePoints from '../helpers/score';
import setLocalStorage from '../services/localStorage';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionIndex: 0,
      actualQuestion: {},
      haveOptions: false,
      correctStyle: '',
      incorrectStyle: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
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

  answerClicked = (boll) => {
    const { dispatch, score } = this.props;

    this.setState({
      correctStyle: '3px solid rgb(6, 240, 15)',
      incorrectStyle: '3px solid rgb(255, 0, 0)',
    });

    if (boll === true) {
      const { actualQuestion: { difficulty } } = this.state;
      const time = 30;
      const points = calculatePoints(difficulty, time);
      const newScore = score + points;

      dispatch(makeScore(newScore));
      setLocalStorage('ranking', { score: newScore });
    }
  }

  renderOptions = ({ correct_answer: correct, incorrect_answers: incorrect }) => {
    const { correctStyle, incorrectStyle } = this.state;
    return (
      <div id="options" data-testid="answer-options">
        <button
          key={ decodeCharacter(correct) }
          type="button"
          style={ ({ border: correctStyle }) }
          data-testid="correct-answer"
          onClick={ () => this.answerClicked(true) }
        >
          {decodeCharacter(correct)}
        </button>
        {incorrect.map((each, i) => (
          <button
            key={ decodeCharacter(each) }
            type="button"
            data-testid={ `wrong-answer-${i}` }
            style={ ({ border: incorrectStyle }) }
            onClick={ () => this.answerClicked(false) }
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
        {!haveOptions
          ? (<p>Carregando</p>)
          : (
            <div>
              <p data-testid="question-category">{ actualQuestion.category }</p>
              <p
                data-testid="question-text"
              >
                {decodeCharacter(actualQuestion.question)}
              </p>
              { this.renderOptions(actualQuestion) }
            </div>)}
      </main>
    );
  }
}

GameScreen.propTypes = {
  token: PropType.string.isRequired,
  dispatch: PropType.func.isRequired,
  score: PropType.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(GameScreen);
