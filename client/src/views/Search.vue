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
    // this will fix the but where no qs provided throws 500 error.
    function determineFilter(params) {
      let parsedQS = qs.parse(params)
      return Object.keys(parsedQS).length === 0 ? '' : parsedQS.filter
    }

    // Launch WFSQuery once component is created
    let imageryQuery = baseServices.WFSQuery(0, 100, determineFilter(this.$route.params.qs))
      .then((res) => {
        return res.data.features
      })

    let videoQuery = baseServices.initialVideoQuery()
      .then((res) => {
        return res.data.features
      })

    Promise.all([imageryQuery, videoQuery]).then(values => {
      this.allResults = values.flat()
      console.log('this.allResults', this.allResults)
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
      // TODO: fix bug here...
      this.$router.push('/search')

      baseServices.WFSQuery(0, 100, baseServices.generateFilter(newFilter))
        .then((res) => {
          this.wfsFeatureArray = res.data.features
          // append results to allResults
          this.allResults = res.data.features
          console.log('results', this.allResults)
        })
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>