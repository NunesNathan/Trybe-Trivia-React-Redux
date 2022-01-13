import { GET_TOKEN } from '../actions';

const initialState = {
  token: '',
};

const token = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return { token: payload };

  default:
    return state;
  }
};

export default token;
