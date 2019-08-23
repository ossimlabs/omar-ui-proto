<template>
  <div id="app">
    <b-alert show variant="warning" class="text-center">App is in development...</b-alert>

    <top-nav></top-nav>
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
