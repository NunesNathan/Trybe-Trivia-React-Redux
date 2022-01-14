const endPoint = 'https://opentdb.com/api_token.php?command=request';

function fetchAPI() {
  return fetch(endPoint)
    .then((response) => response.json());
}

export default fetchAPI;
