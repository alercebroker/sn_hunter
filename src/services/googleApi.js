import axios from 'axios';

// handle interaction with users logged in via google

var params = {
  baseURL: process.env.VUE_APP_USER_API,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const apiClient = axios.create(params);

export default {
  getGoogleUrl() {
    return apiClient.get(
      '/users/social/o/google-oauth2/?redirect_uri=' +
        process.env.VUE_APP_REDIRECT
    );
  },
  googleLogin(params) {
    const data = new URLSearchParams({
      "code": params.code,
      "state": params.state
    });
    return apiClient.post('/users/social/o/google-oauth2/', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
};
