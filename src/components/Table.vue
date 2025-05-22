<template>
  <div class="" style="margin-left: 2%; margin-right: 2%">
    <h4 class="text-xs-center">
      Top {{ nCandidates }} SN Early Classified Candidates
    </h4>
    <h6 class="text-xs-center">Click a candidate for more information</h6>
    <v-form>
      <v-layout>
        <v-flex xs4>
          <v-select
            v-model="nCandidates"
            item-text="text"
            item-value="value"
            @change="cleanAndReloadTable()"
            label="Candidates Shown"
            :items="nCandidatesSelect"
          ></v-select>
        </v-flex>
        <v-flex xs4>
          <v-select
            v-model="delta"
            item-text="text"
            item-value="value"
            :items="deltaTimes"
            @change="cleanAndReloadTable()"
            label="Time Window"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-btn @click="cleanAndReloadTable()" style="margin-top: 15px">
            <v-icon> cached </v-icon>
            Refresh
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>

    <v-layout >
      <v-flex align-center justify-start row>
        <v-btn-toggle mandatory v-model="classifierText" @change="reloadTable()" class="mr-4">
          <v-btn flat value="stamp_classifier" >
            Stamp classifier
          </v-btn>
          
          <v-btn flat value="stamp_classifier_2025_beta">
            STAMP CLASSIFIER FULL BETA
          </v-btn>
            
        </v-btn-toggle>


        <v-tooltip bottom close-delay="2000">
          <template v-slot:activator="{ on }">
            <span class="material-icons" v-on="on">help_outline</span>
          </template>
          
          <v-list dark dense subheader class="transparent-list" >
            <v-list-tile
              v-for="(item, index) in itemsClassifiersInformation"
              :key=index
            >
              <v-list-tile-content>
                <span>{{item.text}} ( see  <a :href=item.link target="_blank" class="blue--text text--lighten-3">{{ item.paper }}</a> )</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-tooltip>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex >

        <table
          id="sneCandidates"
          class="table table-hover table-bordered"
          style="margin-top: 10px;"
        >
          <thead>
            <tr>
              <th>ObjectID</th>
              <th class="text-xs-center">Discovery Date</th>
              <th>Score</th>
              <th>#Obs</th>
              <th>Reported</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */


export default {
  data: () => ({
    delta: 1,
    selectedSN: null,
    deltaTimes: [
      { text: "Last 12 Hours", value: 0.5 },
      { text: "Last 24 Hours", value: 1 },
      { text: "Last 48 Hours", value: 2 },
      { text: "Last 72 Hours", value: 3 },
      { text: "Last Week", value: 7 }
    ],
    classifierText: "stamp_classifier",
    table: null,
    nCandidates: 100,
    nCandidatesSelect: [
      { text: 10, value: 10 },
      { text: 50, value: 50 },
      { text: 100, value: 100 },
      { text: 200, value: 200 },
      { text: 400, value: 400 },
      { text: 1000, value: 1000 }
    ],
    itemsClassifiersInformation: [
      {
        text: "Stamp classifier",
        paper: "Carrasco-Davis et al. 2021",
        link: "https://ui.adsabs.harvard.edu/abs/2023ApJ...952L..43R/abstract",
      },
      {
        text: "Beta version of full stamp classifier",
        paper: "Reyes-Jainaga et al. 2023",
        link: "https://ui.adsabs.harvard.edu/abs/2023ApJ...952L..43R/abstract"
      },
    ]
  }),
  mounted: function() {
    this.$root.$on("reloadTable", () => {
        this.reloadTable();
    });
    this.$store.dispatch("retrieveCandidates", this.params);
    this.$store.dispatch("createTable");
    var app = this;
    $("table tbody").on(
      {
        click: function() {
          $(".table-active").removeClass("table-active");
          $(this).attr("class", "table-active");
          var data = app.$store.getters.getTable.row(this).data();
          var oid = data.oid;
          app.$store.dispatch("setSelectedCandidate", oid);
          app.$store.dispatch("retrieveAlert", oid);
          if (app.$store.getters.getUser.email != null) {
            app.$store.dispatch("getReports", oid);
          }
        }
      },
      "tr"
    );
  },
  methods: {
    cleanAndReloadTable() {
      this.$store.dispatch("cleanCandidates");
      this.$store.dispatch("retrieveCandidates", this.params);
    },
    reloadTable() {
      this.$store.dispatch("retrieveCandidates", this.params);
    }
  },
  computed: {
    params() {
      return {
        delta: this.delta,
        nCandidates: this.nCandidates,
        classifier_selected: this.classifierText
      };
    },
    candidate() {
      return this.$store.getters.getSelected.oid;
    },
    logged() {
      return this.$store.getters.getUser.name == null ? false : true;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    '$store.state.user': function() {
      this.reloadTable();
    }
  }
};
/* eslint-enable */
</script>

<style>
#sneCandidates_filter input {
  border-radius: 5px;
  border-style: solid;
  border-color: black;
}

.transparent-list {
  background-color: transparent !important;
}
</style>
