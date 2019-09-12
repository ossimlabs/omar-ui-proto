import axios from 'axios'
import qs from 'qs'

export default {
  initalWFSQuery( startIndex = 0, maxFeatures = 100) {
    let baseUrl = 'https://omar-dev.ossim.io/omar-wfs/wfs?&'
    let filter = '';

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
      .then(res => {
        console.log('res', res)
        return res
      })
  }
}