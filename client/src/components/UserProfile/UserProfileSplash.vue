<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fa-user</v-icon>
        </v-btn>
      </template>

      <v-card class="">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://ca.slack-edge.com/TC9GHPX6G-WJ4C9H529-67afd8b8edf4-512" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Matthew Esterberg</v-list-item-title>
              <v-list-item-subtitle>Software Developer</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>fa-star</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-btn>
              Update Preferences
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="menu = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'UserProfileSplash',
  props: {},
  components: {},
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
.custom-top-margin {
  margin-top:5em;
}
</style>