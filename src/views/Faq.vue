<template>
  <v-layout row >
      <v-flex xs10 offset-xs1 mt-4>
        <h1 class="display-1">Frequently Asked Questions</h1>
        <v-divider></v-divider>
        <v-expansion-panel >
          <v-expansion-panel-content>
          <template v-slot:header>
            <div class="font-weight-bold">What is SNe Hunter?</div>
          </template>
          <v-card>
            <v-card-text>
              <p>
                <span class="font-weight-bold">SNe Hunter</span> is a tool develop by <a href="http://cvalenzuela.me"> Camilo Valenzuela </a> as a
                side project in his spare time to help astronomers <span class="font-weight-bold"> discover new SNe in a early time </span>.
              </p>
              <p>
                This tool uses <a href="http://alerce.science">ALeRCE</a> ZTF Database API to get early classified SNe candidates, and display them in a
                simple interface.
              </p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
        <template v-slot:header>
          <div class="font-weight-bold">How does SNe Hunter Select Candidates</div>
        </template>
        <v-card>
          <v-card-text>
            <p>
              <span class="font-weight-bold">SNe Hunter</span> uses the probability given by ALeRCE Early Classification model to select the most probable
              SNe candidates.
            </p>
            <p>
              ALeRCE Early Classification model (paper pending) get information from the first detection to create a quick classification of objects, then SNe Hunter takes
              the top 100 SNe candidates sorted by the model probability.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>


      <v-expansion-panel-content>
      <template v-slot:header>
        <div class="font-weight-bold">What is a Stamp?</div>
      </template>
      <v-card>
        <v-card-text>
          <p>For ZTF a Stamp is a image taken for an specific object.
          The process to create a stamp is the following: </p>
          <ul>
            <li>ZTF takes an images of a zone of the sky approximately every 1 minute.</li>
            <li>This image is then compared to the first one ever taken (maybe it can change in every public data release).</li>
            <li>If there is a change between the first image and the last taken, an alert is sended.    </li>
            <li>The alert contains Three stamps:</li>
              <ul>
                <li>Science: Current image from the object.</li>
                <li>Template: First image used for comparison.</li>
                <li>Difference: Change between the current and first image.</li>
              </ul>
          </ul>
          We as a Broker takes the alert with the stamps and classify it.
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
    <template v-slot:header>
      <div class="font-weight-bold">Why just the top 100 candidates?</div>
    </template>
    <v-card>
      <v-card-text>
        <p>
          For this tool we only selected the top 100 candidates for an easier visualization on the celestial map.
        </p>
        <p>
          If you need to analyze more candidates please check the <a href="http://alerce.xyz">ALeRCE ZTF DB access plataform</a>.
        </p>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>

  <v-expansion-panel-content>
  <template v-slot:header>
    <div class="font-weight-bold">How can I help?</div>
  </template>
  <v-card>
    <v-card-text>
      <p>
        All help is appreciated, you can send me an <a href="mailto:camilo.valenzuel@alumnos.usm.cl">email</a> with feedback. A list of possible subjects are:
       </p>
      <ul>
        <li>Bugs in the tool</li>
        <li>Some visualization tips to improve the experience</li>
        <li>If you found a missclassified object (This is really important to improve the model accuracy).</li>
        <li>Anything you want to know about SNe Hunter or ALeRCE project.</li>
        <li>If you are in Chile and you want to have a Coffee and talk about astronomy/tech.</li>
      </ul>
    </v-card-text>
  </v-card>
</v-expansion-panel-content>


      </v-expansion-panel>
      </v-flex>
  </v-layout>
</template>
