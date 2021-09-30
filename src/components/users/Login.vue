<template>
  <div>
    <v-card>
      <v-card-title class="text-h5 white--text grey darken-4">
        Login
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  id="username"
                  v-model="username"
                  label="Username"
                  :rules="rules"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :rules="rules"
                ></v-text-field>
              </v-flex>

              <v-flex v-if="afterRegister" xs12>
                123Registered user successfully. Check the email we sent to
                <strong>{{ registeredUserMail }}</strong> to activate the
                account. <br />Enjoy ALeRCE Watchlist.
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs6>
                <v-btn id="login" color="primary" block @click="onLoginClick"
                  >Login</v-btn
                >
              </v-flex>

              <v-flex xs6>
                <v-btn
                  id="register"
                  color="primary"
                  block
                  @click="registerModal = !registerModal"
                  >Register</v-btn
                >
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-layout justify-center row wrap>
              <v-flex xs12>
                <v-btn
                  id="googleLogin"
                  color="primary"
                  class="white--text"
                  block
                  @click="onGoogleClick"
                >
                  <v-icon left> mdi-google </v-icon>
                  Log in with Google
                </v-btn>
              </v-flex>
            </v-layout>
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
import Vue from "vue";
import RegisterUser from "./RegisterUser.vue";

export default Vue.extend({
  name: "Login",
  components: {
    RegisterUser,
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      registerModal: false,
      afterRegister: false,
      registeredUserMail: "",
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
    async onLoginClick() {
      if (this.$refs.form.validate()) {
        const userInput = {
          username: this.username,
          password: this.password,
        };
        await this.login(userInput);
        this.$emit("loginClick");
      }
    },
    async onGoogleClick() {
      const loginWindow = window.open("", "_self");
      await this.getGoogleAuthUrl(loginWindow);
      this.$emit("loginClick");
    },
    login(data) {
      this.$store.dispatch("loginNormalUser", data);
    },
    getGoogleAuthUrl(loginWindow) {
      this.$store.dispatch("getGoogleUrl", loginWindow);
    },
  },
});
</script>

<style></style>
