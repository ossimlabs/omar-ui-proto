import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: true },
  icons: { iconfont: 'fa' },
});


// wfsRequest.cql ingest_date >= '10-14-2019 00:00+0000' AND ingest_date <= '10-16-2019 23:59+0000'