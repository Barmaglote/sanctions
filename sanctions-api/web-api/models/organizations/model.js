const mongoose = require('mongoose');
const OrganizationsSchema = require('./schema.js');

const OrganizationsModel = mongoose.model('organizations', OrganizationsSchema);
module.exports = OrganizationsModel;
