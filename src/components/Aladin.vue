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
        mounted(){
            this.aladin = A.aladin('#aladin-lite-div', {survey: "P/PanSTARRS/DR1/color-z-zg-g", fov:0.02, cooFrame: "J2000d"});
            if(this.coordinates.ra && this.coordinates.dec) this.aladin.gotoRaDec(this.coordinates.ra, this.coordinates.dec)
        },
        watch:{
            coordinates(newCoord){
                if(this.aladin)
                  {
                    this.aladin.gotoRaDec(newCoord.ra, newCoord.dec)
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
