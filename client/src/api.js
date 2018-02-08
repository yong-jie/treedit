const makeRequest = (url, options) => {
  const { method, data } = options;
  const fetchParams = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    fetchParams.body = JSON.stringify(data);
  }

  return fetch(url, fetchParams)
    .then(res => res.json())
    .then(body => ({ body }))
    .catch(err => err);
};

export const fetchTopics = (page) => {
  const url = `/api/topic/list/${page}`;
  const options = {
    method: 'GET',
  };
  return makeRequest(url, options);
};

export const createTopic = () => {
  const url = '/api/topic/create';
  const data = {};
  const options = {
    method: 'POST',
    data,
  };
  return makeRequest(url, options);
};
