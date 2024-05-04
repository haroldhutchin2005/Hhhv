module.exports.config = {
  name: "warninghaha",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "jonell Magallanes",
  hide: true,
  description: "otherbot",
  usePrefix: true,
  commandCategory: "...",
  cooldowns: 0
};

module.exports.handleEvent = async ({
  event: o,
  api: t,
  Users: n
}) => {
  var {
    threadID: e,
    messageID: a,
    body: b,
    senderID: s,
    reason: d
  } = o;

  if (s == t.getCurrentUserID()) return;
  let c = await n.getNameUser(o.senderID);
  var h = {
    body: `ⓘ This comment was deleted, and the account of this user is under investigation for racism, hate crimes, and domestic terrorism. Message ID: ${a}`
  };
  // Array of sensitive words
  const warningWords = ["niga", "putang", "cum", "fuck", "yawa", "pennis", "gago", "stupid", "nig*", "fuck up", "oten", "Nigas", "bobo", "putang ina mo", "ina mo", "tanga kaba", "shit", "dick", "nig4", "nigas"];
  // Check if message contains sensitive words
  warningWords.forEach((word) => {
    if (o.body.includes(word)) {
      modules = "[ BOT BAN ]", console.log(c, modules, a);
      t.sendMessage(h, e);
    }
  });
}, module.exports.run = async ({
  event: o,
  api: t
}) => t.sendMessage("This command is used to detect sensitivity words.", o.threadID);
