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
          :label="'Choose ' + date_type "
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
      >
        <v-container style="" class="ma-0 py-0">
          <v-row justify="center" class="" no-gutters>
            <v-col class="py-0 my-0">
              <span>Range {{ range }} </span> <br/>
              <span>Multiple {{ multiple }}</span> <br />
              <span>dates: {{ dates }}</span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn-toggle v-model="calendar_type">
                <v-btn class="ma-0"><v-icon>fa-dot-circle</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon>fa-exchange-alt</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon>fa-arrows-alt-h</v-icon></v-btn>
                <v-btn class="ma-0"><v-icon>fa-braille</v-icon></v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col>
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
export default {
  name: 'DateFilters',
  props: {},
  components: {},
  data: () => ({
    menu: false,
    calendar_type: 0,
    date_type: null,
    today: ['2019-10-07'],
    dates: '2019-10-07',
    // dates: ['2018-09-15', '2018-09-20'],
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
          : 'exact'
      }
      this.date_type = determineDateType(newVal)
      this.switchCalendarTo(newVal)
      console.log('date_type', determineDateType(newVal))
    }
  },
  methods: {
    switchCalendarTo(index_type){

      // TODO make this better
      if (index_type === 0) {
        this.range = this.multiple = false
        this.dates = '2019-10-07'
      } else if (index_type === 1) {
        this.range = true
        this.multiple = false
        this.dates = ['2019-10-07']
      } else if (index_type === 2) {

      } else if (index_type === 3) {
        this.multiple = true
        this.range = false
        this.dates = ['2019-10-07']
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