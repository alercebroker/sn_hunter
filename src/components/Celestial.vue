<template>
  <v-layout row wrap full-height>
    <v-flex md10 offset-md1>
      <div  id="celestialDiv">
        <div id="celestial-map"></div>
        <p class="text-xs-center">Smaller circles means lower probability</p>
      </div>
    </v-flex>
  </v-layout>

</template>


<script>
  export default {
    name: "celestial",
    mounted: function(){
      var config = {
        datapath: "/vendor/d3-celestial/data",
        planets:  { show: false },
        stars: {show: false},
        dsos: {show:false, limit:30},
        constellations: {show:false},
        transform: "equatorial",
        background:{
          fill: "#8778d2",
          opacity:1
        },
        mw:{
          show:true,
          style:{
            fill: "#ffffff",
            opacity: 0.3
          }
        },
        lines:{
          graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines
          // grid values: "outline", "center", or [lat,...] specific position
          lon: {pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"},
          // grid values: "outline", "center", or [lon,...] specific position
          lat: {pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}},
        }

      }
      Celestial.display(config);
      this.$store.subscribe((mutations,state) => {
        switch (mutations.type) {
          case "SET_CANDIDATES":

          if ($('#celestialDiv').length){




          Celestial.clear();
          var jsonSN = {
                  "type":"FeatureCollection",
                  // this is an array, add as many objects as you want
                  "features": this.points
                  };
          var pointStyle = {
              stroke: "#534B8C",
              width: 3,
              fill: "rgba(255, 204, 255, 0.8)"
          };
          var selectedStyle = {
            stroke: "#B3D3F4",
            width: 3,
            fill: "#2C87E2"
          };
          var textStyle = {
                  font: "bold 15px Helvetica, Arial, sans-serif",
                  align: "left",
                  baseline: "bottom"
                };

                Celestial.add({type:"raw",
                              callback: function(error, json) {
                                if (error) return console.warn(error);
                                // Load the geoJSON file and transform to correct coordinate system, if necessary
                                var dsn = Celestial.getData(jsonSN, config.transform);

                                // Add to celestial objects container in d3
                                Celestial.container.selectAll(".sn")
                                  .data(dsn.features)
                                  .enter().append("path")
                                  .attr("class", "sn")
                                  .attr("id", function(d){
                                    return d.id;
                                  });                                // Trigger redraw to display changes
                                Celestial.redraw();
                              },
                              redraw: function() {
                                  // Select the added objects by class name as given previously
                                  Celestial.container.selectAll(".sn").each(function(d) {
                                    // If point is visible (this doesn't work automatically for points)
                                    if (Celestial.clip(d.geometry.coordinates)) {
                                      // get point coordinates
                                      var pt = Celestial.mapProjection(d.geometry.coordinates);
                                      // object radius in pixel, could be varable depending on e.g. dimension or magnitude
                                      var r = 7*Math.pow(d.properties.prob,32); // replace 20 with dimmest magnitude in the data

                                      // draw on canvas
                                      //  Set object styles fill color, line color & width etc.
                                      Celestial.setStyle(pointStyle);
                                      // Start the drawing path
                                      Celestial.context.beginPath();
                                      // Thats a circle in html5 canvas
                                      Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
                                      // Finish the drawing path
                                      Celestial.context.closePath();
                                      // Draw a line along the path with the prevoiusly set stroke color and line width
                                      Celestial.context.stroke();
                                      // Fill the object path with the prevoiusly set fill color
                                      Celestial.context.fill();

                                      // Set text styles
                                      // Celestial.setTextStyle(textStyle);
                                      // and draw text on canvas
                                      // Celestial.context.fillText(d.properties.name, pt[0] + r - 1, pt[1] - r + 1);
                                    }
                                  });
                                  Celestial.container.selectAll(".selectedSN").each(function(d) {
                                    //console.log(d);
                                    // If point is visible (this doesn't work automatically for points)
                                    if (Celestial.clip(d.geometry.coordinates)) {
                                      // get point coordinates
                                      var pt = Celestial.mapProjection(d.geometry.coordinates);
                                      // object radius in pixel, could be varable depending on e.g. dimension or magnitude
                                      var r = 7*Math.pow(d.properties.prob,32); // replace 20 with dimmest magnitude in the data

                                      // draw on canvas
                                      //  Set object styles fill color, line color & width etc.
                                      Celestial.setStyle(selectedStyle);
                                      // Start the drawing path
                                      Celestial.context.beginPath();
                                      // Thats a circle in html5 canvas
                                      Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
                                      // Finish the drawing path
                                      Celestial.context.closePath();
                                      // Draw a line along the path with the prevoiusly set stroke color and line width
                                      Celestial.context.stroke();
                                      // Fill the object path with the prevoiusly set fill color
                                      Celestial.context.fill();

                                      // Set text styles
                                      // Celestial.setTextStyle(textStyle);
                                      // and draw text on canvas
                                      // Celestial.context.fillText(d.properties.name, pt[0] + r - 1, pt[1] - r + 1);
                                    }
                                  });
                                }
                              });
                              Celestial.display(config);
                            }
            break;

            case "SELECT_CANDIDATE":
              try{
                this.zoomSN();
              }catch{
                this.$store.dispatch("setAladin");
                this.zoomSN();
              }


            break;
        }
      });

    },
    watch: {
      selectedSN: function(newCandidate, oldCandidate){
        if(oldCandidate){
          Celestial.container.select("#"+oldCandidate).attr("class","sn");
        }
        Celestial.container.select("#"+newCandidate).attr("class","selectedSN");
        Celestial.redraw();
      }
    },
    computed:{
      selectedSN(){
        return this.$store.getters.getSelected ? this.$store.getters.getSelected.oid : null
      },
      points: function(){
        var rawCandidates = this.$store.getters.getCandidates;
        var points = []

        $.each(rawCandidates,function(key,value){
          var oid = key, prob=value["pclassearly"], ra=value["meanra"], dec=value["meandec"];

          points.push({
             "type":"Feature",
             "id":oid,
             "properties": {
               // Name
               "name":oid,
               "type":"sn",
               // magnitude, dimension in arcseconds or any other size criterion
               //"mag": 10,
               //"dim": 30
               "prob": prob
             }, "geometry":{
               // the location of the object as a [ra, dec] array in degrees [-180..180, -90..90]
               "type":"Point",
               "coordinates": [ra,dec]
             }
           });

        });

        return points;
      }


    },
    methods:{
      zoomSN: function(){
        var data = this.$store.getters.getSelected;
        var ra = data["meanra"],
          dec = data["meandec"],
          oid = data["oid"]
        var pt = [ra,dec,0];

        var anim = [];
        var zoomed = this.$store.getters.getZoomed;
        if(zoomed){
          anim.push({"param":"zoom", "value":-.3, "duration":2});
        }else{
          this.$store.dispatch("setZoomed");
        }
        anim.push({"param":"center", "value":pt, "duration":250});
        anim.push({"param":"zoom", "value":1.3, "duration":2});

        Celestial.animate(anim, false);
      }
    }


  }

</script>

<style scoped>
  .auto-adjust{
    margin-top: auto;
    margin-bottom: auto;
  }
  .selectedCandidate{
      stroke: "#534B8C";
      fill: "rgba(255, 255, 255, 0.8)",
  }
</style>
