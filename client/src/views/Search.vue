<template>
  <v-container fluid>
    <FilterChipDisplay></FilterChipDisplay>
    <SearchResultsLayout
      :wfsFeatureArray = "wfsFeatureArray"
      :allResults = "allResults">
    </SearchResultsLayout>

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
    allResults: [],
    wfsFeatureArray: null,
    videoFeatureArray: null,
    thumbnails: null,
    wfsResponse: 'empty'
  }),
  created () {
    // Launch this query asap.  Limited to 100 results.

    baseServices.initalWFSQuery()
      .then((res) => {
        this.wfsFeatureArray = res.data.features
        // append results to allResults
        this.allResults = this.allResults.concat(res.data.features)
      })
    // baseServices.initialVideoQuery()
    //   .then((res) => {
    //     this.videoFeatureArray = res.data.features
    //     // append results to allResults
    //     this.allResults = this.allResults.concat(res.data.features)
    //   })
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