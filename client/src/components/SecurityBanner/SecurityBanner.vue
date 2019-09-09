<template>
  <v-system-bar app
    v-if="securityClassification"
    :style="{ backgroundColor: securityClassification.backgroundColor }"
  >
    <v-layout>
      <v-flex>
        <h4 class="text-center text-uppercase" :style="{ color: securityClassification.textColor }">
          {{ securityClassification.classification }}
        </h4>
      </v-flex>
    </v-layout>
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