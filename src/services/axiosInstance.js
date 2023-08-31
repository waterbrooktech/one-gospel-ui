import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  // When we're ready to add authotization
  // headers: { Authorization: token }
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    function (response) {
      return response.data ? response.data : response;
    }
  )
});
