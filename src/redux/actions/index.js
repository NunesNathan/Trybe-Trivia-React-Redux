import fetchAPI from '../../services/tokenAPI';

// action types

export const ADD_USER = 'ADD_USER';
export const MAKE_SCORE = 'MAKE_SCORE';
export const PLAY_AGAIN = 'PLAY_AGAIN';
export const GET_TOKEN = 'GET_TOKEN';

// action creators

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const makeScore = (payload) => ({
  type: MAKE_SCORE,
  payload,
});

export const playAgain = () => ({
  type: PLAY_AGAIN,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export function fetchAPIToken() {
  return (dispatch) => fetchAPI()
    .then((result) => dispatch(getToken(result.token)));
}
