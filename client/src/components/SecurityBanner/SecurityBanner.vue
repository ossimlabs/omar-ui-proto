<template>
  <v-system-bar app
    v-if="securityClassification"
    :style="{ backgroundColor: securityClassification.backgroundColor }"
  >
    <v-row>
      <v-col>
        <h4 class="text-center text-uppercase" :style="{ color: securityClassification.textColor }">
          {{ securityClassification.classification }}
        </h4>
      </v-col>
    </v-row>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'SecurityBanner',
    props: {
      securityClassification: {
        type: Object,
        required: false
      }
    },
    components: {},
    data: () => ({

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