const queries = require("../queries");


module.exports = (application) => queries.getApplicationByEmailOrPhone(application.email, application.phone)
	.then((result) => !!result.length);
