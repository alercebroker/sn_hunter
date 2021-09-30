import axios from 'axios'

// more of a reportApiv2, with functionalities only for users 
// meant to be fused with a reportApiv2 that refactors reportApi.js
// to be able to use new reporter api with a DB unified with watchlist

var params = {
  baseURL: process.env.VUE_APP_USER_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}


const apiClient = axios.create(params);


apiClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('access_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)



export default {
  register(data) {
    return apiClient.post("/users/", data);
  },
  login(data) {
    return apiClient.post("/users/login/", data);
  },
  current() {
    return apiClient.get("/users/current");
  },


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

  report(data) {
    return apiClient.post("/reports/", data);
  },
  getReports() {
    return apiClient.get("/reports/", {
      params: {
        owned: true,
        page: 1,
        page_size: 1000,
      }
    });
  },
  deleteReport(id) {
    return apiClient.delete("/reports/{}/".replace("{}", id));
  },
  getInfo() {
    return apiClient.get("user/get_info")
  }

};
