import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../services/tokenAPI';
import {
  decodeCharacter,
  overrideTime, shuffleOptions,
  timerSeconds } from '../services/events';
import { fetchAPIToken, makeScore } from '../redux/actions';
import calculatePoints from '../helpers/score';
import { getLocalStorage, setNewRanking } from '../services/localStorage';
import getGravatarUrl from '../services/gravatar';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionIndex: 0,
      actualQuestion: {},
      haveOptions: false,
      haveAnswer: false,
      disabledButton: false,
      correctStyle: '',
      incorrectStyle: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentWillUnmount() {
    const { id } = this.state;
    clearInterval(id);
  }

  getQuestions = async () => {
    const { token, dispatch, history } = this.props;
    const questions = await fetchQuestions(token);
    if (questions.response_code === 0) {
      this.setState({
        questions: questions.results,
        id: timerSeconds(this.disabledButtons),
      }, () => this.renderQuestion());
    } else {
      dispatch(await fetchAPIToken());
      await this.getQuestions(history);
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
    const { id } = this.state;
    const { dispatch, score } = this.props;
    clearInterval(id);
    this.setState({
      haveAnswer: true,
      correctStyle: '3px solid rgb(6, 240, 15)',
      incorrectStyle: '3px solid rgb(255, 0, 0)',
    });

    if (boll === true) {
      const { actualQuestion: { difficulty } } = this.state;
      const time = 30;
      const points = calculatePoints(difficulty, time);
      const newScore = score + points;

      dispatch(makeScore(newScore));
    }
  }

  disabledButtons = () => {
    const { id } = this.state;
    this.setState({
      disabledButton: true,
      haveAnswer: true,
      correctStyle: '3px solid rgb(6, 240, 15)',
      incorrectStyle: '3px solid rgb(255, 0, 0)',
    });
    clearInterval(id);
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
          onClick={ () => this.answerClicked(true) }
        >
          { decodeCharacter(correct) }
        </button>
        { incorrect.map((each, i) => (
          <button
            key={ decodeCharacter(each) }
            type="button"
            disabled={ disabledButton }
            style={ ({ border: incorrectStyle }) }
            data-testid={ `wrong-answer-${i}` }
            onClick={ () => this.answerClicked(false) }
          >
            { decodeCharacter(each) }
          </button>
        )) }
      </div>);
  };

  nextQuestion = () => {
    const { questionIndex, questions, id } = this.state;
    const { history, score, name } = this.props;
    clearInterval(id);
    if (questionIndex < (questions.length - 1)) {
      overrideTime();
      this.setState({
        id: timerSeconds(this.disabledButtons),
        questionIndex: questionIndex + 1,
        haveAnswer: false,
        correctStyle: '',
        incorrectStyle: '',
        disabledButton: false,
      }, () => this.renderQuestion());
    } else {
      const record = { name, score, picture: getGravatarUrl(getLocalStorage('token')) };
      setNewRanking(record);
      history.push('/feedback');
    }
  }

  render() {
    const { actualQuestion, haveOptions, haveAnswer } = this.state;
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
            </div>)}
        {haveAnswer
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
      </main>
    );
  }
}

GameScreen.propTypes = {
  token: PropType.string.isRequired,
  name: PropType.string.isRequired,
  dispatch: PropType.func.isRequired,
  history: PropType.func.isRequired,
  score: PropType.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(GameScreen);
