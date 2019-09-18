import axios from 'axios'
import qs from 'qs'

export default {
  initalWFSQuery( startIndex = 0, maxFeatures = 100) {
    let baseUrl = 'https://omar-dev.ossim.io/omar-wfs/wfs?&'
    let filter = '';

    // video
    // typeName: 'omar:video_data_set'

    const wfsParams = {
      maxFeatures: maxFeatures,
      filter: filter,
      outputFormat: 'JSON',
      request: 'GetFeature',
      service: 'WFS',
      startIndex: startIndex,
      typeName: 'omar:raster_entry',
      version: '1.1.0',
      sortBy: 'acquisition_date :D',
    }

    return axios
      .get(baseUrl + qs.stringify(wfsParams))
      .then((res) => {
        console.log('res', res.data.features)
        return res
      })
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