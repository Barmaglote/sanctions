const JSONResponse = require('../helpers/response')
const LinksModel = require('../models/links/model.js')

module.exports.Links = (req, res) => {
  LinksModel.find({}, function (err, result) {
    if (err) {
      JSONResponse.Send(res, 500, null)
    }
    JSONResponse.Send(res, 200, result)
  })
}
