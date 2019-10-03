<template>
  <v-btn
    fixed
    dark
    fab
    bottom
    right
    color="green"
    @click="toTheTop()"
  >
    <v-icon>fa-caret-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'FloatingActionButton',
  props: {},
  components: {},
  data: () => ({
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    toTheTop() {
      this.$vuetify.goTo('#to-the-top-target')
    }
  }
}
</script>

<style scoped>

</style>