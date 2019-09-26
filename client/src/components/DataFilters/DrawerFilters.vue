<template>
  <v-container fluid>
    <v-row row pa-1>
      <v-col cols="2"><v-icon>fa-filter</v-icon></v-col>
      <v-col><h4> Filters </h4></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="10" class="my-0 py-0">

        <!-- Magic Box -->
        <v-form @submit="doMagic(magicword)">
          <v-text-field
            prepend-icon="fa-hat-wizard"
            label="Magic word"
            v-model="magicword"
            clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <v-icon slot="prepend" color="warning">fa-hat-wizard</v-icon>
          </v-text-field>
        </v-form>

      </v-col>

      <!-- Keyword or ID -->
      <v-col cols="10" class="my-0 py-0">
        <v-expansion-panels flat>
          <v-expansion-panel flat>
            <v-expansion-panel-header>
              <v-row no-gutters>
                <v-cols cols="4">
                  <v-form @submit="addKeywordFilter(keyword)">
                    <v-text-field
                        prepend-icon="fa-font"
                        label="ID or keyword"
                        v-model="keyword"
                        clearable
                    >
                      <!-- Added icon slot for custom color choosing -->
                      <v-icon slot="prepend" color="success">fa-font</v-icon>
                    </v-text-field>
                  </v-form>
                </v-cols>

                <v-col cols="8" class="text--secondary"></v-col>

              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox class="pa-0 ma-0" label="mission_id" value="mission_id"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="title" value="title"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="product_id" value="product_id"></v-checkbox>
              <v-checkbox class="pa-0 ma-0" label="target_id" value="target_id"></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <!-- Date -->
      <v-col cols="10" class="my-0 py-0">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          width="290px"
          @keydown.enter="$refs.dialog.save(date), addDateFilter(date)"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Start Date"
              readonly
              v-on="on"
              @keydown.esc="modal = false"
            >
              <!-- Added icon slot for custom color choosing -->
              <v-icon slot="prepend" color="primary">fa-calendar-alt</v-icon>
            </v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(), addDateFilter(date)">OK</v-btn>
            <!-- $refs.dialog.save(date) to keep date within input box -->
          </v-date-picker>
        </v-dialog>
      </v-col>

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
export default {
  name: 'DrawerFilters',
  props: {},
  components: {},
  data: () => ({
    magicword: null,
    keyword: null,
    date: null,
    modal: null,
    menu: false,
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
    doMagic(magicword) {
      this.$store.commit('addFilter', {type: 'magicword', value: magicword})
      this.magicword = null
    },
    addKeywordFilter(keyword) {
      this.$store.commit('addFilter', {type: 'keyword', value: keyword})
      this.keyword = null
    },
    addDateFilter(date) {
      this.$store.commit('addFilter', {type: 'date', value: date})
      this.date = null
    },
    addSensorFilter(sensor) {
      this.$store.commit('addFilter', {type: 'sensor', value: sensor})
    },
    removeSensorFromDropDown (sensor) {
      this.$store.commit('removeFromDropDown', {type: 'sensor', value: sensor})
    }
  }
}
</script>

<style scoped>

</style>