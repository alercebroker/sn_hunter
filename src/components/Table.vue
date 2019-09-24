<template>
  <div class="" style="margin-left:2%; margin-right:2%;">
      <h4 class="text-xs-center">Top 100 SN Early Classified Candidates</h4>
      <h6 class="text-xs-center">Click a candidate for more information</h6>
      <v-form >
        <v-layout>
             <v-flex xs8 >
               <v-select
                 v-model="delta"
                 item-text="text"
                 item-value="value"
                 :items="deltaTimes"
                 @change="reloadTable()"
               ></v-select>
              </v-flex>
              <v-flex xs2 >
                <v-btn @click="reloadTable()" style="margin-top:15px;">
                  <v-icon>
                    cached
                  </v-icon> Refresh
                </v-btn>
              </v-flex>
            </v-layout>
      </v-form>
      <v-layout row>
      </v-layout>
      <v-layout row>
        <v-flex>
          <table id="sneCandidates" class="table table-hover table-bordered" style="margin-top: 10px;">
            <thead>
              <tr>
                <th>ObjectID</th>
                <th class="text-xs-center">Discovery Date</th>
                <th>Score</th>
                <th>#Obs</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </v-flex>
      </v-layout>

  </div>
</template>

<script>
/* eslint-disable */
  function jdToDate(jd){
    var date = (jd - 40588) * 86400000;
    return new Date(date)
  }

  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  export default {
    data: () => ({
      delta: process.env.VUE_APP_DELTA,
      selectedSN: null,
      deltaTimes:[
        {text: "Last 24 Hours", value:1},
        {text: "Last 48 Hours", value:2},
        {text: "Last 72 Hours", value:3},
        {text: "Last Week", value:7},
      ],
      table: null,
    }),
    mounted: function(){
      this.$store.dispatch("retrieveCandidates",this.delta);
      this.$store.dispatch("createTable");
      var app = this;
      var oid = null;
      $("table tbody").on({
              click: function () {
                $(".table-active").removeClass("table-active")
                $(this).attr("class","table-active")
                var data =app.$store.getters.getTable.row(this).data();
                var oid = data.oid;
                app.$store.dispatch("setSelectedCandidate",oid);
                app.$store.dispatch("retrieveAlert",oid);
              }
      },'tr');
    },
    methods: {
      reloadTable(){
        this.$store.dispatch("cleanCandidates");
        this.$store.dispatch("retrieveCandidates",this.delta);
      },
    },
    computed: {
      candidate(){
        return this.$store.getters.getSelected.oid;
      },
      logged(){
      return this.$store.getters.getUser.name == null? false : true;
      },
      user(){
        return this.$store.getters.getUser;
      }
    }
  }
/* eslint-enable */
</script>
