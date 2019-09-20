import axios from 'axios'
import qs from 'qs'
import { toPoint, dmsToDd } from './mgrs'

export default {
  generateFilter(filterArr) {
    let completeQueryString = ''

    for (let filter of filterArr) {
      if (filter.type === 'magicword') {
        completeQueryString = this.generateDDString(filter)
      }
    }
    return completeQueryString
  },
  generateDDString(filter) {
    let ddPattern = /(\-?\d{1,2}[.]?\d*)[\s+|,?]\s*(\-?\d{1,3}[.]?\d*)/
    let dmsPattern = /(\d{1,2})[^\d]*(\d{2})[^\d]*(\d{2}[.]?\d*)[^\d]*\s*([n|N|s|S])[^\w]*(\d{1,3})[^\d]*(\d{2})[^d]*(\d{2}[.]?\d*)[^\d]*\s*([e|E|w|W])/
    let mgrsPattern = /(\d{1,2})([a-zA-Z])[^\w]*([a-zA-Z])([a-zA-Z])[^\w]*(\d{5})[^\w]*(\d{5})/

    let lat, lng = null

    // DD
    if (filter.value.match(ddPattern)) {
      lat = parseFloat(RegExp.$1);
      lng = parseFloat(RegExp.$2);
    }

    // DMS
    if (filter.value.match(dmsPattern)) {
      lat = dmsToDd( RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4 )
      lng = dmsToDd( RegExp.$5, RegExp.$6, RegExp.$7, RegExp.$8 )
    }

    // MGRS
    if (filter.value.match(mgrsPattern)) {
      let coords = toPoint(RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4 + RegExp.$5 + RegExp.$6)
      lat = coords[1]
      lng = coords[0]
    }

    return 'INTERSECTS(ground_geom,POINT(' + lng + '+' + lat + '))'
  },
  WFSQuery( startIndex = 5, maxFeatures = 10, filter = '') {
    let baseUrl = 'https://omar-dev.ossim.io/omar-wfs/wfs?&'

    const wfsParams = {
      maxFeatures: maxFeatures,
      outputFormat: 'JSON',
      request: 'GetFeature',
      service: 'WFS',
      startIndex: startIndex,
      typeName: 'omar:raster_entry',
      version: '1.1.0',
      sortBy: 'acquisition_date :D',
    }

    // return the promise so it can be asynced and reused throughout the app
    return axios.get(baseUrl + qs.stringify(wfsParams) + '&filter=' + filter )
  },
  initialVideoQuery() {
    let baseUrl = 'https://omar-dev.ossim.io/omar-wfs/wfs?'
    const filter = ''

    const wfsParams = {
      service: 'WFS',
      version: '1.1.0',
      request: 'GetFeature',
      typeName: 'omar:video_data_set',
      filter: filter,
      resultType: 'results',
      outputFormat: 'JSON'
    }

    const url = baseUrl + qs.stringify(wfsParams)

    return axios
      .get(url)
      .then((res) => {
        // Strip everything away leaving filename
        // Because regex is the devil and this is cleaner
        // split divides url by /, pop returns last, replace modifies filetype
        const videoNameMp4 = res.data.features[0].properties.filename.split('/').pop().replace(/mpg/i, 'mp4')

        // Create a short file name (no file extension)
        // used for screenshot naming
        this.videoName = videoNameMp4.split('.').slice(0, -1).join('.')

        // Build final url and append to response keeping unified object intact
        res.data.features[0].properties.videoUrl = this.videoUrl = 'https://omar-dev.ossim.io/videos/' + videoNameMp4
        console.log('video res', res.data.features)
        return res
      })
  }
}