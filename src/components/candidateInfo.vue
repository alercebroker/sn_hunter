<template>
       <v-card class="ma-1">
         <v-card-title primary-title  style="padding-bottom:0px">
           <v-layout text-xs-center row wrap>
             <v-flex xs12>
               <h5>
                 <a :href="'https://wis-tns.weizmann.ac.il/object/'+(tns.split(' ')[1])">
                   <span>{{ tns }}</span>
                 </a>
               </h5>
             </v-flex>
             <v-flex xs12>
                 <a :href="'http://alerce.online/object/'+alerce">
                   <span class="caption">
                     {{alerce}}
                   </span>
                 </a>
                 <v-divider></v-divider>
             </v-flex>
           </v-layout>
         </v-card-title>
         <v-card-text>
           <v-layout text-xs-center row wrap>
             <v-flex xs7>
               <span class="font-weight-black">
                 Disc. Date:
               </span>
                {{data["Discovery Date (UT)"]}} (UT)
             </v-flex>
             <v-flex xs5>
               <span class="font-weight-black">Mag:</span>
                {{data["Discovery Mag"]}}  (<span class="font-weight-black">Band:</span> {{data["Discovery Mag Filter"].replace("-ZTF","")}})
             </v-flex>
             <v-flex xs7>
               <span class="font-weight-black">Host:</span>
                {{data["Host Name"]?data["Host Name"]:"-"}}
             </v-flex>
             <v-flex xs5>
               <span class="font-weight-black">H.Redshift:</span>
                {{data["Host Redshift"]?data["Host Redshift"].toFixed(3):"-"}}
             </v-flex>
             <!-- <v-divider></v-divider> -->
             <template v-if="data.Name.includes('SN')">
               <v-flex xs7>
                 <span class="font-weight-black">Type:</span>
                  {{data["Obj. Type"]}}
               </v-flex>
               <v-flex xs5>
                 <span class="font-weight-black">Redshift:</span>
                  {{data["Redshift"].toFixed(3)}}
               </v-flex>
               <!-- <v-divider></v-divider> -->
             </template>
             <v-flex xs12>
               <span class="font-weight-black">Ra:</span>
               {{data.RA}}
               <span class="font-weight-black">Dec:</span>
               {{data.DEC}}
             </v-flex>
             <v-flex xs12>
               <div v-if="loading">
                 <v-progress-linear
                    indeterminate
                  >
                  </v-chart>
                </v-progress-linear>
               </div>
               <div v-else>
                 <LightCurve :detections="detections" :non_detections="non_detections"/>
                  <v-tooltip v-if="last_non_detection" bottom>
                      <template v-slot:activator="{ on }">
                        <span v-on="on">
                          <span class="font-weight-black">
                            Rise ({{first_detection.fid =="1"? "g-ZTF": "r-ZTF"}}):
                          </span>
                           {{((last_non_detection.diffmaglim-first_detection.magpsf)/(first_detection.mjd-last_non_detection.mjd)).toFixed(3)}} ({{(first_detection.sigmapsf/(first_detection.mjd-last_non_detection.mjd)).toFixed(3)}}) [dm/dt]
                        </span>
                      </template>
                      <span> Magnitude rise ratio between last non-detection and first detection. </span>
                    </v-tooltip>
                    <div v-else>
                      No non-detections before first detection
                    </div>
                  </div>
                 </div>
             </v-flex>
             <v-flex  v-if="!loading" xs12>
               <h5>
                 Discovery Stamps
               </h5>
             </v-flex>
             <v-flex xs4>
               <v-img :src="scienceStamp"></v-img>
               Science
             </v-flex>
             <v-flex xs4>
               <v-img :src="templateStamp"></v-img>
               Template
             </v-flex>
             <v-flex xs4>
               <v-img :src="differenceStamp"></v-img>
               Difference
             </v-flex>
           </v-layout>
         </v-card-text>
       </v-card>
</template>

<script>
import LightCurve from "@/components/LightCurve"

var ztf_url = process.env.VUE_APP_PSQL_API
var base_url = "https://avro.alerce.online/get_stamp"

export default{
  components:{
    LightCurve
  },
  data(){
    return {
      non_detections: [],
      detections: [],
      scatter: {
        showLoading: true
      },
      first_detection: null,
      last_non_detection: null
    }
  },
  props: {
    tns: String,
    alerce: String,
    data: Object
  },
  computed:{
    loading(){
      return !((this.detections.length > 0) && (this.non_detections.length > 0))
    },
    alerts(){
      return {detections: this.detections, non_detections: this.non_detections}
    },
    differenceStamp(){
      if(this.first_detection == null){
        return require('../assets/logos/footerAlerce.png')
      }
      return base_url+"?oid="+this.first_detection.oid+"&candid="+ this.first_detection.candid_str +"&type=difference&format=png"
    },
    templateStamp(){
      if(this.first_detection == null){
        return require('../assets/logos/footerAlerce.png')
      }
      return base_url+"?oid="+this.first_detection.oid+"&candid="+ this.first_detection.candid_str +"&type=template&format=png"
    },
    scienceStamp(){
      if(this.first_detection == null){
        return require('../assets/logos/footerAlerce.png')
      }
      return base_url+"?oid="+this.first_detection.oid+"&candid="+ this.first_detection.candid_str +"&type=science&format=png"
    },
  },
  mounted: function(){
    var self = this;

    axios.post(ztf_url+"/get_detections", {oid:this.alerce}).then(function(response){
      self.detections = response.data.result.detections;
    });
    axios.post(ztf_url+"/get_non_detections", {oid:this.alerce}).then(function(response){
      self.non_detections = response.data.result.non_detections;
    });

  },
  watch:{
    alerts: function(newVal){
      if(newVal.detections.length > 0 && newVal.non_detections.length > 0){
        var first_detection = {mjd:Infinity}
        var last_non_detection = {mjd: 0}

        newVal.detections.forEach(function(detection){
          if(first_detection.mjd > detection.mjd){
            first_detection = detection
          }
        })
        newVal.non_detections.forEach(function(non_detection){
          if( non_detection.fid == first_detection.fid && non_detection.mjd < first_detection.mjd && last_non_detection.mjd < non_detection.mjd){
              last_non_detection = non_detection
          }
        })
        if(last_non_detection.mjd == 0){
          last_non_detection = null
        }
        this.first_detection = first_detection
        this.last_non_detection = last_non_detection
      }
    },
    alerce: function(newVal){
      var self = this;
      self.detections = [];
      self.non_detections = [];
      axios.post(ztf_url+"/get_detections", {oid:this.alerce}).then(function(response){
        self.detections = response.data.result.detections;
      });
      axios.post(ztf_url+"/get_non_detections", {oid:this.alerce}).then(function(response){
        self.non_detections = response.data.result.non_detections;
      });
    }
  }

}
</script>
