const JSONResponse = require('./../helpers/response');

var persons = [
    {
        titlerus: "Vladimir Putin",
        titleeng: "Vladimir Putin",
        description: "test 1",
        login: "evgeniy.danilchenko@gmail.com"
    },
    {
        titlerus: "Vladimir Soloviev",
        titleeng: "Vladimir Soloviev",
        description: "test 2",
        login: "test@test.com"
    }
];

module.exports.Persons = (req, res) => {
    JSONResponse.Send(res, 200, persons.filter(x => x.login.toLowerCase().trim() == req.user.login.toLowerCase().trim()));
};

