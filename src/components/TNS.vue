<template>
  <div class="">
    <v-layout row wrap>
      <v-flex xs4>
        <div id="tns_aladin"></div>
      </v-flex>
      <v-flex xs8>
          <v-layout row wrap>
            <v-layout row wrap>
              <v-flex xs12>
                <h3>Classified SN</h3>
                <v-divider></v-divider>
                <v-data-table
                dense
                :headers="headersClassified"
                :items="classified"
                :loading="this.$store.getters.getTNS.loading"
                >
                <template v-slot:items="props">
                  <!-- <td>{{ props.item.ID }}</td> -->
                  <td>
                    <a :href="'https://wis-tns.weizmann.ac.il/object/'+(props.item.Name.split(' ')[1])">
                      {{ props.item.Name }}
                    </a>
                  </td>
                  <td>
                    <a :href="'http://alerce.online/object/'+props.item['Disc. Internal Name']">
                      {{props.item['Disc. Internal Name']}}
                    </a>
                  </td>
                  <td>
                    {{props.item["Obj. Type"]}}
                  </td>
                  <td>{{ props.item.RA.toFixed(3) }}</td>
                  <td>{{ props.item.DEC.toFixed(3) }}</td>
                  <td>{{props.item["Discovery Date (UT)"]}}</td>
                  <td>{{props.item["Discovery Mag"]}}</td>
                  <td>{{props.item.Redshift? props.item.Redshift.toFixed(3) : "-"}}</td>
                  <td>{{props.item["Host Name"]}}</td>
                  <td>{{props.item["Host Redshift"]? props.item["Host Redshift"].toFixed(3):'-'}}</td>
                </template>

              </v-data-table>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <h3>Candidates</h3>
                <v-divider></v-divider>
                <v-data-table
                dense
                :headers="headersCandidates"
                :items="candidates"
                :loading="this.$store.getters.getTNS.loading"
                >
                <template v-slot:items="props">
                  <!-- <td>{{ props.item.ID }}</td> -->
                  <td>
                    <a :href="'https://wis-tns.weizmann.ac.il/object/'+(props.item.Name.split(' ')[1])">
                      {{ props.item.Name }}
                    </a>
                  </td>
                  <td>
                    <a :href="'http://alerce.online/object/'+props.item['Disc. Internal Name']">
                      {{props.item['Disc. Internal Name']}}
                    </a>
                  </td>
                  <td>{{ props.item.RA.toFixed(3) }}</td>
                  <td>{{ props.item.DEC.toFixed(3) }}</td>
                  <td>{{props.item["Discovery Date (UT)"]}}</td>
                  <td>{{props.item["Discovery Mag"]}}</td>
                  <td>{{props.item["Host Name"]}}</td>
                  <td>{{props.item["Host Redshift"]? props.item["Host Redshift"].toFixed(3):'-'}}</td>
                </template>

              </v-data-table>
            </v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default{
  data(){
    return {
      aladin: null,
      classifiedCatalog : null,
      candidatesCatalog: null,
      headersClassified:[
        {"text":"TNS Name", "value":"Name"},
        {"text":"ALeRCE Name", "value":"Disc. Internal Name"},
        {"text":"Type", "value":"Obj. Type"},
        {"text":"RA", "value":"RA"},
        {"text":"DEC", "value":"DEC"},
        {"text":"Discovery Date (UT)", "value": "Discovery Date (UT)"},
        {"text":"Discovery Mag","value":"Discovery Mag"},
        {"text":"Redshift","value":"Redshift"},
        {"text":"Host Name","value":"Host Name"},
        {"text":"Host Redshift","value":"Host Redshift"},

      ],
      headersCandidates:[
        {"text":"TNS Name", "value":"Name"},
        {"text":"ALeRCE Name", "value":"Disc. Internal Name"},
        {"text":"RA", "value":"RA"},
        {"text":"DEC", "value":"DEC"},
        {"text":"Discovery Date (UT)", "value": "Discovery Date (UT)"},
        {"text":"Discovery Mag","value":"Discovery Mag"},
        {"text":"Host Name","value":"Host Name"},
        {"text":"Host Redshift","value":"Host Redshift"},

      ]
    }
  },
  mounted:function(){
    this.aladin =  A.aladin('#tns_aladin', {survey: "P/DSS2/color", fov:720, cooFrame: "J2000d"});
    this.classifiedCatalog = this.classifiedCatalog? this.classifiedCatalog : A.catalog({name:"Classified SN", color : '#FE012B'});
    this.candidatesCatalog = this.candidatesCatalog? this.candidatesCatalog : A.catalog({name:"Candidates SN", color : '#FEE501'});
    this.aladin.addCatalog(this.classifiedCatalog);
    this.aladin.addCatalog(this.candidatesCatalog);
  },
  computed: {
    classified(){
      var points = []
      this.$store.getters.getTNS.classified.forEach(function(row){
        points.push(
          A.marker(
            row.RA,row.DEC,
            {popupTitle: row.Name}
          )
        );
      });
      this.classifiedCatalog = this.classifiedCatalog? this.classifiedCatalog : A.catalog({name:"Classified SN", color : '#FE012B'});
      this.classifiedCatalog.addSources(points);
      return this.$store.getters.getTNS.classified
    },
    candidates(){
      var points = []
      this.$store.getters.getTNS.candidates.forEach(function(row){
        points.push(
          A.marker(
            row.RA,row.DEC,
            {popupTitle: row.Name}
          )
        );
      });
      this.candidatesCatalog = this.candidatesCatalog? this.candidatesCatalog : A.catalog({name:"Candidates SN", color : '#FEE501'});
      this.candidatesCatalog.addSources(points);
      return this.$store.getters.getTNS.candidates
    }
  }


}
</script>

<style media="screen">
  #tns_aladin{
    min-height: 500px;
    max-width:500px;
  }
</style>
