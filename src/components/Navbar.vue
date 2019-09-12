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
      <v-btn flat to="/classified" hidden-sm-and-down>
        Classified SN
      </v-btn>
      <v-btn flat to="/candidates" hidden-sm-and-down>
        Candidates
      </v-btn>

      <v-btn flat to="/faq">
        FAQ
      </v-btn>


      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon v-if="!user.avatar" size="36px">account_circle</v-icon>
            <v-avatar v-else size="36px"> <img :src="user.avatar"></v-avatar>
          </v-btn>
        </template>
        <!-- If not logged -->
        <v-list subheader dense v-if="!logged">
          <v-subheader>Account</v-subheader>
          <!--Sign in-->
          <v-list-tile @click="onLogin()" avatar>
            <v-list-tile-avatar>
              <v-icon>group</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> Sign in</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!-- Logged -->
        <v-list subheader dense v-else>
          <v-subheader>{{ user.name }}</v-subheader>
          <!--Register-->
          <v-list-tile @click="onLogout()" avatar>
            <v-list-tile-avatar>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> Log out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  /* eslint-disable */
  name: "navbar",
  data: () => ({
  priority: 30,
  items: [
    { title: 'ZTF Explorer' , link:"http://alerce.online"},
    { title: 'About', link:"http://alerce.science" },
    ],
  }),
  methods: {
    onLogin() {
        this.$gAuth.signIn().then(GoogleUser =>
        {
            this.$store.dispatch("loginUser", GoogleUser);
        })
        .catch(reason => {
            // TODO: commit error
            console.log(reason)
        })
    },
    onLogout() {
      this.$gAuth.signOut().then( () =>
        this.$store.dispatch("logoutUser")
      )
    }
  },
  computed: {
    user(){
      return this.$store.getters.getUser;
    },
    logged(){
      return this.$store.getters.getUser.name == null? false : true;
    }
  }
}
/* eslint-enable */
</script>
