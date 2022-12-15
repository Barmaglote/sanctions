import { Send } from '../helpers/response.js'
import PersonsModel from '../models/persons/model.js'

export async function Persons(req, res) {
  const { value } = req.query.params ? JSON.parse(req.query.params) : { value: null }
  const { sortField, sortOrder } = value
  const sorting = {}

  sorting[sortField] = sortOrder
  const filter = {}

  if (value.filters.tags && value.filters.tags.value) {
    filter.tag = { $in: value.filters.tags.value }
  }

  if (value.filters.title) {
    filter.$or = [{ titlerus: new RegExp(value.filters.title) }, { titleeng: new RegExp(value.filters.title) }]
  }

  let total = 0
  try {
    total = await PersonsModel.count(filter)
  } catch (error) {
    console.log(error)
    Send(res, 500, null)
    return
  }

  PersonsModel.find(filter).sort({ ...sorting, id: -1 }).skip(value.first).limit(value.rows).exec((err, result) => {
    if (err) {
      console.log(err)
      Send(res, 500, null)
      return
    }

    Send(res, 200, { result, total })
  })
}
