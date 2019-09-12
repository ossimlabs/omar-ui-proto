import axios from 'axios'
import qs from 'qs'

export default {
  initalWFSQuery() {
    let baseUrl = 'https://omar-dev.ossim.io/omar-wfs/wfs?'

    let wfsRequest = {
      typeName: 'omar:raster_entry',
      namespace: 'http://omar.ossim.org',
      version: '1.1.0',
      outputFormat: 'JSON',
      cql: '',
      sortField: 'acquisition_date',
      sortType: '+D',
      startIndex: '0',
      maxFeatures: '1000',
      service: 'WFS'
    };

    let params = {
      // filter: this.modifyParamBasedOnZoom( wfsRequest.cql ),
      filter: '',
      outputFormat: wfsRequest.outputFormat,
      request: 'GetFeature',
      service: 'WFS',
      sortBy: wfsRequest.sortField + wfsRequest.sortType,
      startIndex: wfsRequest.startIndex,
      typeName: wfsRequest.typeName,
      version: wfsRequest.version
    };


    let wfsRawResponse
    axios
      .get(baseUrl, qs.stringify(params))
      .then(res => (wfsRawResponse = res))

    return wfsRawResponse
  }
}