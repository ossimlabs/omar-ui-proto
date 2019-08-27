<template>
  <div class="custom-animation">
    <h1>Search Page1</h1>
    <h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1>
    <h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1><h1>Search Page</h1>

  </div>
</template>

<script>
import HorizontalFilters from "@/components/Filters/HorizontalFilters"

export default {
  name: "SearchPageView",
  props: {},
  components: {HorizontalFilters},
  data () {
    return {
      sidebar: true
    }
  },
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
  .custom-animation {
    transition: all .5s;
  }
</style>
