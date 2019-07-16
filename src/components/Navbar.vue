<template>
  <v-toolbar dark color="dark">
    <v-toolbar-side-icon :to="{'path':'/'}"> <v-img :src="require('../assets/logos/footerAlerceWhite.png')">
    </v-img>
    </v-toolbar-side-icon>

    <v-toolbar-title :to="{'path':'/'}" class="white--text">
      ALeRCE SNe Hunter
    </v-toolbar-title>
    <v-spacer></v-spacer>
<!-- 
      <v-btn :to="{'path':'/quickstart'}">
        <v-icon class="icon">help</v-icon> Quick Start
      </v-btn> -->

    <v-btn :to="{'path':'/faq'}">
      FAQ
    </v-btn>

  </v-toolbar>
</template>


<style>
  .toolbar-icon{
    padding-right: 5px;
  }
</style>
