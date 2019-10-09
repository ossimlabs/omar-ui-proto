<template>
  <v-container fluid>
    <v-row pa-1>
      <v-col><h3 color="green"> Filters </h3></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="10" class="mt-2 mb-0 py-0">
        <!-- panel controls the expansion panel's visibility -->
        <!-- set to stay open on text box click and close when a value is submitted -->
        <v-form @submit="addKeywordFilter(keyword)">
          <v-text-field
            @click="panelToggle('open')"
            prepend-icon="fa-font"
            label="Keyword / ID"
            hint="Defaults to Image Id"
            v-model="keyword"
            clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <!-- custom click action for FF30.  Avoids nested v-component issues -->
            <v-icon slot="prepend" color="success">fa-font</v-icon>
            <v-icon slot="append" color="success" @click="panelToggle()">fa-caret-down</v-icon>
          </v-text-field>
        </v-form>
      </v-col>
      <!-- Keyword or ID -->
      <v-col cols="10" class="my-0 py-0">
        <v-expansion-panels class="elevation-0" v-model="id_dropdown_panel" multiple>
          <v-expansion-panel class="remove-shadow" >
            <v-expansion-panel-content class="pt-4 ml-4 elevation-1">
              <v-checkbox class="pa-0 ma-0" label="Image Id" v-model="image_id"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="Mission Id" v-model="mission_id"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="Product Id" v-model="product_id"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="Target Id" v-model="target_id"></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <DateFilters></DateFilters>

      <!-- Sensor -->
      <v-col cols="10" class="my-0 py-0">
        <v-form>
          <v-select
            :items="allSensors"
            label="Sensors"
            flat
            append-outer-icon
          >
            <template v-slot:item="{ item }">
              <v-list-item
                ripple
                @click="addSensorFilter( item ), removeSensorFromDropDown( item )"
              >
                {{ item }}
              </v-list-item>
            </template>
            <v-icon slot="prepend" color="cyan darken-2">fa-crosshairs</v-icon>
          </v-select>
        </v-form>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import DateFilters from '@/components/DataFilters/DateFilters'

export default {
  name: 'DrawerFilters',
  props: {},
  components: { DateFilters },
  data: () => ({
    id_dropdown_panel:[1],
    mission_id: false, product_id: false, target_id: false, image_id: true,
    keyword: null,
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {
    filters () {
      return this.$store.state.filters
    },
    allSensors () {
      return this.$store.state.allSensors
    }
  },
  watch: {},
  methods: {
    addKeywordFilter(keyword) {
      if (this.image_id) {this.$store.commit('addFilter', {category: 'id', type: 'image_id', value: keyword})}
      if (this.mission_id) {this.$store.commit('addFilter', {category: 'id', type: 'mission_id', value: keyword})}
      if (this.product_id) {this.$store.commit('addFilter', {category: 'id', type: 'product_id', value: keyword})}
      if (this.target_id) {this.$store.commit('addFilter', {category: 'id', type: 'target_id', value: keyword})}

      this.keyword = null
    },
    addSensorFilter(sensor) {
      this.$store.commit('addFilter', {category: 'sensor', type: 'sensor_id', value: sensor})
    },
    removeSensorFromDropDown (sensor) {
      this.$store.commit('removeFromDropDown', {category: 'sensor', type: 'sensor_id', value: sensor})
    },
    panelToggle() {
      // 0 = open panel
      // 1 = close panel
      return this.id_dropdown_panel.includes(0) ? this.id_dropdown_panel = [1] : this.id_dropdown_panel = [0]
    }
  }
}
</script>

<style scoped>
.custom-border {
  border:1px solid black
}
.remove-shadow::before {
  box-shadow: none !important;
}
</style>