module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "",
  hide: true,
  usePrefix: true,
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`🔄 | ${globa.config.BOTNAME} Launching the Restar Mode`, threadID, () => process.exit(1));
}
