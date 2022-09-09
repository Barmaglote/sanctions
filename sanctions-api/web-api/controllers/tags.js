const JSONResponse = require('../helpers/response');
const TagsModel = require('../models/tags/model.js');

const allowed = ['organizations', 'persons']

module.exports.Tags = (req, res) => {
    const { area } = req.query;
    if (allowed.indexOf(area) < 0) {
        JSONResponse.Send(res, 500, null);
        return;
    }

    TagsModel.find({area: area}, function(err, result){
        if (err) {
            JSONResponse.Send(res, 500, null);
            return;
        }

        JSONResponse.Send(res, 200, result);    
        return;
    });
};