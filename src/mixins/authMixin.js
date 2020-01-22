import axios from 'axios';
import store from '../store'

export const authMixin = {
    methods: {
        checkToken: function(provider, redirect){
            axios.post(process.env.VUE_APP_USER_API+"/api/check/", {"token": localStorage.getItem("vue-authenticate.vueauth_token")}).then((response) => {
                    var path = (response.data.status)? true : "/";
                    redirect({ path: path});
                }).catch(() => {
            });
        },
        authenticate: function() {
            this.$auth.authenticate('google', {provider: "google-oauth2"}).then(function (response) {
                store.dispatch('loginUser', response.data)
            }).catch(function() {
            });
        },
        logout: function(){
          store.dispatch('logoutUser')
        }
    }
}
