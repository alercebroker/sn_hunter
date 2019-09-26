import VueAxios from 'vue-axios'
import axios from 'axios';
import Vue from 'vue'
import store from '../store'

export const authMixin = {
    methods: {
        checkToken: function(provider, redirect){
            axios.post(process.env.VUE_APP_USER_API+"/api/check/", {"token": localStorage.getItem("vue-authenticate.vueauth_token")}).then((response) => {
                    var path = (response.data.status)? true : "/";
                    redirect({ path: path});
                }).catch((error) => {
            });
        },
        authenticate: function(provider) {
            this.$auth.authenticate('google', {provider: "google-oauth2"}).then(function (response) {
                store.dispatch('loginUser', response.data)
            }).catch(function(error) {
                console.log(error);
            });
        },
        logout: function(){
          store.dispatch('logoutUser')
        }
    }
}
