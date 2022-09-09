const JSONResponse = require('../helpers/response');
const PersonsModel = require('../models/persons/model.js');

module.exports.Persons = (req, res) => {
    PersonsModel.find({}, function(err, result){
        if (err) {
            console.log(err)
            JSONResponse.Send(res, 500, null);
            return;
        }
        JSONResponse.Send(res, 200, result);    
        return;
    });
};