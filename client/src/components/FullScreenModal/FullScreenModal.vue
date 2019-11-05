<template>
  <div class="text-center">
    <v-menu
      v-model="fullScreenModal"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fa-expand-arrows-alt</v-icon>
        </v-btn>
      </template>

      <v-card max-width="1200">
        <v-list>
          <v-list-item>
            <img
              @click="launchTLV(properties.id)"
              :src="getThumbnail(properties, 1200)"
              class="mr-3 custom-pointer"
            >
            <!--<v-list-item-content>
              <v-list-item-title>ID: {{ properties.id }}</v-list-item-title>
              <v-list-item-subtitle v-if="properties.access_date">{{ properties.access_date }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ properties.index_id }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ properties.filename }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            </v-list-item-action>-->
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="fullScreenModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>


<script>
import baseServices from '@/services/services'

export default {
  name: 'FullScreenModal',
  props: {
    properties: Object,
  },
  components: {},
  data: () => ({
    fullScreenModal: null
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    getThumbnail(feature, size) {
      return baseServices.returnThumbnail(feature, size)
    },
  }
}
</script>

<style scoped>

</style>
