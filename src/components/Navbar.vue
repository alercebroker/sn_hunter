<template>
  <v-toolbar dark color="dark" >
    <v-toolbar-side-icon :to="{'path':'/'}"> <v-img :src="require('../assets/logos/footerAlerceWhite.png')">
    </v-img>
    </v-toolbar-side-icon>

    <v-toolbar-title :to="{'path':'/'}" class="white--text">
      <span class="hidden-sm-and-down">
        ALeRCE
      </span>
      <span>
        SN Hunter
      </span>
    </v-toolbar-title>

    <!-- <v-spacer></v-spacer> -->


    <v-toolbar-items  class="ml-3 hidden-sm-and-down">
      <v-btn
          flat
           v-for="item in items"
           :href="item.link"
           class="text-capitalize"
         >{{ item.title }}</v-btn>
       </v-toolbar-items>

   <v-menu
    full-width
    :z-index="priority"
    class="hidden-md-and-up">
     <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
     <v-list>
       <div v-for="item in items">
         <v-list-tile :href="item.link" >
             <v-list-tile-title>{{ item.title }}</v-list-tile-title>
         </v-list-tile>
       </div>
     </v-list>
   </v-menu>

    <v-spacer></v-spacer>

    <v-btn color="primary" :to="{'path':'/faq'}">
      FAQ
    </v-btn>

  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({
      priority: 30,
      items: [
        { title: 'ZTF Explorer' , link:"http://alerce.online"},
        { title: 'About', link:"http://alerce.science" },
      ],
    }),
  }
</script>

<style>
  .toolbar-icon{
    padding-right: 5px;
  }
</style>
