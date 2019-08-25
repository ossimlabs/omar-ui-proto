<template>
<b-container>
  <b-row align-h="center mt-5">
    <b-col>
      <h1 class="text-center mb-4">Image Discovery and Analysis</h1>
    </b-col>
  </b-row>

  <b-row>
    <b-card-group deck>
      <b-card
        v-for="(card, index) in cards"
        :key="index"
        class="m-4 p-2 shadow custom-card text-center"
      >
        <i :class="`fas fa-${card.icon}`" :style="{color:card.color}" class="fa-7x mb-3"></i>
        <b-card-title class="text-capitalize">
          {{ card.title }}
        </b-card-title>

        <div class="overlay shadow-lg">
          <b-card-text class="p-3">
            {{ card.desc }}
          </b-card-text>
        </div>
      </b-card>
    </b-card-group>
  </b-row>

  <b-row align-h="center" class="m-5">
    <b-alert show text dismissible fade class="text-center">
      <h4 class="alert-heading text-capitalize">new federation capability!</h4>
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
          color: 'black',
          desc: 'Search and discover various types of imagery. Use this as a starting point for filtering, sorting, and assembling imagery into a collection'
        },
        {
          title: 'TLV',
          icon: 'clock',
          color: 'blue',
          desc: 'An on-demand imagery flipbook'
        },
        {
          title: 'KML',
          icon: 'map',
          color: 'orange',
          desc: 'download a kml of the last [10] images acquired.'
        },
        {
          title: 'GeoRSS',
          icon: 'wifi',
          color: 'green',
          desc: 'create a georss feed of images.'
        },
        {
          title: 'Image upload',
          icon: 'upload',
          color: 'black',
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
.custom-card:hover .overlay{
  opacity: 0.9;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #f1f1f1;
}

.card-deck .card {
  min-width: 220px;
}

</style>
