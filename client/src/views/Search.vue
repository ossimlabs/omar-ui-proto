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
import qs from 'qs'

export default {
  name: 'Search',
  props: {},
  components: { FilterChipDisplay, SearchResultsLayout },
  data: () => ({
    allResults: [],
    wfsFeatureArray: null,
    thumbnails: null,
    wfsResponse: ''
  }),
  created () {
    // If the user is coming here with params... /search/{ params }
    function arrivingFromSimplifiedView(params) {
      let parsedQS = qs.parse(params)
      return Object.keys(parsedQS).length === 0 ? '' : parsedQS.filter
    }

    // Launch WFSQuery once component is created
    let imageryQuery = baseServices.WFSQuery(0, 100, arrivingFromSimplifiedView(this.$route.params.qs))
    let videoQuery = baseServices.videoQuery()

    Promise.all([imageryQuery, videoQuery]).then(values => {
      this.allResults = values.flat()
    });
  },
  destroyed () {},
  mounted () {},
  computed: {
    // Load allFilters from the global $store
    allFilters () {
      return this.$store.state.allFilters
    }
  },
  watch: {
    // Watch allFilters.  If it changes (a user adds or deletes search criteria) then...
    // rerun WFSQuery with new params
    allFilters: function(newFilter) {
      // Go back to /search url
      // This eliminates user querystrings from remaining in the url after new search criteria.
      this.$router.push('/search').catch(err => {})

      // Special things for video filter
      let imageryQuery = baseServices.WFSQuery(0, 100, baseServices.generateImageryFilter(newFilter))
      let videoQuery = baseServices.videoQuery(0, 100, baseServices.generateVideoFilter(newFilter))

      Promise.all([imageryQuery, videoQuery]).then(values => {
        this.allResults = values.flat()
        console.log('this.allResults', this.allResults)
      });

    }
  },
  methods: {}
}
</script>

<style scoped>

</style>