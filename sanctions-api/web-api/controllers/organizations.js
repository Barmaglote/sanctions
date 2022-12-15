import * as JSONResponse from '../helpers/response.js'
import OrganizationsModel from '../models/organizations/model.js'

export async function Organizations (req, res) {
  const { value } = req.query.params ? JSON.parse(req.query.params) : { value: null }
  const { sortField, sortOrder } = value
  const sorting = {}

  sorting[sortField] = sortOrder
  const filter = {}

  if (value.filters.tags && value.filters.tags.value) {
    filter.tag = { $in: value.filters.tags.value }
  }

  if (value.filters.title.value) {
    filter.$or = [{ titlerus: new RegExp(value.filters.title) }, { titleeng: new RegExp(value.filters.title) }]
  }

  let total = 0
  try {
    total = await OrganizationsModel.count(filter)
  } catch (error) {
    console.log(error)
    JSONResponse.Send(res, 500, null)
    return
  }

  OrganizationsModel.find(filter).sort({ ...sorting, id: -1 }).skip(value.first).limit(value.rows).exec((err, result) => {
    if (err) {
      console.log(err)
      JSONResponse.Send(res, 500, null)
      return
    }

    JSONResponse.Send(res, 200, { result, total })
  })
}
