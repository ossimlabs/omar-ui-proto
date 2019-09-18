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
            label="Enter the magic word"
            v-model="magicword"
            clearable
          >
            <!-- Added icon slot for custom color choosing -->
            <v-icon slot="prepend" color="warning">fa-hat-wizard</v-icon>
          </v-text-field>
        </v-form>

      </v-col>

      <v-col cols="10" class="my-0 py-0">
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
            <v-btn text color="primary" @click="$refs.dialog.save(date), addDateFilter(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
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
    }
  }
}
</script>

<style scoped>

</style>