<template>
  <v-btn
    absolute
    dark
    fab
    bottom
    right
    color="green"
    @click="toTheTop"
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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>

</style>