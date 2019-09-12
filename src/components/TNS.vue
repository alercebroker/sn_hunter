<template>
  <div class="">
     <v-layout row wrap>
       <v-flex xs12>
         <h3>Classified SN</h3>
         <v-divider></v-divider>
       </v-flex>
       <v-flex v-if="this.$store.getters.getTNS.loading" xs12>
           <v-layout text-xs-center row wrap>
             <v-flex xs12>
               <v-progress-circular
               indeterminate
               :width="4"
               dark
               ></v-progress-circular>
             </v-flex>
             <v-flex xs12>
               <h5>Loading ALeRCE Classified SN</h5>
             </v-flex>
           </v-layout>
       </v-flex>
       <v-flex v-else v-for="item in classified.slice((this.classifiedPage-1)* this.pagination.rowsPerPage, this.classifiedPage* this.pagination.rowsPerPage)" xs6   sm3>
         <CandidateInfo :tns="item.Name" :alerce="item['Disc. Internal Name']" :data="item" />
       </v-flex>
     </v-layout>
     <v-layout row wrap text-xs-center>
       <v-flex xs12>
         <v-pagination
         v-model="classifiedPage"
         :length="classifiedLen"
         ></v-pagination>
       </v-flex>
     </v-layout>
     <v-layout row wrap>
       <v-flex xs12>
         <h3>SN Candidates</h3>
         <v-divider></v-divider>
       </v-flex>
       <v-flex v-if="this.$store.getters.getTNS.loading" xs12>
           <v-layout text-xs-center row wrap>
             <v-flex xs12>
               <v-progress-circular
               indeterminate
               :width="4"
               dark
               ></v-progress-circular>
             </v-flex>
             <v-flex xs12>
               <h5>Loading ALeRCE SN Candidates</h5>
             </v-flex>
           </v-layout>
       </v-flex>
       <v-flex v-else v-for="item in candidates.slice((this.candidatesPage-1)* this.pagination.rowsPerPage, this.candidatesPage* this.pagination.rowsPerPage)" xs6   sm3>
         <CandidateInfo :tns="item.Name" :alerce="item['Disc. Internal Name']" :data="item" />
       </v-flex>
     </v-layout>
     <v-layout row wrap text-xs-center>
       <v-flex xs12>
         <v-pagination
         v-model="candidatesPage"
         :length="candidatesLen"
         ></v-pagination>
       </v-flex>
     </v-layout>
</div>
</template>

<script>
import CandidateInfo from "@/components/candidateInfo"

export default{
  data(){
    return {
      classifiedPage: 1,
      candidatesPage: 1,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  },
  components:{
    CandidateInfo
  },
  computed:{
    classified(){
      return this.$store.getters.getTNS.classified;
    },
    candidates(){
      return this.$store.getters.getTNS.candidates;
    },
    classifiedLen(){
      return Math.ceil(this.$store.getters.getTNS.classified.length / this.pagination.rowsPerPage);
    },
    candidatesLen(){
      return Math.ceil(this.$store.getters.getTNS.candidates.length / this.pagination.rowsPerPage);
    }
  },
}
</script>
