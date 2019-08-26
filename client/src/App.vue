<template>
  <div id="app">
    <b-alert show dismissible fade variant="warning" class="text-center mb-0">
      <i class="fas fa-exclamation-triangle mr-3"></i>
      App is in development...
      <i class="fas fa-exclamation-triangle ml-3"></i>
    </b-alert>

    <div class="banner-and-nav sticky-top">
      <SecurityBanner :security-classification=securityClassification></SecurityBanner>

      <b-navbar class="border-bottom shadow-sm gray-800">

        <button type="button" id="sidebarCollapse" @click="sidebar = !sidebar" v-if="$route.name === 'SearchPageView'">
          <i class="fas fa-bars"></i>
        </button>

        <b-navbar-brand class="ml-3" to="#">
          <img src="@/assets/images/o2-logo.png" width="40"/>
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              <i class="fas fa-search"></i>
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><i class="fas fa-server"></i></template>
            <b-dropdown-item href="#">Preferences</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><i class="fas fa-user"></i></template>
            <b-dropdown-item href="#">Preferences</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>

<!--    <b-container>-->
      <b-row class="no-gutters">
        <b-col cols="4" v-show="sidebar">
          <SideBar></SideBar>
        </b-col>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
<!--    </b-container>-->

  </div>
</template>

<script>
import SecurityBanner from '@/components/SecurityBanner/SecurityBanner'
import SideBar from "@/components/SideBar/SideBar"

export default {
  name: 'App',
  props: {},
  components: {SideBar, SecurityBanner},
  data () {
    return {
      sidebar: null,
      securityClassification: {
        backgroundColor: 'green',
        textColor: 'white',
        classification: 'Unclassified'
      }
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

</style>
