const queries = require("../queries");


module.exports = (application) => queries.getApplicationByEmailOrPhone(application.data.email, application.data.phone)
	.then((result) => ({ isRegistered: !!result.length, data: application }));
