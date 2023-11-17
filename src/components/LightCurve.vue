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
        const url = `http://127.0.0.1:8000/htmx/lightcurve?oid=${newval}`;
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
