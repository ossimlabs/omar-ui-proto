module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/omar-ui-proto/'  //prod
    : '/omar-ui-proto/', //dev
}