<template>
  <div class="">


  <v-layout row >
      <v-flex xs10 offset-xs1 mt-4>
        <h1 class="display-1">Frequently Asked Questions</h1>
        <v-divider></v-divider>
        <v-expansion-panel >
          <v-expansion-panel-content>
          <template v-slot:header>
            <div class="font-weight-bold">What is SN Hunter?</div>
          </template>
          <v-card>
            <v-card-text>
              <p>
                  <span class="font-weight-bold">SN Hunter</span> is a tool that uses the  <a href="http://alerce.science">ALeRCE</a> ZTF Database API to help astronomers discover very young SNe.
              </p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
        <template v-slot:header>
          <div class="font-weight-bold">How does SN Hunter Select Candidates</div>
        </template>
        <v-card>
          <v-card-text>
          <p>SN Hunter uses the probability given by the ALeRCE Early Classification model to select the most probable SN candidates.</p>
          <p>The ALeRCE Early Classification model (paper pending) classifies objects based on their first detection image. The SN Hunter takes the top SN candidates sorted by model probability.</p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>


      <v-expansion-panel-content>
      <template v-slot:header>
        <div class="font-weight-bold">What is a Stamp?</div>
      </template>
      <v-card>
        <v-card-text>
          <p>A Stamp is an image taken for a given object at a given time. The process to create a stamp is the following: </p>
          <p>ZTF takes an image of a region of the sky approximately every 1 minute, this is called the science image. This image is then compared to a template image of the same region of the sky (which may be a stack of several images).</p>
          <p>If there is a new source in the difference image (science minus aligned and convolved template) and it is classified as real by ZTF, an alert is triggered.</p>
          <p>The alert contains the science, template and difference images, as well as other meta data.</p>
          <p>We as a Broker ingest alerts and classify their associated objects. We use two classifiers: an early classifier based on the first detected image and a late classifier based on the object's light curve.</p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
    <template v-slot:header>
      <div class="font-weight-bold">Why just the top candidates?</div>
    </template>
    <v-card>
      <v-card-text>
        <p>
          For this tool we only selected the top candidates for an easier visualization on the celestial map.
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
        All help is appreciated, you can send an issue to the <a href="https://github.com/alercebroker/sn_hunter/issues">SN Hunter Github Repository</a> with feedback. list of possible subjects are:
       </p>
      <ul>
        <li>Bugs in the tool</li>
        <li>Some visualization tips to improve the experience</li>
        <li>If you found a missclassified object (This is really important to improve the model accuracy).</li>
        <li>Anything you want to know about SN Hunter or ALeRCE project.</li>
        <li>If you are in Chile and you want to have a Coffee and talk about astronomy/tech.</li>
      </ul>
    </v-card-text>
  </v-card>
</v-expansion-panel-content>


      </v-expansion-panel>
      </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs10 offset-xs1 mt-4>
      <h1 class="display-1">Credits to:</h1>
      <v-divider></v-divider>

      <v-card>
        <v-card-text>
          <ul>
            <li>This tool was develop by <a href="http://cvalenzuela.me"> Camilo Valenzuela</a> for the ALeRCE broker as a side project in his spare time. </li>
          </ul>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>

  </div>
</template>
