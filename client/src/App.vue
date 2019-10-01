<template>
    <v-app id="inspire" dark>
      <!-- Banner -->
      <security-banner :security-classification=globalConfigPlaceholder.securityClassification></security-banner>

      <!-- Drawer -->
      <v-navigation-drawer v-model="drawer" app clipped width="300" mobile-break-point>
        <DrawerFilters></DrawerFilters>
      </v-navigation-drawer>

      <!-- Top Bar -->
      <v-app-bar app clipped-left dark dense>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon :style="drawer ? 'color: green' : 'color: white'">fa-filter</v-icon>
        </v-btn>

        <!-- Magic Box -->
        <v-form @submit="doMagic(magicword)" class="mt-5 ml-5">
          <v-text-field
              label="Location and Image ID"
              v-model="magicword"
              clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <v-icon slot="prepend" color="warning">fa-search</v-icon>
          </v-text-field>
        </v-form>

        <v-spacer></v-spacer>

        <router-link to="/">
          <img src="./assets/images/o2-logo.png" width="40" class="ml-2 mr-3 mt-1"/>
        </router-link>
        <h2 class=""> Image Discovery and Analysis </h2>

        <v-spacer></v-spacer>

        <UserProfileSplash></UserProfileSplash>



      </v-app-bar>
      <!-- Content Area -->
      <v-content>
        <v-container fluid fill-height pa-0>
          <v-row no-gutters>
            <!--<v-col :class="{ fixed: isFixed }" class="pt-0 mt-2 mx-2">
              <v-expansion-panels class="elevation-5">
                <v-expansion-panel >
                  <v-expansion-panel-header>Filters</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>-->

            <transition name="page-fade" mode="out-in">
              <v-col cols="12">
                <router-view></router-view>
              </v-col>
            </transition>
          </v-row>

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
    },
    magicword: null,
    isFixed: false,
    //
  }),
  created () {
    // window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll);
  },
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    handleScroll (event) {
      // let stickyTop = this.$refs.filterBar.offset().top

      console.log('window', window)
      if (window.scrollY >= 19) {
        this.isFixed = true
        console.log('at the top!')
      } else {
        this.isFixed = false
      }
      // console.log('event', event)
      // Any code to be executed when the window is scrolled
    },
    doMagic(magicword) {
      this.$store.commit('addFilter', {category: 'word', type: 'magicword', value: magicword})
      this.magicword = null
    },
  }
};
</script>

<style scoped>
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