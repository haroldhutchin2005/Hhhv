module.exports.config = {
  name: "safeban",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",//original by Joshua sy
  description: "otherbot",
  usePrefix: false,
  hide: true,
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
	
     const i = require("moment-timezone").tz("Asia/Manila").format ("h:mm:ss A");
  const moment = require("moment-timezone");
  const Date = moment.tz("Asia/Manila").format("DD/MM/YYYY");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `${c}, 𝖸𝗈𝗎 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖲𝗒𝗌𝗍𝖾𝗆 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝖭𝗈𝗇𝗌𝖾𝗇𝗌𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽`
	};
    //Add curse words without capital letters
	["Nonsense Command"].forEach((a => { 
		
        const s = o.senderID;
    let haha = o.body;
	if (haha.includes("!music sex") || haha.includes("!music cum") || haha.includes("!music fucking") || haha.includes("!music fuck") || haha.includes("!music bobo") || haha.includes("!music niga") || haha.includes("!music gago") || haha.includes("!music penis") || haha.includes("!music penis") || haha.includes("!music penis") || haha.includes("!music n1ga") || haha.includes(`${global.config.PREFIX}fuck`) || haha.includes(`${global.config.PREFIX}niga`) || haha.includes(`${global.config.PREFIX}cum`) || haha.includes("${global.config.PREFIX}chupa") || haha.includes("!music chupa") ||  haha.includes("${global.config.PREFIX}bold") || haha.includes("!music bold")) {
			modules = "[ BOT BAN ]", console.log(c, modules, a);
			const o = n.getData(s).data || {};
			n.setData(s, {
				data: o			
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`•——[NONSENSE COMMAND USER BOT DETECTED]——•\n❯ Date now : ${Date}\n❯ Time : ${i} (h:m:s) \n❯ Name : ${c}\n❯ Uid : ${s}\n❯ Fb link : https://www.facebook.com/${s}\n————————\nSuccessfully banned to this user.`, n)
			}))
		} 
	})) 
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("This command is used to detect when swearing to bot.", o.threadID);
