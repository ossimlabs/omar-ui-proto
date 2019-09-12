<template>
  <v-container fluid>
    <FilterChipDisplay></FilterChipDisplay>
    <SearchResultsLayout></SearchResultsLayout>
    <pre>
      Response {{ this.wfsRawResponse }}
    </pre>
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
    wfsRawResponse: 'empty'
  }),
  created () {
    this.wfsRawResponse = baseServices.initalWFSQuery()
  },
  destroyed () {},
  mounted () {

  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>