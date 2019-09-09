<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <v-flex
        v-for="(card, index) in cards"
        :key="index"
      >
        <v-card
          width="220" ripple
          class="ma-4 pa-2 custom-card text-center"
          @click="$router.push(card.url)"
        >
          <i :class="`fas fa-${card.icon}`" :style="{color:card.color}" class="fa-6x mt-3 mb-3"></i>
          <h4 class="text-capitalize">{{ card.title }}</h4>
          <div class="overlay shadow-lg d-flex align-items-center justify-content-center text-decoration-none">
            <v-card-text class="p-3">
              {{ card.desc }}
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-alert show text dismissible fade class="text-center">
          <h4 class="alert-heading text-capitalize">new federation capability!</h4>
          <p>Select an O2 server from the new dropdown box located above the result cards list!</p>
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MainSplashTiles",
  props: {},
  components: {},
  data: () => ({
    cards: [
      {
        title: 'Search',
        url: '/search',
        icon: 'search',
        color: 'black',
        desc: 'Search and discover various types of imagery.  Use this as a starting point for filtering, sorting, and assembling imagery into a collection.'
      },
      {
        title: 'TLV',
        url: 'tlv',
        icon: 'clock',
        color: 'blue',
        desc: 'An on-demand imagery flipbook.'
      },
      {
        title: 'KML',
        url: 'kml',
        icon: 'map',
        color: 'orange',
        desc: 'Download a kml of the last [10] images acquired.'
      },
      {
        title: 'GeoRSS',
        url: 'georss',
        icon: 'wifi',
        color: 'green',
        desc: 'Create a georss feed of images.'
      },
      {
        title: 'Image upload',
        url: 'upload',
        icon: 'upload',
        color: 'black',
        desc: 'A place to upload images.'
      }
    ]
  }),
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
    cursor: pointer;
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
</style>