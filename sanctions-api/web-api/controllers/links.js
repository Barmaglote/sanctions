import { Send } from '../helpers/response.js'
import LinksModel from '../models/links/model.js'

export function Links (req, res) {
  LinksModel.find({}, function (err, result) {
    if (err) {
      Send(res, 500, null)
    }

    Send(res, 200, result)
  })
}
