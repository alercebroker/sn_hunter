<template>
  <v-container v-if="loading" fill-height>
    <v-row justify="center" align="center" align-content="center">
      <v-progress-circular :size="300" indeterminate></v-progress-circular>
    </v-row>
    <v-row justify="center"><h3>Logging in...</h3></v-row>
  </v-container>
  <v-alert v-else color="red">Could not login.</v-alert>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      loading: true,
      code: '',
      state: '',
    };
  },
  async mounted() {
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;
    await this.$store.dispatch('loginGoogleUser', {
      code: this.code,
      state: this.state,
    });
    this.$router.push('/');
  },
});
</script>

<style></style>
