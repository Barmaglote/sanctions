import LinksModel from '../../models/links/model.js'

export async function GetLinks(type) {
  if (!type) {
      return await LinksModel.find({}) 
  } else {
      return await LinksModel.find({ type })
  }
}