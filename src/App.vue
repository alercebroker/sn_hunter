<template>
  <v-app>
    <div id="app">
      <Navbar/>
      <router-view/>
      <!-- <Footer/> -->
    </div>
  </v-app>
</template>


<script>
import Navbar from './components/Navbar'
// import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    // Footer
  },
  mounted: function(){
    this.$store.dispatch("getAlerceTNS");
  },
  data () {
    return {
      //
    }
  }
}
</script>
