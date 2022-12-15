import { Send } from '../helpers/response.js'
import TagsModel from '../models/tags/model.js'

const allowed = ['organizations', 'persons']

export function Tags (req, res) {
  const { area } = req.query
  if (allowed.indexOf(area) < 0) {
    Send(res, 500, null)
  }

  TagsModel.find({ area }, function (err, result) {
    if (err) {
      Send(res, 500, null)
    }

    Send(res, 200, result)
  })
}
