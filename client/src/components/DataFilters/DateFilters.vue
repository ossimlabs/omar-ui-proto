<template>
  <v-col cols="10" class="">


    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      style="width:100px"
    >
      <!-- menu template -->
      <template v-slot:activator="{ on }">
        <v-combobox
          v-model="dates"
          label="Date"
          prepend-icon="fa-calendar-alt"
          readonly
          v-on="on"
        >
          <v-icon slot="prepend" color="primary">fa-calendar-alt</v-icon>
        </v-combobox>
      </template>

      <!-- date picker -->
      <v-date-picker
        class="ma-0 py-0 custom-width" scrollable no-title reactive
        v-model="dates"
        :multiple="multiple"
        :range="range"
        value="dates"
        color="primary"
        :disabled="disable_datepicker"
        :class="{'hide': disable_datepicker}"
      >
        <v-container style="" class="ma-0 py-0">
          <v-row justify="center">

            <!-- Calendar Type Buttons -->
            <!-- TODO make this a directive/component -->
            <v-col cols="10" class="mb-0 pb-0">
              <v-btn-toggle v-model="calendar_type" color="primary" active-class="green-highlight">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-0" v-on="on"><v-icon>fa-dot-circle</v-icon></v-btn>
                  </template>
                  <span>Exact Date / Time</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-0" v-on="on"><v-icon>fa-exchange-alt</v-icon></v-btn>
                  </template>
                  <span>Date Range</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-0" v-on="on" disabled><v-icon>fa-arrows-alt-h</v-icon></v-btn>
                  </template>
                  <span>Date Within</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-0" v-on="on"><v-icon>fa-braille</v-icon></v-btn>
                  </template>
                  <span>Multiple Dates</span>
                </v-tooltip>
              </v-btn-toggle>
            </v-col>

            <!-- Exact Date !Optional! -->
            <v-col cols="10" class="mb-0 mt-2 pt-2 py-0">
              <transition name="page-fade" mode="out-in">
                <v-text-field
                  v-model="user_generated_date_string"
                  v-show="calendar_type === 0"
                  label="Type exact date"
                  placeholder="YYYY-MM-DD"
                ></v-text-field>
              </transition>
            </v-col>

            <!-- Time -->
            <!-- NPM packaged time pickers.  Smaller profile, easier to use -->
            <v-col cols="10" class="mb-0 mt-2 py-0 align-content-center">
              <transition-group name="page-fade" mode="out-in">
                <vue-timepicker
                  class="mb-2"
                  v-show="calendar_type === 0 || calendar_type == null"
                  key="start_time"
                  placeholder="Start Time"
                  format="HH:mm:ss"></vue-timepicker>
                <vue-timepicker
                  v-show="calendar_type === 0 || calendar_type == null"
                  key="end_time"
                  placeholder="End Time"
                  format="HH:mm:ss"></vue-timepicker>
              </transition-group>
            </v-col>

            <!-- Ingest & Acquisition -->
            <v-col cols="10" class="my-0 py-0">
              <v-row justify="space-between" no-gutters>
                <v-checkbox
                  color="primary"
                  v-model="ingest_date"
                  label="Ingest"
                ></v-checkbox>
                <v-checkbox
                  color="primary"
                  v-model="acquisition_date"
                  label="Acquisition"
                ></v-checkbox>
              </v-row>
            </v-col>

          </v-row>

          <!-- Action Buttons -->
          <v-row justify="center">
            <v-col cols="6">
              <v-btn block elevation="4" color="error" @click="menu = false">Cancel</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block  elevation="4" color="primary" @click="$refs.menu.save(), addDateFilter(dates)">Add Filter</v-btn>
            </v-col>
          </v-row>

          <!-- Debug -->
          <v-row justify="center" class="" no-gutters>
            <v-col class="py-0 my-0">
              <h4> debugging: </h4>
              <span>{{ date_type }}: {{ dates }}</span> <br />
              <span>calendar_type {{ calendar_type }}</span>
            </v-col>
          </v-row>

        </v-container>

      </v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
import moment from 'moment'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
  name: 'DateFilters',
  props: {},
  components: { VueTimepicker },
  data: () => ({
    menu: false,
    calendar_type: null,
    date_type: 'exact date',
    acquisition_date: true, ingest_date: true,
    user_generated_date_string: '',
    dates: moment().format('YYYY-MM-DD'),
    multiple: false,
    exact:true,
    range: false,
    disable_datepicker: false
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {
    console.log('this $refs', this.$refs.menu.$refs)
    console.log('this $vuetify', this.$vuetify)
  },
  computed: {},
  watch: {
    calendar_type: function(newVal) {
      const determineDateType = (val) => {
        return val === 0 ? 'exact date'
          : val === 1 ? 'range of dates'
          : val === 2 ? 'range with starting point'
          : val === 3 ? 'multiple dates'
          : 'exact date'
      }
      this.date_type = determineDateType(newVal)
      this.switchCalendarTo(newVal)

    }
  },
  methods: {
    switchCalendarTo(index_type){

      // TODO make this better
      if (index_type === 0) {
        // this.dates = '2019-10-07'
        this.range = this.multiple = false
        this.disable_datepicker = true
      } else if (index_type === 1) {
        this.dates = ['2019-10-07']
        this.range = true
        this.multiple = this.disable_datepicker = false
      } else if (index_type === 2) {

      } else if (index_type === 3) {
        this.dates = ['2019-10-07']
        this.multiple = true
        this.range = this.disable_datepicker = false
      } else {
        this.dates = '2019-10-07'
        this.range = this.multiple = this.disable_datepicker = false
      }

    },
    addDateFilter(dates) {
      if (this.user_generated_date_string.length > 1){
        console.log('user has entered a date!')
        this.$store.commit('addFilter', {category: 'date', type: 'date', value: this.user_generated_date_string})
      } else {
        this.$store.commit('addFilter', {category: 'date', type: 'date', value: dates})
      }

      this.dates = moment().format('YYYY-MM-DD')
    },
  }
}
</script>
<style scoped>
.hide {
  display: white;
}
.custom-width {
  width: 300px;
}
.green-highlight:before {
  opacity: .85 !important;
}

.page-fade-enter-active, .page-fade-leave-active {
  transition: all .3s ease;
}
.page-fade-enter, .page-fade-leave-to
  /* .page-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  margin-top: -100px;
}
</style>

<style>
  /*No scope for nested vuetify calendar targets*/
  .v-date-picker-table {
    height: auto !important;
  }
</style>