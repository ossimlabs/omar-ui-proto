<template>
  <v-col cols="10" class="">
    <v-menu
      ref="date_picker_modal"
      v-model="date_picker_modal"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <!-- Input box  -->
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

      <!-- Date picker -->
      <v-date-picker
        class="custom-width elevation-0" scrollable no-title reactive
        v-model="dates"
        :multiple="multiple"
        :range="range"
        value="dates"
        color="primary"
        :disabled="disable_datepicker"
      >
      </v-date-picker>

      <!-- Date Picker Tools area -->
      <v-container class="date-filters-bg py-2">
        <v-divider class="mt-1 mb-2"></v-divider>

        <!-- Calendar Type Buttons -->
        <!-- TODO make this a directive/component -->
        <v-row justify="center" class="mb-2 ">
          <v-btn-toggle v-model="date_picker_type" color="primary" active-class="green-highlight">
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
        </v-row>

        <!-- Exact Date !Optional! -->
        <v-row justify="space-around">
          <v-col cols="8" class="mb-0 mt-2 pt-2 py-0">
            <transition name="page-fade" mode="out-in">
              <v-text-field
                v-model="user_generated_date_string"
                v-show="date_picker_type === 0"
                label="Type exact date"
                placeholder="YYYY-MM-DD"
              ></v-text-field>
            </transition>
          </v-col>
        </v-row>

        <!-- Time !Optional! -->
        <!-- NPM packaged time pickers.  Smaller profile, easier to use -->
        <v-row justify="space-around">
          <vue-timepicker
            close-on-complete
            v-model="start_time"
            class="mr-2"
            v-show="date_picker_type === 0 || date_picker_type == null"
            placeholder="Start Time"
            format="HH:mm:ss"></vue-timepicker>
          <vue-timepicker
            close-on-complete
            v-model="end_time"
            v-show="date_picker_type === 0 || date_picker_type == null"
            placeholder="End Time"
            format="HH:mm:ss"></vue-timepicker>
        </v-row>

        <!-- Ingest & Acquisition !Optional! -->
        <v-row justify="space-around">
          <v-checkbox
            color="primary"
            v-model="search_ingest"
            label="Ingest"
          ></v-checkbox>
          <v-checkbox
            color="primary"
            v-model="search_acquisition"
            label="Acquisition"
          ></v-checkbox>
        </v-row>

        <!-- Action Buttons -->
        <v-row justify="center">
          <v-col cols="6">
            <v-btn block elevation="4" color="error" @click="date_picker_modal = false">Cancel</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block  elevation="4" color="primary" @click="$refs.date_picker_modal.save(), addDateFilter(dates)">Add Filter</v-btn>
          </v-col>
        </v-row>
      </v-container>

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
    date_picker_modal: false,
    date_picker_type: null,
    date_type: 'single',
    start_time: null, end_time: null,
    search_acquisition: true, search_ingest: true,
    user_generated_date_string: '',
    dates: moment().format('YYYY-MM-DD'),
    multiple: false, exact: true, range: false,
    disable_datepicker: false
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {
    date_picker_type: function(newVal) {
      const determineDateType = (val) => {
        return val === 0 ? 'user_typed'
          : val === 1 ? 'range'
          : val === 2 ? 'range with starting point'
          : val === 3 ? 'multiple'
          : 'single'
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
      this.$store.commit('addFilter',
        { category: 'date',
        type: this.date_type,
        search_ingest: this.search_ingest,
        search_acquisition: this.search_acquisition,
        value: dates }
      )

      // Resets
      this.user_generated_date_string = ''
      this.date_picker_type = null
      this.start_time = this.end_time = '00:00:00'
      this.dates = moment().format('YYYY-MM-DD')
    },
  }
}
</script>
<style scoped>
.date-filters-bg {
  background-color: #424242;
}

.custom-width {
  width: 350px;
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


.datepicker-fade-enter-active, .datepicker-fade-leave-active {
  transition: all .3s ease-in-out;
}
.datepicker-fade-enter, .datepicker-fade-leave-to
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