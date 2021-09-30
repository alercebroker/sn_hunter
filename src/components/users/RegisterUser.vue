<template>
  <v-card>
    <v-card-title class="text-h5 white--text grey darken-4">
      Register New User
    </v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="username" label="Username"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="name" label="First Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="lastName" label="Last Name"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="email" label="Email"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="institution"
                label="Institution"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select v-model="role" label="Role" :items="roles"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="$emit('registerCancel')">Cancel</v-btn>

      <v-btn id="send" color="primary" text @click="onRegisterClick"
        >Send</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "RegisterUser",
  data() {
    return {
      username: "",
      name: "",
      email: "",
      lastName: "",
      password: "",
      institution: "",
      role: "",
      roles: ["Researcher"],
      showPassword: false,
      registerSent: false,
    };
  },
  methods: {
    async onRegisterClick() {
      if (this.$refs.form.validate()) {
        const userInput = {
          username: this.username,
          name: this.name,
          email: this.email,
          last_name: this.lastName,
          password: this.password,
          institution: this.institution,
          role: this.role,
        };
        await this.sendReport(userInput);
        this.registerSent = true;
        this.$emit("registered", this.email);
      }
    },
    sendReport(userInformation) {
      this.$store.dispatch("registerUser", userInformation);
    },
  },
});
</script>

<style>
.v-text-field {
  padding-top: 8px;
  margin-top: 0px;
}
</style>
