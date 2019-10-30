<template>
  <v-container fluid>
    <v-row v-if="sensorAlertToggle">
      <v-alert text dense dismissible elevation="5" type="warning">
        Sensor filters not applied to video results!
      </v-alert>
    </v-row>
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
      <v-col cols="2" id="to-the-top-target">
        Showing {{ allResults.length }} Results
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap">
      <v-card
        ripple outlined elevation="4" width="350" class="ma-2"
        v-for="feature in allResults"
        :key="feature.properties.id"
      >
        <v-system-bar color="green" class="custom-transparency text-center text-uppercase text-center" absolute>
          <h5>Unclassified</h5>
        </v-system-bar>

        <v-img
          class="white--text"
          height="300px"
          :src="returnThumbnail(feature.properties)"
        >
          <!-- video player icon -->
          <v-icon
            v-if="feature.properties.type === 'mpg'"
            @click="openVideoPlayer(feature.properties)"
            class="custom-video-icon"
            size="50"
          >fa-play-circle</v-icon>

          <v-card-actions class="align-end fill-height" v-show="showTools">
            <v-btn icon><v-icon>fa-expand-arrows-alt</v-icon></v-btn>
            <MetaDataModal :properties="properties"></MetaDataModal>
            <v-btn icon @click="openTLV(feature.properties.id)"><v-icon>fa-history</v-icon></v-btn>

          </v-card-actions>

        </v-img>

        <v-card-title v-show="showDetails">{{ feature.id }}</v-card-title>
        <v-card-text v-show="showDetails">{{ feature.properties.ingest_date }}</v-card-text>

        </v-card>
      </div>

  </v-container>
</template>

<script>
import qs from 'qs'
import MetaDataModal from '@/components/MetaDataModal/MetaDataModal'

export default {
  name: 'SearchResultsLayout',
  props: {
    wfsFeatureArray: Array,
    allResults: Array,
    sensorAlertToggle: Boolean
  },
  components: { MetaDataModal },
  data: () => ({
    showDetails: false,
    showTools: true,
    getThumbUrl: 'https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?id=',
    thumb_ph: 'https://picsum.photos/1920/1080?random',
    failed_image: false,
    currentRoute: window.location.pathname,
    processEnv: process.env.SERVER_URL,
    properties: null
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    openTLV (imageId) {
      const tlvUrl = `/tlv/?filter=in(${imageId})`
      window.open(tlvUrl, '_blank');
    },
    openVideoPlayer (properties) {
      console.log('properties', properties)
      window.open(properties.player_url)
    },
    returnThumbnail(properties) {
      let thumbUrl = ''

      if (properties.type === 'mpg') {
        thumbUrl = properties.request_thumbnail_url
      } else {
        thumbUrl = 'https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?' + qs.stringify({
          entry: properties.entry_id,
          filename: properties.filename,
          id: properties.id,
          outputFormat: 'jpeg',
          padThumbnail: false,
          size: 325,
          transparent: false
        });
      }
      return thumbUrl

    }
  }
}
</script>

<style scoped>
.custom-video-icon {
  position: absolute;
  left:150px;
  top: 130px;
  margin: auto auto;
}
.custom-transparency {
  opacity: 0.75;
}
</style>
