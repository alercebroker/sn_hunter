import axios from 'axios'

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
    report(data) {
        return apiClient.post("/reporter/reports/", data);
    },
    getReports() {
        return apiClient.get("/reporter/reports/by_owner/", {params:{
		paginated: 'false'
	}});
    },
    deleteReport(id) {
        return apiClient.delete("/reporter/reports/{}/".replace("{}",id));
    },
    getInfo(){
      return apiClient.get("user/get_info")
    }
};
