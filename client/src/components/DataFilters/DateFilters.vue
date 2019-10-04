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
      <v-date-picker class="ma-0 py-0" style="width:300px" v-model="dates" :multiple="multiple" :range="range" scrollable no-title readonly>
        <v-container style="" class="ma-0 py-0">
          <v-row justify="center" class="" no-gutters>
            <v-col class="py-0 my-0">
              <span>Choose {{ date_type }} </span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn-toggle v-model="toggle_date_type">
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
              <v-btn text color="primary" @click="$refs.menu.save(), addDateFilter(dates)">OK</v-btn>
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
    toggle_date_type: 2,
    date_type: 'exact',
    dates: ['2018-09-15', '2018-09-20'],
    multiple: true, exact:false, range: false
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {
    toggle_date_type: function(newVal) {
      const determineDateType = (val) => {
        return val === 0 ? 'exact date'
          : val === 1 ? 'range of dates'
          : val === 2 ? 'range with starting point'
          : val === 3 ? 'multiple dates'
          : 'exact'
      }
      this.date_type = determineDateType(newVal)
      console.log('date_type', determineDateType(newVal))
    }
  },
  methods: {
    addDateFilter(dates) {
      this.$store.commit('addFilter', {category: 'date', type: 'date', value: dates})
      this.dates = null
    },
  }
}
</script>

<style scoped>
.custom-margins {
  margin-left: -120px !important;
  margin-right: -120px !important;
}
</style>