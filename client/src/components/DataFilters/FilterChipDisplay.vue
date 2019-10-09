<template>
  <v-row>
    <v-col cols="2">
      <h4 v-show="filters.length > 0">Active Filters:</h4>
    </v-col>
    <v-col>
      <v-chip
        class="mb-1 ml-1 mr-1"
        close
        v-for="filter in filters"
        :key="filter.type + ':' + filter.value"
        @click:close="remove(filter)"
        :color="determineColor(filter.category)"
      >
        <v-icon class="mr-2">{{ determineIcon(filter.category) }}</v-icon>
        <span>{{ determineStyleForValues(filter) }}</span>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FilterChipDisplay',
  props: {},
  components: {},
  data: () => ({
    //
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {
    filters () {
      return this.$store.state.allFilters
    }
  },
  watch: {},
  methods: {
    determineStyleForValues(filter) {

      if (filter.category === 'date') {

      }
      return filter.value
    },
    determineIcon(category){
      // object literal to replace ugly case statement
      const chipColor = (category) => ({
        'magicword': 'fa-search',
        'id': 'fa-font',
        'date': 'fa-calendar-alt',
        'sensor': 'fa-crosshairs'
      })[category]
      return chipColor(category)
    },
    determineColor(category){
      // object literal to replace ugly case statement
      const chipColor = (category) => ({
        'magicword': 'warning',
        'id': 'success',
        'date': 'primary',
        'sensor': 'cyan darken-2'
      })[category]
      return chipColor(category)
    },
    remove (keyword) {
      // If removing a sensor, add it back to the $state.allSensors
      if (keyword.type === 'sensor_id') {
        this.$store.commit('addToDropDown', keyword)
      }
      this.$store.commit('removeFilter', keyword)
    },
  }
}
</script>

<style scoped>

</style>