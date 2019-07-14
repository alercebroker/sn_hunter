<template>
  <v-app>
    <Navbar/>

    <v-container fluid>
      <!-- <v-layout row wrap>
        <v-flex md12>
          <h2 class="text-md-center" >Top 100 SNe Candidates</h2>
        </v-flex>
      </v-layout>
 -->

     <v-layout row wrap>
       <v-flex md12 fill-height>
         <MoreInfo/>
       </v-flex> <!-- table -->
     </v-layout>  <!-- map-table row-->

      <v-layout row wrap>
        <v-flex md8 fill-height>
          <Celestial/>
        </v-flex> <!-- table -->
        <v-flex md4 fill-height>
          <Table/>
        </v-flex> <!-- table -->
      </v-layout>  <!-- map-table row-->

    </v-container> <!-- contianer -->
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Table from './components/Table'
import Celestial from './components/Celestial'
import MoreInfo from './components/MoreInfo'

export default {
  name: 'App',
  components: {
    Navbar,
    Table,
    Celestial,
    MoreInfo
  },
  data () {
    return {
      //
    }
  }
}
</script>
