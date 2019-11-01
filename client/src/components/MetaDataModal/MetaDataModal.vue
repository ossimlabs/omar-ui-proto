<template>
  <div class="text-center">
    <v-menu
      v-model="metaDataModal"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fa-info-circle</v-icon>
        </v-btn>
      </template>

      <v-card max-width="800">
        <v-list>
          <v-list-item>
            <img
                @click="launchTLV(properties.id)"
                :src="getThumbnail(properties, 100)"
                class="mr-3 custom-pointer"
            >
            <v-list-item-content>
              <v-list-item-title>ID: {{ properties.id }}</v-list-item-title>
              <v-list-item-subtitle v-if="properties.access_date">{{ properties.access_date }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ properties.index_id }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ properties.filename }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-row class="px-3 my-2">
          <v-col cols="6"
           v-for="(val, key) in properties"
           :key="key"
           class="py-0 text-truncate d-inline-block subtitle-2"
          >
            <span class="blue-grey--text text--lighten-4"> {{ key }}: </span>
            <span class="success--text"> {{ val }}</span>

          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="metaDataModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import baseServices from '@/services/services'

export default {
  name: 'MetaDataModal',
  props: {
    properties: Object,
  },
  components: {},
  data: () => ({
    metaDataModal: null
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
    launchTLV (imageId) {
      baseServices.openTLVTab(imageId)
    },
  }
}
</script>

<style scoped>
.custom-pointer{
  cursor: pointer;
}
</style>
