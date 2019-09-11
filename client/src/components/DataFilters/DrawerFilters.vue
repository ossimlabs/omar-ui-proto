<template>
  <v-container fluid>
    <v-row row pa-1>
      <v-col cols="2"><v-icon>fa-filter</v-icon></v-col>
      <v-col><h4> Filters </h4></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="10">
        <v-form @submit="addKeywordFilter(keyword)">
          <v-text-field
            prepend-icon="fa-font"
            label="Enter a keyword"
            v-model="keyword"
            clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <v-icon slot="prepend" color="success">fa-font</v-icon>
          </v-text-field>
        </v-form>
      </v-col>

      <v-col cols="10">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          width="290px"
          @keydown.enter="$refs.dialog.save(date)"
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
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DrawerFilters",
  props: {},
  components: {},
  data: () => ({
    keyword: null,
    date: null,
    modal: null,
    dates: ['2018-09-15', '2018-09-20'],
    menu: false,
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {
    filters () {
      return this.$store.state.filters
    }
  },
  watch: {},
  methods: {
    addKeywordFilter(keyword) {
      this.$store.commit('addFilter', keyword)
      this.keyword = null
    },
    addStartDateFilter(date) {
      this.$store.commit('addFilter', keyword)
    }
  }
}
</script>

<style scoped>

</style>