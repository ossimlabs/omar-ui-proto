<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
        <v-btn icon @click="showDetails = !showDetails">
          <v-icon v-if="showDetails">fa-th-large</v-icon>
          <v-icon v-else>fa-th</v-icon>
        </v-btn>
        <v-btn icon @click="showTools = !showTools">
          <v-icon :style="showTools ? 'color: green' : 'color: white'">fa-toolbox</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        Showing {{ allResults.length }} Results
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap">
      <v-card
        ripple outlined elevation="4" width="350" class="ma-2"
        v-for="feature in allResults"
        :key="feature.id"
      >
        <v-system-bar color="green" class="custom-transparency text-center text-uppercase text-center" absolute>
          <h5>
            Unclassified
          </h5>
        </v-system-bar>

        <v-img
          class="white--text"
          height="300px"
          :src="returnThumbnail(feature.properties.id)"
        >
          <v-card-actions class="align-end fill-height" v-show="showTools">
            <v-btn icon><v-icon>fa-arrows-alt</v-icon></v-btn>
            <v-btn icon><v-icon>fa-border-all</v-icon></v-btn>
            <v-btn icon><v-icon>fa-history</v-icon></v-btn>
            <v-btn icon><v-icon>fa-wrench</v-icon></v-btn>
          </v-card-actions>
        </v-img>

        <v-card-title v-show="showDetails">{{ feature.id }}</v-card-title>
        <v-card-text v-show="showDetails">{{ feature.properties.ingest_date }}</v-card-text>

        </v-card>
      </div>
  </v-container>
</template>

<script>
export default {
  name: 'SearchResultsLayout',
  props: {
    wfsFeatureArray: Array,
    allResults: Array,
  },
  components: {},
  data: () => ({
    showDetails: false,
    showTools: true,
    getThumbUrl: 'https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?id='
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    returnThumbnail(id) {
      return this.getThumbUrl + id + '&size=300'
    }
  }
}
</script>

<style scoped>
.custom-transparency {
  opacity: 0.75;
}
</style>