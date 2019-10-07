<template>
    <v-app id="inspire" dark>
      <!-- Banner -->
      <security-banner :security-classification=globalConfigPlaceholder.securityClassification></security-banner>

      <!-- Drawer -->
      <v-navigation-drawer v-model="drawer" app clipped width="300" mobile-break-point>
        <DrawerFilters></DrawerFilters>
      </v-navigation-drawer>

      <!-- Top Bar -->
      <v-app-bar app clipped-left dark src="./assets/images/aerial_rs_65px.jpg">
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(48,48,48,.8), rgba(48,48,48,1)"
          ></v-img>
        </template>

        <!-- leave this if we move main page splash to tabbed items on the header -->
        <!--<template v-slot:extension>
          <v-tabs
              align-with-title
              background-color="transparent"
          >
            <v-tab>Tab 1</v-tab>
            <v-tab>Tab 2</v-tab>
            <v-tab>Tab 3</v-tab>
          </v-tabs>
        </template>-->

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon :style="drawer ? 'color: green' : 'color: white'">fa-filter</v-icon>
        </v-btn>

        <!-- Magic Box -->
        <v-form @submit="doMagic(magicword)" class="mt-5 ml-5">
          <v-text-field
            autofocus
            label="Location / Image ID"
            v-model="magicword"
            clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <v-icon slot="prepend" color="warning">fa-search</v-icon>
          </v-text-field>
        </v-form>

        <v-spacer></v-spacer>

        <router-link to="/" class="push-left">
          <img src="./assets/images/o2-logo.png" width="40" class="mr-3 mt-1"/>
        </router-link>
        <h2 class=""> Image Discovery and Analysis </h2>

        <v-spacer></v-spacer>

        <UserProfileSplash></UserProfileSplash>
      </v-app-bar>

      <!-- Content Area -->
      <v-content>
        <transition name="page-fade" mode="out-in">
            <router-view></router-view>
        </transition>

        <FloatingActionButton></FloatingActionButton>
      </v-content>

      <!-- Footer -->
      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
</template>

<script>
import SecurityBanner from '@/components/SecurityBanner/SecurityBanner'
import UserProfileSplash from '@/components/UserProfile/UserProfileSplash'
import DrawerFilters from '@/components/DataFilters/DrawerFilters'
import FloatingActionButton from '@/components/FloatingActionButton/FloatingActionButton'

export default {
  name: 'App',
  props: {},
  components: { DrawerFilters, SecurityBanner, UserProfileSplash, FloatingActionButton },
  data: () => ({
    drawer: true,
    globalConfigPlaceholder: {
      securityClassification: {
        classification: 'Unclassified',
        backgroundColor: 'green',
        textColor: 'white',
      }
    },
    magicword: null,
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    doMagic(magicword) {
      this.$store.commit('addFilter', {category: 'magicword', type: 'magicword', value: magicword})
      this.magicword = null
    },
  }
};
</script>

<style scoped>
.push-left {
  margin-left: -100px;
}
.fixed {
  top: 72px;
  z-index:4;
  position: fixed;
  width: 100%;
}
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity .3s ease;
}
.page-fade-enter, .page-fade-leave-to
  /* .page-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>