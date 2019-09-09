<template>
    <v-app id="inspire" dark>
      <!-- Banner -->
      <security-banner :security-classification=globalConfigPlaceholder.securityClassification></security-banner>

      <v-navigation-drawer v-model="drawer" app clipped mobile-break-point>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


      <v-app-bar app clipped-left dark fixed>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>



        <v-spacer></v-spacer>
        <v-img src="./assets/images/o2-logo.png" max-width="40" class="ml-2 mr-3"></v-img>
        <v-toolbar-title>Image Discovery and Analysis</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>fa-search</v-icon>
        </v-btn>

        <UserProfileSplash></UserProfileSplash>

      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>

      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
</template>

<script>
import SecurityBanner from "./components/SecurityBanner/SecurityBanner"
import UserProfileSplash from "./components/UserProfile/UserProfileSplash"

export default {
  name: 'App',
  props:{},
  components: { SecurityBanner, UserProfileSplash },
  data: () => ({
    drawer: false,
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

</style>