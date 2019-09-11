<template>
  <v-container fluid>
    <v-row row pa-1>
      <v-col cols="2"><v-icon>fa-filter</v-icon></v-col>
      <v-col><h4> Filters </h4></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-combobox
        v-model="select"
        :items="filters"
        chips multiple
        label="Keyword"
      >
        <template v-slot:selection="data">
          <v-chip
            close
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click.stop="data.parent.selectedIndex = data.index"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar class="accent white--text" left>
              {{ data.item.slice(0, 1).toUpperCase() }}
            </v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-col>


  </v-container>
</template>

<script>
export default {
  name: "DrawerFilters",
  props: {},
  components: {},
  data: () => ({
  //
  }),
  created () {},
  destroyed () {},
  mounted () {
    console.log('store', this.$store.state)
  },
  computed: {
    filters () {
      return this.$store.state.filters
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>