<template>
       <v-card>
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
           <v-layout row wrap>
             <v-flex xs12>
               <v-layout row wrap>
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
               </v-layout>
               <v-layout row wrap>
                 <v-flex xs8>
                   <span class="font-weight-black">Host:</span>
                    {{data["Host Name"]?data["Host Name"]:"-"}}
                 </v-flex>
                 <v-flex xs4>
                   <span class="font-weight-black">H.Redshift:</span>
                    {{data["Host Redshift"]?data["Host Redshift"].toFixed(3):"-"}}
                 </v-flex>
               </v-layout>
               <v-divider></v-divider>
               <v-layout text-xs-center row wrap>
                 <v-flex xs12 v-if="data.Name.includes('SN')">
                   <v-layout row wrap>
                     <v-flex xs6>
                       <span class="font-weight-black">Type:</span>
                        {{data["Obj. Type"]}}
                     </v-flex>
                     <v-flex xs5>
                       <span class="font-weight-black">Redshift:</span>
                        {{data["Redshift"].toFixed(3)}}
                     </v-flex>
                   </v-layout>
                   <v-divider></v-divider>
                 </v-flex>
                 <v-flex xs6>
                   <span class="font-weight-black">Ra:</span>
                   {{data.RA}}
                 </v-flex>
                 <v-flex xs6>
                   <span class="font-weight-black">Dec:</span>
                   {{data.DEC}}
                 </v-flex>
               </v-layout>
             </v-flex>
             <v-flex xs10 offset-xs1>
               <div v-if="loading">
                 <v-chart autoresize></v-chart>
               </div>
               <div v-else>
                 <LightCurve :detections="detections" :non_detections="non_detections"/>
               </div>
             </v-flex>
           </v-layout>
         </v-card-text>
       </v-card>
</template>

<script>
import LightCurve from "@/components/LightCurve"

var ztf_url = process.env.VUE_APP_PSQL_API

export default{
  components:{
    LightCurve
  },
  data(){
    return {
      non_detections: [],
      detections: [],
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
    }
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
