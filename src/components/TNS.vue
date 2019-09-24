<template>
      <v-layout row wrap>
        <v-flex xs12>
          <h3>{{title}}</h3>
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
                <h5>{{loadingText}}</h5>
              </v-flex>
            </v-layout>
        </v-flex>
        <v-flex
          v-else
          v-for="item in data.slice((this.page-1)* this.pagination.rowsPerPage, this.page* this.pagination.rowsPerPage)"
          hidden-xs-only
          sm12
          md3>
          <CandidateInfo :tns="item.Name" :alerce="item['Disc. Internal Name']" :data="item" />
        </v-flex>
        <v-flex hidden-sm-and-up>
          <v-alert type="warning" :value="true">
            Flip Phone
          </v-alert>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <v-pagination
              v-model="page"
              :length="len"
              :total-visible="7"
              ></v-pagination>
            </v-flex>
          </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import CandidateInfo from "@/components/candidateInfo"

export default{
  props:{
    type: String
  },
  data(){
    return {
      page: 1,
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
    },
    title(){
      return this.type == "classified"? "Classified SN" : "SN Candidates"
    },
    loadingText(){
      return this.type == "classified"? "Loading ALeRCE Classified SN from TNS" : "Loading ALeRCE SN Candidates from TNS"
    },
    len(){
      return this.type == "classified"? this.classifiedLen : this.candidatesLen
    },
    data(){
      return this.type == "classified"? this.classified : this.candidates
    }
  },
}
</script>
