const JSONResponse = require('../helpers/response');
const OrganizationsModel = require('../models/organizations/model.js');

module.exports.Organizations = (req, res) => {
    OrganizationsModel.find({}, function(err, result){
        if (err) {
            JSONResponse.Send(res, 500, null);
        }
        JSONResponse.Send(res, 200, result);    
    });
};