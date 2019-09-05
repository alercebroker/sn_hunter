<template>
  <v-expansion-panel v-model="panel">
    <v-expansion-panel-content  :disabled="expandiblePanel" >
      <template v-slot:header>
        <span class="subheading">SN Candidate First Detection Information</span>
      </template>
      <v-card>
        <v-card-text id="moreInfoDiv" class="justify-center">
          <v-layout row wrap ml-3 mr-3>
            <v-flex md4 xs12 sm12 >
              <h1 class="text-xs-center" >
                <a :href="oidUrl" target="_blank">{{oid}}</a>
              </h1>
              <div class="text-xs-center overline">
                First Detection Information
              </div>
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

              <div class="text-xs-center overline">
                PanSTARRS X-Match Information.
              </div>
              <v-divider></v-divider>
              <v-layout align-center  row wrap>
                <v-flex xs4 full-width class="text-xs-center">
                  ObjectID : {{panSTARRS_info? panSTARRS_info.objectidps : "-"}}
                </v-flex>
                <v-flex xs4 full-width class="text-xs-center">
                  Distance : {{panSTARRS_info? panSTARRS_info.distpsnr.toFixed(3): "-"}} arcsec
                </v-flex>
                <v-flex xs4 full-width class="text-xs-center">
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            <span>
                            <v-icon  class="hidden-sm-and-down">help</v-icon>  Star Galaxy Score :
                            {{panSTARRS_info? panSTARRS_info.sgscore.toFixed(3): "-"}}
                            </span>
                          </span>
                    </template>
                    <span>Star/Galaxy score of closest source from PS1 catalog. Closer to 1 implies higher likelihood of being a star.</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>




              <v-layout row pt-0 pb-0 wrap class="infoTab" id="buttons">
                <v-flex class="text-xs-center">
                  <v-btn :href="oidUrl" target="_blank" dark color="primary">ALeRCE</v-btn>
                  <v-btn :href="nedUrl" target="_blank" dark color="primary">NED</v-btn>
                  <v-btn :href="tnsUrl" target="_blank" dark color="primary">TNS</v-btn>
                  <v-btn :href="simbadUrl" target="_blank" dark color="primary">SIMBAD</v-btn>

              </v-flex>
              </v-layout>
              <div class="text-xs-center">
                <template>
                  <v-layout pa-0 text-xs-center>
                    <v-dialog v-model="dialog" max-width="700px" >
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" flat block dark v-on="on" :disabled="!avro_info">Full Alert Information</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Alert Information</span>
                        </v-card-title>
                        <v-card-text >
                          <p>For more information read <a target="_blank" href="https://zwickytransientfacility.github.io/ztf-avro-alert/schema.html">the ZTF Schema.</a></p>
                          <table v-if="avro_info" class="table table-striped" id="alertTable">
                            <thead class="thead-dark">
                              <tr>
                                <th>Key</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="row in table_avro_info">
                                <td>{{row[0]}}</td>
                                <td>{{row[1]}}</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </template>
              </div>

            </v-flex>
            <v-flex  md4 xs12 sm12 pa-4>
              <Aladin/>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md4  xs12 sm12  id="StampInfo" style="margin-top: auto; margin-bottom:auto;">
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
                    <span>Template is an template image of the same region of the sky (Maybe a stack of several images).</span>
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
                    <span>Difference is the change between science and template images.</span>
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
                    <span>Discovery Stamps are the first stamps retrieved for an object.</span>
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
  import Aladin from './Aladin'

  var base_url = "http://avro.alerce.online/get_stamp"
  // ?oid="+oid+"&candid="+selected["candid_str"]+"&format=png&type="
  export default{
    components:{
      Aladin
    },
    data: function(){
      return {
        panel: null,
        dialog: false,
        headers: [{text:"Key", value:"key"},{text:"Value", value:"value"}]
      }
    },
    computed:{
      table_avro_info(){
        var values = []
        for(var key in this.avro_info.candidate){
          values.push([ key,this.avro_info.candidate[key]])
        }
        return values
      },
      avro_info(){
        return this.$store.getters.getAvro;
      },
      panSTARRS_info(){
        if(this.$store.getters.getAvro){
          return {"distpsnr":this.$store.getters.getAvro.candidate.distpsnr1, "objectidps":this.$store.getters.getAvro.candidate.objectidps1, "sgscore":this.$store.getters.getAvro.candidate.sgscore1}
        }
        else{
          return null;
        }
      },
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
        return "http://alerce.online/object/"+this.oid;
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
        return this.$store.getters.getAlert ? "https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates="+this.$store.getters.getAlert.ra+"d,"+this.$store.getters.getAlert.dec+"d&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch" : "#";
      },
      tnsUrl(){
        return this.$store.getters.getAlert ? 'https://wis-tns.weizmann.ac.il/search?ra='+this.$store.getters.getAlert.ra+'&decl='+this.$store.getters.getAlert.dec+'&radius=10&coords_unit=arcsec' : "#";
      },
      simbadUrl(){
        return this.$store.getters.getAlert ? 'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord='+this.$store.getters.getAlert.ra+"%20"+this.$store.getters.getAlert.dec+'&Radius.unit=arcsec&Radius=10' : "#";
      },
      expandiblePanel(){
        if(this.$store.getters.getSelected){
          return false
        }
        return true
      }

    },
    mounted: function(){
      this.$store.subscribe((mutations,state) => {
        switch (mutations.type) {
          case "SELECT_CANDIDATE":
            this.panel = 0;
            this.$store.dispatch("setAladin");
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
   #alertTable {
    margin: auto;
    width: 50% !important;
  }
</style>
