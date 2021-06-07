const CronJob = require("cron").CronJob;

const variables = require("../variables");
const participationConfirm = require("./participationConfirm");
const LbTaskChecker = require("@wcm/lb-task-checker");

const lbTaskCheckerInstance = new LbTaskChecker();

lbTaskCheckerInstance.registerTask({
    key: "PARTICIPATION_MAIL_REMINDER",
    instance: process.pid
});

let job = null;

module.exports.init = module.exports.reset = () => {
	if (job) {
		job.stop();
		job = null;
	}

	console.log('CRON TIMING BY WCM', variables.get().cron);

	job = new CronJob({
		cronTime: variables.get().cron || "* * * *", // default every hour
		onTick: () => {
			console.log("PARTICIPATION CRON STARTED"); // eslint-disable-line no-console

			return lbTaskCheckerInstance.reserve("PARTICIPATION_MAIL_REMINDER", new Date(new Date().getTime() + 10000), process.pid)
				.then((runTask) => runTask && participationConfirm().catch((err) => console.log("ERROR CONFIRM CRON: ", err))) // eslint-disable-line no-console
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
