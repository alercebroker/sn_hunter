import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://localhost:1313",
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
    existUser(email) {
        return apiClient.get("/users/exist?email="+email);
    },
    deleteReport(data) {
        return apiClient.delete(`/reports/?object=${data.object}&userId=${data.userId}`)
    }
};