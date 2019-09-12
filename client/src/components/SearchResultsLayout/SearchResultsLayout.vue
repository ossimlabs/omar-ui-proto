<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn icon @click="view = 'gallery'">
          <v-icon>fa-th</v-icon>
        </v-btn>Gallery View
        <v-btn icon @click="view = 'list'">
          <v-icon>fa-th-list</v-icon>
        </v-btn>List View
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap">
      <v-card
        ripple outlined elevation="4" width="350" class="ma-2"
        v-for="n in 7"
        :key="n"
      >
        <v-system-bar color="green" class="custom-transparency text-center text-uppercase" absolute>
          Classification
        </v-system-bar>

        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title class="align-end fill-height">I'm a title</v-card-title>
        </v-img>

        <v-card-text>I'm card text</v-card-text>

        <v-card-actions class="my-0 py-0" v-show="view === 'gallery'">
          <v-btn icon><v-icon>fa-arrows-alt</v-icon></v-btn>
          <v-btn icon><v-icon>fa-border-all</v-icon></v-btn>
          <v-btn icon><v-icon>fa-history</v-icon></v-btn>
          <v-btn icon><v-icon>fa-wrench</v-icon></v-btn>
        </v-card-actions>

        </v-card>
      </div>
  </v-container>
</template>

<script>
export default {
  name: 'SearchResultsLayout',
  props: {},
  components: {},
  data: () => ({
    view: 'gallery'
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

.custom-transparency {
  opacity: 0.75;
}
</style>