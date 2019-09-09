import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://54.224.8.158:1313",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    report(data) {
        return apiClient.post("/reports/", data);
    },
    getReports(email) {
        return apiClient.get("/reports/email?email="+email);
    },
    existUser(user) {
        return apiClient.post("/users/login", user);
    },
    deleteReport(data) {
        return apiClient.delete(`/reports/?object=${data.object}&userId=${data.userId}`)
    }
};