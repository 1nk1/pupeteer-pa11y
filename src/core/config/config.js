module.exports = {
	isHeadless: () => {
		return process.env.HEADLESS === "new";
	},

	getChromiumArgs: () => {
		return process.env.CHROMIUM_ARGS.split(" ");
	},
	getTimeOutTest: () => {
		return process.env.TEST_TIMEOUT;
	},
	ignoreHTTPSErrors: () => {
		return process.env.IGNOREHTTPSERRORS;
	}
};