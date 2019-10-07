<template>
  <v-col cols="10" class="">


    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dates"
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
        class="ma-0 py-0 custom-width" scrollable no-title
        v-model="dates"
        :multiple="multiple"
        :range="range"
        value="dates"
      >
        <v-container style="" class="ma-0 py-0">
          <v-row justify="center" class="" no-gutters>
            <v-col class="py-0 my-0">
              <span>{{ date_type }}: {{ dates }}</span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  v-model="exact_date"
                  v-show="calendar_type === 0"
                  label="Or type exact date"
                  placeholder="Format: YYYY-MM-DD"
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-btn-toggle v-model="calendar_type">
                <v-btn class="ma-0"><v-icon>fa-dot-circle</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon>fa-exchange-alt</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon disabled>fa-arrows-alt-h</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon>fa-braille</v-icon></v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10">
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(), addDateFilter(dates)">Add Filter</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateFilters',
  props: {},
  components: {},
  data: () => ({
    menu: false,
    calendar_type: 0,
    date_type: 'exact date',
    today: ['2019-10-07'],
    exact_date: null,
    dates: moment().format('YYYY-MM-DD'),
    multiple: false, exact:true, range: false
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
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
        this.dates = '2019-10-07'
        this.range = this.multiple = false
      } else if (index_type === 1) {
        this.dates = ['2019-10-07']
        this.range = true
        this.multiple = false
      } else if (index_type === 2) {

      } else if (index_type === 3) {
        this.dates = ['2019-10-07']
        this.multiple = true
        this.range = false
      } else {
        this.dates = '2019-10-07'
        this.range = this.multiple = false
      }

    },
    addDateFilter(dates) {
      this.$store.commit('addFilter', {category: 'date', type: 'date', value: dates})
      this.dates = null
    },
  }
}
</script>

<style scoped>
.custom-width {
  width: 300px;
}
.custom-margins {
  margin-left: -120px !important;
  margin-right: -120px !important;
}
</style>