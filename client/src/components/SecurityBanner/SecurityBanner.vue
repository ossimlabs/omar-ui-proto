<template>
  <b-container fluid class="banner-height">
    <b-row align-h="center"
           v-if="securityClassification"
           :style="{ backgroundColor: securityClassification.backgroundColor }">
      <b-col cols="4">
        <h6 class="text-center text-uppercase pt-1" :style="{ color: securityClassification.textColor }">
          {{ securityClassification.classification }}
        </h6>
      </b-col>
    </b-row>
  </b-container>
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
  data () {
    return {}
  },
  created () {},
  destroyed () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
.banner-height {
  height:28px;
  overflow: hidden;
}
</style>
