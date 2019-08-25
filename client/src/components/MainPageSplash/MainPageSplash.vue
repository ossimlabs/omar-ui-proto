<template>
<b-container>
  <b-row>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Image Discovery and Analysis</h1>
    </div>
  </b-row>

  <b-row>
    <b-card-group columns>
      <b-card
        v-for="(card, index) in cards"
        :key="index"
        :header="card.title"
        class="ma-2 pa-2 custom-card"
      >
        <b-card-text>
          {{ card.desc }}
        </b-card-text>
        <div slot="footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </b-card>
    </b-card-group>

  </b-row>

  <b-row align-h="center" class="mt-5">
    <b-alert show text dismissible fade class="text-center">
      <h4 class="alert-heading">New federation capability!</h4>
      <p>Select an O2 server from the new dropdown box located above the result cards list!</p>
    </b-alert>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: "MainPageSplash",
  props: {},
  components: {},
  data () {
    return {
      cards: [
        {
          title: 'Search',
          icon: 'search',
          desc: 'Search and discover various types of imagery. Use this as a starting point for filtering, sorting, and assembling imagery into a collection'
        },
        {
          title: 'TLV',
          icon: 'clock',
          desc: 'An on-demand imagery flipbook'
        },
        {
          title: 'KML',
          icon: 'map',
          desc: 'download a kml of the last [10] images acquired.'
        },
        {
          title: 'GeoRss',
          icon: 'wifi',
          desc: 'create a georss feed of images.'
        },
        {
          title: 'image upload',
          icon: 'upload',
          desc: 'a place to upload images.'
        }
      ]
    }
  },
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
.custom-card {
  display: inline-block;
}

.card-deck .card {
  min-width: 220px;
}

</style>
