const CronJob = require("cron").CronJob;

const variables = require("../variables");
const participationConfirm = require("./participationConfirm");

let job = null;

module.exports.init = module.exports.reset = () => {
	if (job) {
		job.stop();
		job = null;
	}

	job = new CronJob({
		cronTime: variables.get().cron || "* * * *", // default every hour
		onTick: () => {
			console.log("PARTICIPATION CRON STARTED"); // eslint-disable-line no-console

			return participationConfirm().catch((err) => console.log("ERROR CONFIRM CRON: ", err)); // eslint-disable-line no-console
		},
		onComplete: () => console.log("PARTICIPATION CRON FINISHED"), // eslint-disable-line no-console
		timeZone: "Europe/Brussels",
	});

	job.start();
};

module.exports.stop = () => {
	if (!job) {
		return;
	}

	job.stop();
};
