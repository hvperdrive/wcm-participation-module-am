const CronJob = require("cron").CronJob;

const variables = require("../variables");
const participationConfirm = require("./participationConfirm");
const deleteExpiredApplications = require("./deleteExpiredApplications");
const LbTaskChecker = require("@wcm/lb-task-checker");

const lbTaskCheckerInstance = new LbTaskChecker();

lbTaskCheckerInstance.registerTask({
    key: "PARTICIPATION_MAIL_REMINDER",
    instance: process.pid
});

lbTaskCheckerInstance.registerTask({
    key: "PARTICIPATION_DELETE_EXPIRED",
    instance: process.pid
});


let reminderMailJob = null;
let deleteExpiredJob = null;

module.exports.init = module.exports.reset = () => {
	if (reminderMailJob) {
		reminderMailJob.stop();
		reminderMailJob = null;
	}

	if (reminderMailJob) {
		reminderMailJob.stop();
		reminderMailJob = null;
	}

	console.log('CRON TIMING BY WCM', variables.get().cron);

	reminderMailJob = new CronJob({
		cronTime: variables.get().cron || "0 * * * *", // default every hour
		onTick: () => {
			console.log("PARTICIPATION CRON STARTED"); // eslint-disable-line no-console

			return lbTaskCheckerInstance.reserve("PARTICIPATION_MAIL_REMINDER", new Date(new Date().getTime() + 10000), process.pid)
				.then((runTask) => runTask && participationConfirm().catch((err) => console.log("ERROR CONFIRM CRON: ", err))) // eslint-disable-line no-console
		},
		onComplete: () => console.log("PARTICIPATION CRON FINISHED"), // eslint-disable-line no-console
		timeZone: "Europe/Brussels",
	});

	reminderMailJob.start();

	deleteExpiredJob = new CronJob({
		cronTime: "*/10 * * * * *", // default every hour
		onTick: () => {
			console.log("PARTICIPATION_DELETE_EXPIRED CRON STARTED"); // eslint-disable-line no-console

			return lbTaskCheckerInstance.reserve("PARTICIPATION_DELETE_EXPIRED", new Date(new Date().getTime() + 10000), process.pid)
				.then((runTask) => runTask && deleteExpiredApplications().catch((err) => console.log("ERROR PARTICIPATION_DELETE_EXPIRED CRON: ", err))) // eslint-disable-line no-console
		},
		onComplete: () => console.log("PARTICIPATION_DELETE_EXPIRED CRON FINISHED"), // eslint-disable-line no-console
		timeZone: "Europe/Brussels",
	});

	deleteExpiredJob.start();
};

module.exports.stop = () => {
	if (!reminderMailJob) {
		return;
	}

	reminderMailJob.stop();
};
