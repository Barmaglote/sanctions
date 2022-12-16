import LinksModel from '../../models/links/model.js'

export async function Links(type) {
  if (!type) {
      return await LinksModel.find({}) 
  } else {
      return await LinksModel.find({ type })
  }
}
