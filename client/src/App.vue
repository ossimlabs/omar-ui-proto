<template>
  <div id="app">
    <b-alert show variant="warning" class="text-center">
      <i class="fas fa-exclamation-triangle mr-3"></i>
      App is in development...
      <i class="fas fa-exclamation-triangle ml-3"></i>
    </b-alert>

    <Top-Nav></Top-Nav>
    <router-view/>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav/TopNav'
import SecurityBanner from '@/components/SecurityBanner/SecurityBanner'

export default {
  name: 'App',
  props: {},
  components: {TopNav, SecurityBanner},
  data () {
    return {}
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

</style>
