import axios from 'axios'

// more of a reportApiv2, with functionalities only for users 
// meant to be fused with a reportApiv2 that refactors reportApi.js
// to be able to use new reporter api with a DB unified with watchlist

var params = {
    baseURL: process.env.VUE_APP_USER_API,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
}


const apiClient = axios.create(params);


apiClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('vue-authenticate.vueauth_token')

    if (token) {
      config.headers['Authorization'] = `Token ${ token }`
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
};
