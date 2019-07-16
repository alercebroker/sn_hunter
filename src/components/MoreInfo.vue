<template>
  <v-expansion-panel v-model="panel" id="moreInfoPanel" class="d-none">
  <!-- <v-expansion-panel v-model="panel"> -->
    <v-expansion-panel-content >
      <template v-slot:header>
        <div class="subheading">SNe Candidate First Detection Information</div>
      </template>
      <v-card>
        <v-card-text class="justify-center">
          <v-layout row wrap ml-3 mr-3>
            <v-flex md6 xs12 sm12 >
              <h1 class="text-xs-center" >
                <a :href="oidUrl" target="_blank">{{oid}}</a>
              </h1>
              <v-divider></v-divider>
              <v-layout row wrap class="infoTab" id="mainInfo">
                <v-flex xs4 full-width class="text-xs-center">
                  <v-layout row wrap>
                      <v-flex xs12>
                        <v-layout column>
                          <v-flex xs6>
                            <span class="font-weight-bold"> RA:</span> {{ra}}
                          </v-flex>
                          <v-flex xs6>
                            <span class="font-weight-bold"> DEC:</span> {{dec}}
                          </v-flex>
                        </v-layout>
                    </v-flex>
                  </v-layout>

                </v-flex>
                <v-flex xs2 full-width class="text-xs-center">
                  <div class="" style="margin-top:auto; margin-bottom:auto">
                    <v-icon class="infoIcon">filter_frames</v-icon> <span class="font-weight-bold"> Band: </span>
                    <v-avatar size=25 :color="bandColor">
                      <span class="white--text" style="font-size=20%"> {{band}}</span>
                    </v-avatar>
                  </div>
                 </v-flex>
                 <v-flex xs5 full-width class="text-xs-center">
                   <v-layout column>
                     <v-flex xs6>
                       <v-icon class="infoIcon">star</v-icon> <span class="font-weight-bold"> Mag:</span> {{mag}}
                     </v-flex>
                     <v-flex xs6>
                       <v-icon class="infoIcon">date_range</v-icon> <span class="font-weight-bold"> MJD:</span> {{mjd}}
                     </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>

              <v-layout row wrap class="infoTab" id="buttons">
                <v-flex class="text-xs-center">
                  <v-btn round :href="oidUrl" target="_blank" dark>ALeRCE</v-btn>
                  <v-btn round :href="nedUrl" target="_blank" dark color="green">NED</v-btn>
                  <v-btn round :href="tnsUrl" target="_blank" dark color="orange">TNS</v-btn>
                  <v-btn round :href="simbadUrl" target="_blank" dark color="primary">SIMBAD</v-btn>

              </v-flex>
              </v-layout>

            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md6>
              <v-layout row wrap class="justify-center">
                <v-flex xs4 class="text-xs-center">
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            <h5 class="subheading text-xs-center">Science
                              <v-icon class="hidden-sm-and-down">help</v-icon>
                            </h5>
                          </span>
                    </template>
                    <span>Science is the current image from an object.</span>
                  </v-tooltip>                     <v-img :src="scienceStamp" alt="Science Stamp" ></v-img>
                </v-flex> <!-- table -->
                <v-flex xs4 class="text-xs-center">
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            <h5 class="subheading text-xs-center">Template
                              <v-icon class="hidden-sm-and-down">help</v-icon>
                            </h5>
                          </span>
                    </template>
                    <span>Template is the first image from an object.</span>
                  </v-tooltip>                  <v-img :src="templateStamp" alt="Template Stamp" ></v-img>
                </v-flex> <!-- table -->
                <v-flex xs4 class="text-xs-center">
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            <h5 class="subheading text-xs-center">Difference
                              <v-icon class="hidden-sm-and-down">help</v-icon>
                            </h5>
                          </span>
                    </template>
                    <span>Difference is the change between science and template stamp.</span>
                  </v-tooltip>
                  <v-img :src="differenceStamp" alt="Difference Stamp" ></v-img>
                </v-flex> <!-- table -->
                <v-flex>
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            <h4 class="text-xs-center">Discovery Stamps
                              <v-icon>help</v-icon>
                            </h4>
                          </span>
                    </template>
                    <span>Discovery Stamp is the first stamp retrieve for an object.</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-flex> <!-- table -->
          </v-layout>  <!-- map-table row-->
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>


<script>
  var base_url = "http://avro.alerce.online/get_stamp"
  // ?oid="+oid+"&candid="+selected["candid_str"]+"&format=png&type="
  export default{
    data: function(){
      return {
        panel: [],
      }
    },
    computed:{
      stampUrl(){
        var alert = this.$store.getters.getAlert;
        if(alert){
          var url = base_url + "?oid="+ alert["oid"] + "&candid=" +  alert["candid_str"] + "&format=png&type="
        }else{
          var url=require('../assets/logos/footerAlerce.png')+"?"
        }
        return url
      },
      scienceStamp(){
        return this.stampUrl + "science"
      },
      templateStamp(){
        return this.stampUrl + "template"
      },
      differenceStamp(){
        return this.stampUrl + "difference"
      },
      oid(){
        return this.$store.getters.getSelected ? this.$store.getters.getSelected.oid : "---";
      },
      oidUrl(){
        return "http://alerce.xyz/vue/object/"+this.oid;
      },
      ra(){
        return this.$store.getters.getAlert ? this.$store.getters.getAlert.ra : "-";
      },
      dec(){
        return this.$store.getters.getAlert ? this.$store.getters.getAlert.dec : "-";
      },
      band(){
        var alert = this.$store.getters.getAlert;
        if(alert){
          var filter = alert.fid;
          if(filter == 2){
            var band ='r'
          }else{
            var band ='g'
          }
          return band
        }else{
          return null
        }
      },
      bandColor(){
        var alert = this.$store.getters.getAlert;
        if(alert){
          var filter = alert.fid;
          if(filter == 2){
            var band ='red'
          }else{
            var band ='green'
          }
          return band
        }else{
          return "primary"
        }
      },
      mjd(){
        return this.$store.getters.getAlert ? this.$store.getters.getAlert.mjd : "-";
      },
      mag(){
        return this.$store.getters.getAlert ? this.$store.getters.getAlert.magpsf : "-";
      },
      nedUrl(){
        return this.$store.getters.getAlert ? 'http://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?lon='+this.$store.getters.getAlert.ra+'d&lat='+this.$store.getters.getAlert.dec+'&radius=0.16&search_type=Near+Position+Search' : "#";
      },
      tnsUrl(){
        return this.$store.getters.getAlert ? 'https://wis-tns.weizmann.ac.il/search?ra='+this.$store.getters.getAlert.ra+'&decl='+this.$store.getters.getAlert.dec+'&radius=10&coords_unit=arcsec' : "#";
      },
      simbadUrl(){
        return this.$store.getters.getAlert ? 'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord='+this.$store.getters.getAlert.ra+"%20"+this.$store.getters.getAlert.dec+'&Radius.unit=arcsec&Radius=10' : "#";
      }

    },
    mounted: function(){
      this.$store.subscribe((mutations,state) => {
        switch (mutations.type) {
          case "SELECT_CANDIDATE":
            $("#moreInfoPanel").removeClass("d-none");
            this.panel = 0;
          break;
        }
      })
    }
  }
</script>

<style>
   #mainInfo{
     font-size:15px;
   }
   .infoIcon{
     font-size:15px;
     vertical-align: middle;
   }
   .infoTab{
     margin-top: 3%;
     margin-bottom: 3%;
   }
</style>
