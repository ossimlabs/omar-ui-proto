<template>
  <v-container fluid>
    <span> {{ this.$route.params }}</span>
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
    videoFeatureArray: null,
    thumbnails: null,
    wfsResponse: 'empty'
  }),
  created () {
    // If the user is coming here with params... /search/{ params }
    let parsedQS = {}
    if (this.$route.params.qs) {
      // console.log('user has params', this.$route.params.qs)
      // console.log(qs.parse(this.$route.params.qs))
      parsedQS = qs.parse(this.$route.params.qs)
    }

    console.log('parsedQS', parsedQS)
    // Launch WFSQuery once component is created
    baseServices.WFSQuery(0, 100, encodeURI(parsedQS.filter))
      .then((res) => {
        // this.wfsFeatureArray = res.data.features
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
  computed: {
    // Load allFilters from the $global store
    allFilters () {
      return this.$store.state.allFilters
    }
  },
  watch: {
    // Watch allFilters.  If it changes (a user adds or deletes search criteria) then...
    // rerun WFSQuery with new params
    // oldVal and newVal contain the unaltered filter object which is generated within the app
    // TODO: iterate over all KVPs and generate the proper query string
    allFilters: function(oldFilter, newFilter) {
      console.log('newFilter', newFilter)

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