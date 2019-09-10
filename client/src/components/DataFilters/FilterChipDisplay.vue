<template>
  <v-row>
    <v-col>
      <h4> Applied Filters:</h4>
    </v-col>
    <v-col cols="10">
      <v-chip close v-for="n in 10">Close</v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FilterChipDisplay",
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
  methods: {}
}
</script>

<style scoped>

</style>