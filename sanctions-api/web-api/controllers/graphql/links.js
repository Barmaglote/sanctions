const LinksModel = require('../../models/links/model.js')
const CACHE_TTL_SEC = 100000

module.exports.Links = () => {
  const linksCache = {}
  let dateCache = new Date().getTime()

  const links = async (type) => {
    if (!type && (!linksCache[type] || (new Date().getTime() - dateCache > CACHE_TTL_SEC))) {
      linksCache.ALL = await LinksModel.find({})
      dateCache = new Date().getTime()
    }

    if (type && (!linksCache[type] || (new Date().getTime() - dateCache > CACHE_TTL_SEC))) {
      linksCache[type] = await LinksModel.find({ type })
      dateCache = new Date().getTime()
    }

    return type ? linksCache[type] : linksCache.ALL
  }

  return links
}
