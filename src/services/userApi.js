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

function refreshToken() {
  apiClient
    .post("/users/refresh/", {
      refresh: localStorage.getItem("refresh_token")
    })
    .then(response => {
      localStorage.setItem("access_token", response.data.access)
    })
}

function retryOrReturnError(error) {
  if (error.response.status === 401) {
    const verb = error.config.method;
    if (verb === "get")
      return apiClient.get(
        error.config.url ? error.config.url : "",
        error.config
      );
    if (verb === "post") {
      if (error.config.url === "/users/login/") {
        return Promise.reject(error)
      }
      return apiClient.post(
        error.config.url ? error.config.url : "",
        error.config.data, error.config
      );
    }
    if (verb === "delete") {
      return apiClient.delete(error.config.url)
    }
  }
}

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

apiClient.interceptors.response.use(response => { return response }, error => {
  if (error.response) {
    if (error.response.status === 401) {
      if (error.response.config.url === "/users/refresh/" ||
        error.response.config.url === "/users/login") {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        return Promise.reject(error)
      }
      refreshToken()
      return retryOrReturnError(error)
    }
  }
  return Promise.reject(error)
})


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
  getReports(object, date = null) {
    let params = {
      owned: true,
      page: 1,
      page_size: 1000,
      object: object
    }
    if (date) {
      const strDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      params.date_after = strDate
    }
    return apiClient.get("/reports/", { params });
  },
  deleteReport(id) {
    return apiClient.delete("/reports/{}/".replace("{}", id));
  },
  getInfo() {
    return apiClient.get("user/get_info")
  }

};
