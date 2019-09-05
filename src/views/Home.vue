<template>
    <v-container fluid id="home">
     <v-layout row wrap >
       <v-flex md12 fill-height>
         <MoreInfo/>
       </v-flex> <!-- table -->
     </v-layout>  <!-- map-table row-->

      <v-layout row wrap>
        <v-flex md7 fill-height>
          <Celestial/>
          <div class="text-xs-center">
            <v-btn id="quickStartBtn" @click="startTour()" dark color="primary" :disabled="quickStart">
              <v-icon>play_for_work</v-icon>
              Quick Start
            </v-btn>
          </div>

        </v-flex> <!-- table -->
        <v-flex id="table" md5 fill-height>
          <Table/>
        </v-flex> <!-- table -->
      </v-layout>  <!-- map-table row-->

      <v-tour name="quickStart" :action="clickStep" :steps="steps"></v-tour>
    </v-container> <!-- contianer -->
</template>

<script>
import Table from '../components/Table'
import Celestial from '../components/Celestial'
import MoreInfo from '../components/MoreInfo'

export default {
  name: 'Home',
  components: {
    Table,
    Celestial,
    MoreInfo
  },
  data () {
    return {
      steps: [
          {
            target: '#sneCandidates',
            content: 'Here are the top 100 SN Candidates.'
          },
          {
            target: '#celestialDiv',
            content: 'All the candidate are also showed in the map, to get the spatial distribution of candidates.'
          },
          {
            target: 'tr td',
            content: 'This is the ZTF Object id for the candidate'
          },
          {
            target: 'tr td:nth-of-type(2)',
            content: 'The discovery date of the object'
          },
          {
            target: 'tr td:nth-of-type(3)',
            content: 'The probability given by the model'
          },
          {
            target: 'tr td:nth-of-type(4)',
            content: 'Number of detections of the object',
          },
          {
            target: 'table',
            content: 'Clicking on a candidate will show more information',
          },
          {
            target: '#moreInfoDiv',
            content: '<p>Here is shown relevant information about the candidate. Some positional, photometric, images and links to useful resources</p><p>For more information check the <a href="faq"> FAQ </a> section.</p>',
            params:{
              placement: 'bot'
            }
          }

        ],
        tours: null
    }
  },
  computed: {
    quickStart: function(){
        return false;
    },
    clickStep: function(){
      if(this.tours){
        if(this.$tours['quickStart'].currentStep == 6){
          this.clickRow()
        }
      }

    }
  },
  methods:{
    startTour(){
      this.tours = this.$tours
      this.$tours['quickStart'].start();
    },
    clickRow(){
      $("#sneCandidates tr:nth-of-type(1)").click();
    }
  }
}
</script>
