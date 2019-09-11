<template>
  <v-row>
    <v-col>
      <h4> Applied Filters:</h4>
    </v-col>
    <v-col cols="10">
      <v-chip
        close
        v-for="filter in filters"
        :key="filter"
        @click:close="remove(filter)"
      > {{ filter }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FilterChipDisplay",
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
      return this.$store.state.filters
    }
  },
  watch: {},
  methods: {
    remove (keyword) {
      this.$store.commit('removeFilter', keyword)
    },
  }
}
</script>

<style scoped>

</style>