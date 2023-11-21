<template>
  <v-expansion-panel v-model="panel">
    <v-expansion-panel-content :disabled="expandiblePanel">
      <template v-slot:header>
        <span class="subheading">Light Curve</span>
      </template>
      <v-card>
        <v-card-text id="lightCurveDiv" class="justify-center">
          <div id="lightcurve-container"></div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import * as htmx from "htmx.org";

var htmx_lightcurve_base_url = "https://api.staging.alerce.online/v2/lightcurve";

export default {
  name: "lightcurvePlot",
  components: {},
  props: {},
  data: function() {
    return {
      panel: null,
    };
  },
  mounted() {
    this.$store.subscribe((mutations) => {
      switch (mutations.type) {
        case "SELECT_CANDIDATE":
          this.panel = 0;
          break;
      }
    });
  },
  methods: {},
  computed: {
    expandiblePanel() {
      if (this.$store.getters.getSelected) {
        return false;
      }
      return true;
    },
    oid() {
      return this.$store.getters.getSelected
        ? this.$store.getters.getSelected.oid
        : "---";
    },
  },
  watch: {
    oid(newval) {
      if (newval) {
        const url = `${htmx_lightcurve_base_url}/htmx/lightcurve?oid=${newval}`;
        const myDiv = document.getElementById("lightcurve-container");
        if (myDiv) {
          myDiv.innerHTML = `<div hx-get=${url} hx-trigger="updateLightcurve from:body" hx-swap="outerHTML">Loading light curve...</div>`;
          htmx.process(myDiv);
          document.body.dispatchEvent(new Event("updateLightcurve"));
        }
      }
    },
  },
};
</script>
<style>
#lightcurve-container {
  height: 40vh;
}
</style>
