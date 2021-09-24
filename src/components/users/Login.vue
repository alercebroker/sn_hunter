<template>
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
                :loading="loading"
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
                :loading="loading"
              ></v-text-field>
            </v-col>

            <v-col v-if="afterRegister" cols="12">
              <v-alert icon="mdi-email" color="blue-grey" dismissible>
                Registered user successfully. Check the email we sent to
                <strong>{{ userData.email }}</strong> to activate the account.
                <br />Enjoy ALeRCE Watchlist.
              </v-alert>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="3">
              <v-btn
                id="login"
                color="primary"
                block
                @click="onLoginClick"
                :loading="loading"
                >Login</v-btn
              >
            </v-col>

            <v-col cols="3">
              <v-btn
                id="register"
                color="primary"
                block
                @click="$emit('registerClick')"
                :loading="loading"
                >Register</v-btn
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row justify="center">
            <v-col cols="12">
              <v-btn
                id="googleLogin"
                :loading="loading"
                :disabled="loading"
                color="primary"
                class="white--text"
                @click="onGoogleClick"
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
    <!-- 
    

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="$emit('registerClick')">
        I accept
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  props: {
    afterRegister: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      rules: [(v) => v.length > 0 || "Field can't be empty"],
    };
  },
});
</script>

<style></style>
