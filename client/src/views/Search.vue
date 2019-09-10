<template>
  <v-container fluid>
<!--    <v-row align-start justify-start>-->
    <FilterChipDisplay></FilterChipDisplay>
  </v-container>
</template>

<script>
import FilterChipDisplay from "../components/DataFilters/FilterChipDisplay"
export default {
  name: "Search",
  props: {},
  components: {FilterChipDisplay},
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