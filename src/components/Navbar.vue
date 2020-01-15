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

    <!-- <v-spacer></v-spacer> -->


    <v-toolbar-items  class="ml-3 hidden-sm-and-down">
      <v-btn
          flat
           v-for="(item, index) in items"
           :href="item.link"
           class="text-capitalize"
           v-bind:key="index"
         >{{ item.title }}</v-btn>
       </v-toolbar-items>

   <v-menu
    full-width
    :z-index="priority"
    class="hidden-md-and-up">
     <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
     <v-list>
       <div v-for="(item, index) in items" v-bind:key="index">
         <v-list-tile :href="item.link" >
             <v-list-tile-title>{{ item.title }}</v-list-tile-title>
         </v-list-tile>
       </div>
     </v-list>
   </v-menu>

    <v-spacer></v-spacer>
    <!-- Buttons -->
    <v-toolbar-items>
      <v-btn flat to="/faq">
        FAQ
      </v-btn>
    </v-toolbar-items>
    <v-btn v-if="!logged" class="ma-2" tile outline @click="authenticate()">
      <v-icon left>account_circle</v-icon> Sign in
    </v-btn>
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar size="36px" :color="randomColor">
              <span class="white--text headline">{{userInitials}}</span>
          </v-avatar>
        </v-btn>
      </template>
      <!-- Logged -->
        <v-list subheader dense>
          <v-subheader>{{ user.name.charAt(0).toUpperCase() +
           user.name.slice(1)}} {{ user.last_name.charAt(0).toUpperCase() +
            user.last_name.slice(1)}}</v-subheader>
          <!--Register-->
          <v-list-tile @click="logout()" avatar>
            <v-list-tile-avatar>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> Log out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import {authMixin} from '@/mixins/authMixin';

export default {
  /* eslint-disable */
  name: "navbar",
  mixins: [authMixin],
  data: () => ({
  priority: 30,
  items: [
    { title: 'ZTF Explorer' , link:"http://alerce.online"},
    { title: 'About', link:"http://alerce.science" },
    ],
  }),
  mounted(){
    if(localStorage.getItem('vue-authenticate.vueauth_token')){
      this.$store.dispatch('getUserInfo')
    }

  },
  computed: {
    user(){
      return this.$store.getters.getUser;
    },
    logged(){
      return this.$store.getters.getUser.name == null? false : true;
    },
    randomColor(){
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    },
    userInitials(){
      if (!this.user.name){
          return
      }
      return this.user.name[0] + this.user.last_name[0]
    },
  }
}
/* eslint-enable */
</script>
