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
    <!-- Buttons -->
    <v-toolbar-items>
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
          <!--Register-->
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>group_add</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> Register</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!-- Logged -->
        <v-list subheader dense v-else>
          <v-subheader>{{ user.name }}</v-subheader>
          <!--Register-->
          <v-list-tile avatar>
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
  name: "navbar",
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
</script>