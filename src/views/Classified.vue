<template>
  <v-container fluid>
       <TNS :type="type"/>
  </v-container>
</template>

<script>
import TNS from "@/components/TNS"
export default {
  data(){
    return {
      type: "classified"
    }
  },
  components:{
    TNS
  },


}

</script>
