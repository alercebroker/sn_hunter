<template>
  <v-toolbar dark color="dark">
    <v-toolbar-side-icon :to="{'path':'/'}"> 
      <v-img :src="require('../assets/logos/footerAlerceWhite.png')"></v-img>
    </v-toolbar-side-icon>
    <v-toolbar-title :to="{'path':'/'}" class="white--text">
      <span class="hidden-sm-and-down">
        ALeRCE
      </span>
      <span>
        SN Hunter
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/faq">
        FAQ
      </v-btn>
    </v-toolbar-items>
     <v-btn icon @click="onLogin">
      <v-icon>account_circle</v-icon>
    </v-btn>
    

  </v-toolbar>
  
</template>
<script>
export default {
  methods: {
    onLogin() {
        this.$gAuth.signIn().then(GoogleUser => 
        {
            this.$store.dispatch("loginUser", GoogleUser);
        })
        /*.catch(reason => {
            // TODO: commit error
        })*/
    },
  },
}
</script>