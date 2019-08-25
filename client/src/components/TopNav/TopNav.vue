<template>
  <div class="sticky-top">
    <SecurityBanner :security-classification=securityClassification></SecurityBanner>
    <b-navbar type="light" variant="light" class="border-bottom shadow-sm">
      <b-navbar-brand class="custom-brand" to="#">
        <img
          src="@/assets/images/o2-logo.png"
        />
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
</template>

<script>
import SecurityBanner from '@/components/SecurityBanner/SecurityBanner'
export default {
  name: 'TopNav',
  props: {},
  components: {SecurityBanner},
  data () {
    return {
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
.custom-brand {
  position: absolute;
  left: 10px;
  top: 0;
}
</style>
