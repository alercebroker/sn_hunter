import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import userApi from "./services/userApi"
import router from "./router"
/* eslint-disable */
Vue.use(Vuex);

const qs = require("qs");

var avro_url = process.env.VUE_APP_STAMPS_API + "/get_avro_info";
var ztf_url = process.env.VUE_APP_PSQL_API;

Date.prototype.subsDays = function(days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
function dateToJD(date) {
  var mjulianDate = date / 86400000 + 40587;
  return mjulianDate;
}
function jdToDate(jd) {
  var date = (jd - 40587) * 86400000;
  return new Date(date);
}
function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad('0' + str, max) : str;
}

export default new Vuex.Store({
  state: {
    nCandidates: 0,
    sneCandidates: [],
    selectedSne: null,
    alertCandidate: null,
    deltaDays: null,
    zoomed: false,
    table: null,
    avro: null,
    aladin: null,
    report: false,
    reports: null,
    response: null,
    //Checking if user is stored on local storage
    access_token: localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null,
    user: {
      id: null,
      name: null,
      username: null,
      last_name: null,
      email: null,
      avatar: null,
    },
    alerceClassified: [],
    alerceCandidates: [],
    loadingTNS: true,
    detections: [],
  },
  mutations: {
    SET_TNS(state, payload) {
      state.alerceClassified = payload.classified;
      state.alerceCandidates = payload.candidates;
      state.loadingTNS = payload.loadingTNS;
    },
    CLEAN_AVRO(state) {
      state.avro = null;
    },
    SET_ALADIN(state) {
      var aladin = state.aladin
        ? state.aladin
        : A.aladin("#aladin-lite-div", {
          survey: "P/PanSTARRS/DR1/color-z-zg-g",
          fov: 0.02,
          cooFrame: "J2000d",
        });
      state.aladin = aladin;
    },
    SET_AVRO(state, payload) {
      state.avro = payload;
    },
    SET_CANDIDATES(state, payload) {
      var sneCandidates = {};
      $.each(payload, function(key, value) {
        sneCandidates[value["oid"]] = value;
      });
      state.sneCandidates = sneCandidates;
    },
    INCLUDE_REPORTS_IN_CANDIDATES(state, payload) {
      console.log(payload);
      console.log(state.sneCandidates);
      $.each(state.sneCandidates, function(key, value) {
        // console.log(value);
        var report = payload.find(function(report, index) {
          if(report.object == key)
            return true;
        });
        console.log(report)
      });
    },
    CLEAN_CANDIDATES(state) {
      state.sneCandidates = [];
    },
    SELECT_CANDIDATE(state, payload) {
      state.selectedSne = payload;
    },
    CHANGE_DELTA(state, payload) {
      state.deltaDays = payload;
    },
    SET_ZOOM(state, payload) {
      state.zoomed = payload;
    },
    SET_CANDIDATE_ALERT(state, payload) {
      state.alertCandidate = payload;
    },
    SET_TABLE(state, payload) {
      state.table = payload;
    },
    UPDATE_TABLE(state, payload) {
      state.table.clear();
      var candidates = [];
      $.each(payload, function(key, value) {
        var mjd = value["firstmjd"];
        var date = jdToDate(mjd);
        var dateStr =
          pad(date.getUTCDate(), 2) +
          "/" +
          pad(date.getUTCMonth() + 1, 2) +
          "/" +
          date.getUTCFullYear() +
          " " +
          pad(date.getUTCHours(), 2) +
          ":" +
          pad(date.getUTCMinutes(), 2) +
          ":" +
          pad(date.getUTCSeconds(), 2) +
          " UT";
        var prob = value["probability"].toFixed(3);
        var nobs = value["ndet"];
        var oid = value["oid"];
        var obj = {
          oid: oid,
          discovery_date: dateStr,
          prob: prob,
          nobs: nobs,
        };
        candidates.push(obj);
      });
      state.table.rows.add(candidates).draw(false);
    },
    SET_SHOW_REPORT(state, value) {
      state.report = value;
    },
    SET_RESPONSE_REPORT(state, value) {
      state.response = value.data;
    },
    SET_REPORTS(state, value) {
      state.reports = value;
    },
    SET_NCANDIDATES(state, value) {
      state.nCandidates = value;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_NULL_USER(state) {
      (state.user.id = null),
        (state.user.name = null),
        (state.user.username = null),
        (state.user.email = null),
        (state.user.avatar = null),
        (state.access_token = null);
    },
    SET_ACCESS_TOKEN(state, token) {
      state.access_token = token;
    },
    SET_DETECTIONS(state, detections) {
      state.detections = detections;
    },
  },
  actions: {
    getAlerceTNS(context) {
      // axios.get(ztf_url+"/get_alerce_tns").then(function(response){
      //   var candidates = response.data.results.candidates;
      //   var classified = response.data.results.classified;
      //
      //   context.commit("SET_TNS",{"candidates":candidates,"classified":classified,"loadingTNS":false})
      // }).catch(function(){
      //   context.commit("SET_TNS",{"candidates":[],"classified":[],"loadingTNS":false})
      // });
    },
    setAladin(context) {
      context.commit("SET_ALADIN");
    },
    retrieveAVRO(context, data) {
      var url = avro_url;
      var data;
      axios
        .get(url, {
          params: {
            oid: data["oid"],
            candid: data["candid"],
          },
        })
        .then(function(response) {
          context.commit("SET_AVRO", response.data);
        });
    },
    retrieveAlert(context, oid) {
      axios.get(ztf_url + "/objects/" + oid + "/detections").then(
        function(response) {
          var alerts = response.data;
          context.commit("SET_DETECTIONS", alerts);
          if (alerts.length > 1) {
            var firstmjd = 1 / 0;
            var first_alert = 0;
            $.each(
              alerts,
              function(id, value) {
                if (firstmjd > value["mjd"] && value["has_stamp"]) {
                  firstmjd = value["mjd"];
                  first_alert = id;
                }
              },
              function(error) {
                console.error(error);
              }
            );
            var selected = alerts[first_alert];
          } else {
            var selected = alerts[0];
          }
          selected.oid = oid;
          context.commit("CLEAN_AVRO");
          context.dispatch("retrieveAVRO", {
            oid: oid,
            candid: selected["candid"],
          });
          context.commit("SET_CANDIDATE_ALERT", selected);
        }
      );
    },
    async retrieveCandidates(context, params) {
      let delta = params.delta;
      let nCandidates = params.nCandidates;
      context.commit('SET_NCANDIDATES', nCandidates);
      //Calculate stuff
      var date = new Date();
      var now_mjd = dateToJD(date);
      var last_mjd = now_mjd - delta;

      var parameters = {
        classifier: "stamp_classifier",
        class: "SN",
        ranking: 1,
        firstmjd: [last_mjd, now_mjd],
        page: 1,
        page_size: nCandidates,
        count: false,
        order_by: "probability",
        order_mode: "DESC",
      };
      await axios
        .get(ztf_url + "/objects", {
          params: parameters,
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        })
        .then(function(response) {
          context.commit("SET_CANDIDATES", response.data.items);
          context.commit("CHANGE_DELTA", delta);
          context.commit("SET_ZOOM", false);
          context.commit("UPDATE_TABLE", response.data.items);
        })
        .catch(function(error) {
          console.error(error);
        });

      await userApi
        .getRecentReports(date)
        .then((response) => {
          context.commit("INCLUDE_REPORTS_IN_CANDIDATES", response.data.results);
        })
        .catch((reason) => {
          context.commit("SET_RESPONSE_REPORT", reason);
        });
    },
    async retrieveReports(context, params) {
      //context.commit("INCLUDE_REPORTS_IN_CANDIDATES");
      let delta = params.delta;
      //Calculate stuff
      var date = new Date();
      date.setDate(date.getDate() - delta);
      await userApi
        .getRecentReports(date)
        .then((response) => {
          context.commit("INCLUDE_REPORTS_IN_CANDIDATES", response.data.results);
        })
        .catch((reason) => {
          context.commit("SET_RESPONSE_REPORT", reason);
        });

      // var parameters = {
      //   classifier: "stamp_classifier",
      //   class: "SN",
      //   ranking: 1,
      //   firstmjd: [last_mjd, now_mjd],
      //   page: 1,
      //   page_size: nCandidates,
      //   count: false,
      //   order_by: "probability",
      //   order_mode: "DESC",
      // };
      // axios
      //   .get(ztf_url + "/objects", {
      //     params: parameters,
      //     paramsSerializer: function(params) {
      //       return qs.stringify(params, { arrayFormat: "repeat" });
      //     },
      //   })
      //   .then(function(response) {
      //     context.commit("SET_CANDIDATES", response.data.items);
      //     context.commit("INCLUDE_REPORTS_IN_CANDIDATES");
      //     context.commit("CHANGE_DELTA", delta);
      //     context.commit("SET_ZOOM", false);
      //     context.commit("UPDATE_TABLE", response.data.items);
      //   })
      //   .catch(function(error) {
      //     console.error(error);
      //   });
    },
    cleanCandidates(context) {
      context.commit("CLEAN_CANDIDATES");
    },
    setSelectedCandidate(context, selected) {
      context.commit("SELECT_CANDIDATE", selected);
    },
    setZoomed(context) {
      context.commit("SET_ZOOM", true);
    },
    createTable(context, id) {
      $.fn.dataTable.moment("DD/MM/YYYY HH:mm:SS UT");
      var table = $("#sneCandidates").DataTable({
        order: [
          [2, "desc"],
          [3, "desc"],
          [1, "desc"],
        ],
        responsive: true,
        searching: true,
        info: false,
        lengthChange: false,
        processing: true,
        language: {
          loadingRecords: "&nbsp;",
          processing: "Loading...",
        },
        columns: [
          { data: "oid" },
          { data: "discovery_date" },
          { data: "prob" },
          { data: "nobs" },
          { data: "report_status" },
        ],
      });
      context.commit("SET_TABLE", table);
    },
    displayReport(context, show) {
      context.commit("SET_SHOW_REPORT", show);
    },
    doReport(context, data) {
      userApi
        .report(data)
        .then((response) => {
          context.commit("SET_RESPONSE_REPORT", response);
          context.dispatch("getReports", context.getters["getSelected"].oid);
        })
        .catch((reason) => {
          context.commit("SET_RESPONSE_REPORT", reason);
        });
    },
    getReports(context, oid) {
      userApi
        .getReports(oid)
        .then((response) => {
          context.commit("SET_REPORTS", response.data.results);
        })
        .catch((reason) => {
          context.commit("SET_RESPONSE_REPORT", reason);
        });
    },
    deleteReport(context, data) {
      userApi
        .deleteReport(data)
        .then((response) => {
          context.commit("SET_RESPONSE_REPORT", response);
          context.dispatch("getReports", context.getters["getSelected"].oid);
        })
        .catch((reason) => {
          context.commit("SET_RESPONSE_REPORT", reason);
        });
    },
    loginNormalUser(context, data) {
      userApi.login(data).then((response) => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        context.dispatch('getCurrentUser');
      });
    },
    getCurrentUser({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        userApi
          .current()
          .then((response) => {
            commit('SET_USER', {
              name: response.data.name,
              username: response.data.username,
              last_name: response.data.last_name,
              email: response.data.email,
              avatar: '#',
              id: response.data.id,
            });
            resolve(response.data.id);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    },
    logoutUser(context) {
      context.commit('SET_NULL_USER');
      localStorage.clear();
      router.go()
    },
    loginGoogleUser({ dispatch }, data) {
      userApi.googleLogin(data).then((response) => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        dispatch('getCurrentUser');
      });
    },
    getGoogleUrl(context, loginWindow) {
      userApi.getGoogleUrl().then((response) => {
        loginWindow.location.href = response.data.authorization_url;
      });
    },
  },
  getters: {
    getCandidates(state) {
      return state.sneCandidates;
    },
    getSelected(state) {
      return state.selectedSne ? state.sneCandidates[state.selectedSne] : null;
    },
    getDeltaDays(state) {
      return state.deltaDays;
    },
    getZoomed(state) {
      return state.zoomed;
    },
    getAlert(state) {
      return state.alertCandidate;
    },
    getTable(state) {
      return state.table;
    },
    getAladin(state) {
      return state.aladin;
    },
    getDisplayReport(state) {
      return state.report;
    },
    getReports(state) {
      return state.reports == null ? [] : state.reports;
    },
    getUser(state) {
      return state.user;
    },
    getAvro(state) {
      return state.avro;
    },
    getTNS(state) {
      return {
        classified: state.alerceClassified,
        candidates: state.alerceCandidates,
        loading: state.loadingTNS,
      };
    },
    getDetections(state) {
      return state.detections;
    },
  },
});
/* eslint-enable */
