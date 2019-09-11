<template>
  <v-container fluid>
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