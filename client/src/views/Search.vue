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
    // Launch WFSQuery once component is created
    baseServices.WFSQuery()
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
      // const ddString = (newval.length > 0) ? newval[0].value : ''
      console.log('newFilter', newFilter)

      baseServices.WFSQuery(0, 100, baseServices.generateFilter(newFilter))
        .then((res) => {
          this.wfsFeatureArray = res.data.features
          // append results to allResults
          this.allResults = res.data.features
        })
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>

https://omar-dev.ossim.io/omar-wfs/wfs?&maxFeatures=10&outputFormat=JSON&request=GetFeature&service=WFS&startIndex=0&typeName=omar%3Araster_entry&version=1.1.0&sortBy=acquisition_date%20%3AD&filter=INTERSECTS(ground_geom,POINT(-95.37339805178331+29.8403984713433))+OR+title+LIKE+%27%2575aaab8151c541fc94ac906a6f980e9670ba85d92eade627945c7d2a0c7fcf36%25%27
https://omar-dev.ossim.io/omar-wfs/wfs?&maxFeatures=10&outputFormat=JSON&request=GetFeature&service=WFS&startIndex=0&typeName=omar%3Araster_entry&version=1.1.0&sortBy=acquisition_date%20%3AD&filter=title+LIKE+%27%25A%25%27+AND+country_code+LIKE+%27%25US%25%27