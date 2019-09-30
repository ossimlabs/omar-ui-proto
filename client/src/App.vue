<template>
    <v-app id="inspire" dark>
      <!-- Banner -->
      <security-banner :security-classification=globalConfigPlaceholder.securityClassification></security-banner>

      <!-- Drawer -->
      <v-navigation-drawer v-model="drawer" app clipped width="300" mobile-break-point>
        <DrawerFilters></DrawerFilters>
      </v-navigation-drawer>

      <!-- Top Bar -->
      <v-app-bar app clipped-left dark fixed>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon :style="drawer ? 'color: green' : 'color: white'">fa-filter</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <router-link to="/">
          <v-img src="./assets/images/o2-logo.png" max-width="40" class="ml-2 mr-3"></v-img>
        </router-link>
        <v-toolbar-title>Image Discovery and Analysis</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>fa-search</v-icon>
        </v-btn>
        <UserProfileSplash></UserProfileSplash>
      </v-app-bar>

      <!-- Content Area -->
      <v-content>
        <v-container fluid>
          <!--<v-row>
            <v-col cols="12">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Filters</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>-->

          <transition name="page-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-container>
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

export default {
  name: 'App',
  props: {},
  components: { DrawerFilters, SecurityBanner, UserProfileSplash },
  data: () => ({
    drawer: true,
    globalConfigPlaceholder: {
      securityClassification: {
        classification: 'Unclassified',
        backgroundColor: 'green',
        textColor: 'white',
      }
    }
    //
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style scoped>
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity .3s ease;
}
.page-fade-enter, .page-fade-leave-to
  /* .page-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>