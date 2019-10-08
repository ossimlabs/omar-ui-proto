<template>
  <v-col cols="12" class="my-0 py-0">


    <!--<v-row justify="space-around" no-gutters >
      &lt;!&ndash; Start Time &ndash;&gt;
      <v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="time"
        width="290px"

      >
        <template v-slot:activator="{ on }">
          <v-col cols="5" class="my-0 py-0">
            <v-text-field
              v-model="time"
              label="Start"
              prepend-icon="fa-clock"
              v-on="on"
            ></v-text-field>
          </v-col>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          scrollable
          use-seconds
          height="400px"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog2.save(time)">OK</v-btn>
        </v-time-picker>
      </v-dialog>-->

      <!-- End Time -->
     <!-- <v-dialog
        ref="dialog3"
        v-model="modal3"
        :return-value.sync="time"
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-col cols="5" class="my-0 py-0">
            <v-text-field
              v-model="time"
              label="End"
              prepend-icon="fa-clock"
              v-on="on"
            ></v-text-field>
          </v-col>
        </template>
        <v-time-picker
          v-if="modal3"
          v-model="time"
          scrollable
          use-seconds
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog3.save(time)">OK</v-btn>
        </v-time-picker>
      </v-dialog>-->
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'TimeFilters',
  props: {},
  components: {},
  data: () => ({
    time: null,
    modal2: false
    // 
  }),
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>