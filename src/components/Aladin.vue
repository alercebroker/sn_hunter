<template >
    <div id="aladin-lite-div"  />
</template>

<script>
    export default {
        name: "aladin",
        data(){
            return {
                aladin: null
            }
        },
        watch:{
            coordinates(newCoord){
                if(this.$store.getters.getAladin)
                  {
                    this.$store.getters.getAladin.gotoRaDec(newCoord.ra, newCoord.dec)
                  }
            }
        },
        computed: {
            coordinates(){
                return {
                    ra: this.$store.getters.getAlert ? this.$store.getters.getAlert.ra : null,
                    dec: this.$store.getters.getAlert ? this.$store.getters.getAlert.dec : null
                }
            }
        }
    }
</script>

<style media="screen">
  #aladin-lite-div{
    /* margin-left:auto; */
    /* margin-right: auto; */
    height: "100%";
    width: "70%";
    min-height: 200px;
  }
</style>
