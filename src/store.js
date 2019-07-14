import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Date.prototype.subsDays = function(days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
function dateToJD(date) {
    var mjulianDate = date / 86400000 + 40588;
    return mjulianDate;
}
function jdToDate(jd){
  var date = (jd - 40588) * 86400000;
  return new Date(date)
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

export default new Vuex.Store({
  state: {
    sneCandidates: [],
    selectedSne: null,
    alertCandidate:null,
    deltaDays: null,
    zoomed: false,
    table: null
  },
  mutations: {
    SET_CANDIDATES(state,payload){
      state.sneCandidates = payload;
    },
    CLEAN_CANDIDATES(state){
      state.sneCandidates = [];
    },
    SELECT_CANDIDATE(state,payload){
      state.selectedSne = payload;
    },
    CHANGE_DELTA(state,payload){
      state.deltaDays = payload;
    },
    SET_ZOOM(state,payload){
      state.zoomed = payload;
    },
    SET_CANDIDATE_ALERT(state,payload){
      state.alertCandidate = payload;
    },
    SET_TABLE(state,payload){
      state.table = payload;
    },
    UPDATE_TABLE(state,payload){
      state.table.clear();
      var candidates = []
      $.each(payload,function(key,value){
        var mjd = value["firstmjd"];
        var date = jdToDate(mjd);
        var dateStr = pad((date.getDate()+1),2) + '/' + pad((date.getMonth() + 1),2) + '/' +  date.getFullYear() + ' ' + pad(date.getHours(),2) + ":" + pad(date.getMinutes(),2) + ":" + pad(date.getSeconds(),2)
        var prob = value["pclassearly"].toFixed(3);
        var obj ={
          oid: key,
          discovery_date: dateStr,
          prob: prob
        }
        candidates.push(obj)
      })
      state.table.rows.add(candidates).draw(false);
    }
  },
  actions: {
    retrieveAlert(context,oid){
      var parameters = {"oid":oid}
      axios.post("http://ztf.alerce.online/get_detections",parameters).then(function(response){
        var alerts = response.data.result.detections;
        if(alerts.length > 1){
          var firstmjd = 1/0;
          var first_alert;
          $.each(alerts, function(id,value){
            if(firstmjd > value["mjd"]){
              firstmjd = value["mjd"];
              first_alert = id;
            }
          });
          var selected = alerts[first_alert];
        }else{
          var selected = alerts[0];
        }
        context.commit("SET_CANDIDATE_ALERT",selected);
      },function(){
        console.log("Error")
      })
    },
    retrieveCandidates(context,delta){
      //Calculate stuff
      var date = new Date();
      var now_mjd = dateToJD(date);
      var last_mjd = dateToJD(date.subsDays(delta));

      var parameters = {
            "records_per_pages":100,
            "query_parameters":
            {
              "filters":
                      {"classearly": 2},
              "dates":
                      {"firstmjd":
                        {"min":last_mjd,"max":now_mjd}
                      }
              },
              "sortBy": "pclassearly",
              "total":100
      };
      axios.post("http://ztf.alerce.online/query",parameters).then(function(response){
        context.commit("SET_CANDIDATES", response.data.result);
        context.commit("CHANGE_DELTA",delta);
        context.commit("SET_ZOOM",false);
        context.commit("UPDATE_TABLE", response.data.result);
      }, function(){
        console.log("error");
      });
    },
    cleanCandidates(context){
      context.commit("CLEAN_CANDIDATES");
    },
    setSelectedCandidate(context,selected){
      context.commit("SELECT_CANDIDATE", selected);
    },
    setZoomed(context){
      context.commit("SET_ZOOM",true);
    },
    createTable(context,id){
      var table = $("#sneCandidates").DataTable({
        "pageLength": 6,
        "dom":"t,p,r",
        "order": [[ 2, "desc" ],[1,"desc"]],
        "responsive": true,
        "searching": true, "info": false,"lengthChange":false,
        'processing': true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': 'Loading...'
        },
        "columns": [
          { data: "oid" },
          { data: "discovery_date" },
          { data: "prob" },
        ],
      });
      context.commit("SET_TABLE",table)
    }
  },
  getters:{
    getCandidates(state){
      return state.sneCandidates;
    },
    getSelected(state){
      return  state.selectedSne ? state.sneCandidates[state.selectedSne] : null;
    },
    getDeltaDays(state){
      return state.deltaDays;
    },
    getZoomed(state){
      return state.zoomed;
    },
    getAlert(state){
      return state.alertCandidate;
    },
    getTable(state){
      return state.table;
    }
  }
})
