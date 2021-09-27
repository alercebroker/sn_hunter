<template>
  <div>
    <v-card>
      <v-card-title class="text-h5 white--text grey darken-4">
        Login
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  id="username"
                  v-model="username"
                  label="Username"
                  :rules="rules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :rules="rules"
                ></v-text-field>
              </v-col>

              <v-col v-if="afterRegister" cols="12">
                123Registered user successfully. Check the email we sent to
                <strong>{{ registeredUserMail }}</strong> to activate the
                account. <br />Enjoy ALeRCE Watchlist.
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-btn
                  id="login"
                  color="primary"
                  block
                  >Login</v-btn
                >
              </v-col>

              <v-col cols="6">
                <v-btn
                  id="register"
                  color="primary"
                  block
                  @click="registerModal = !registerModal"
                  >Register</v-btn
                >
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row justify="center">
              <v-col cols="12">
                <v-btn
                  id="googleLogin"
                  color="primary"
                  class="white--text"
                  block
                >
                  <v-icon left> mdi-google </v-icon>
                  Log in with Google
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center">
      <v-dialog v-model="registerModal" width="400">
        <register-user
          @registerCancel="onRegisterCancel"
          @registered="onRegistered"
        >
        </register-user>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import RegisterUser from './RegisterUser.vue';

export default Vue.extend({
  name: 'Login',
  components: {
    RegisterUser,
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      registerModal: false,
      afterRegister: false,
      registeredUserMail: '',
      rules: [(v) => v.length > 0 || "Field can't be empty"],
    };
  },
  methods: {
    onRegisterCancel() {
      this.registerModal = !this.registerModal;
    },
    onRegistered(payload) {
      this.registerModal = !this.registerModal;
      this.registeredUserMail = payload;
      this.afterRegister = true;
    },
  },
});
</script>

<style></style>
