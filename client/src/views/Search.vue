<template>
  <v-container fluid>
    <FilterChipDisplay></FilterChipDisplay>
    <SearchResultsLayout></SearchResultsLayout>
  </v-container>
</template>

<script>
import FilterChipDisplay from '@/components/DataFilters/FilterChipDisplay'
import SearchResultsLayout from '@/components/SearchResultsLayout/SearchResultsLayout'
import baseServices from '@/services/services'

export default {
  name: 'Search',
  props: {},
  components: { FilterChipDisplay, SearchResultsLayout },
  data: () => ({
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {
    baseServices.initalWFSQuery()
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>