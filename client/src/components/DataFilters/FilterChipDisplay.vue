<template>
  <v-row>
    <v-col cols="2">
      <h4>Active Filters:</h4>
    </v-col>
    <v-col>
      <v-chip
        class="mb-1 ml-1 mr-1"
        close
        v-for="filter in filters"
        :key="filter.value"
        @click:close="remove(filter)"
        :color="determineType(filter.type)"
      > {{ filter.value }}
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
    determineType(type){
      // object literal to replace ugly case statement
      const chipColor = (type) => ({
        'magicword': 'warning',
        'keyword': 'success',
        'date': 'primary',
        'sensor': 'cyan darken-2'
      })[type]
      return chipColor(type)
    },
    remove (keyword) {
      // If removing a sensor, add it back to the $state.allSensors
      if (keyword.type === 'sensor') {
        this.$store.commit('addToDropDown', keyword)
      }
      this.$store.commit('removeFilter', keyword)
    },
  }
}
</script>

<style scoped>

</style>