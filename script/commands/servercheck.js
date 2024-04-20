"use strict";

const axios = require('axios');

module.exports.config = {
    name: "servercheck",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Check the status of GD servers in real-time",
    usePrefix: true,
    commandCategory: "Utility",
    cooldowns: 10
};

module.exports.run = async function ({ api, event }) {
    const servers = [
        "https://gdph.ps.fhgdps.com/",
        "https://gdph.ps.fhgdps.com/tools/songAdd.php",
        "https://gdph.ps.fhgdps.com/tools/stats/songList.php",
        "https://gdph.ps.fhgdps.com/tools/index.php"
    ];

    const checkingMessage = await api.sendMessage("🔍 | 𝖢𝗁𝖾𝖼𝗄𝗂𝗇𝗀 𝗌𝖾𝗋𝗏𝖾𝗋 𝗌𝗍𝖺𝗍𝗎𝗌...", event.threadID);

    const checkServer = async (server) => {
        try {
            await axios.get(server, { timeout: 5000 });
            return '✅';
        } catch (error) {
            return '❌';
        }
    };

    const results = await Promise.allSettled(
        servers.map(server => checkServer(server))
    );

    let status = {
        "𝖧𝗈𝗆𝖾𝗉𝖺𝗀𝖾": results[0].value,
        "𝖱𝖾𝗎𝗉𝗅𝗈𝖺𝖽 𝖬𝗎𝗌𝗂𝖼": results[1].value,
        "𝖲𝗈𝗇𝗀𝖫𝗂𝗌𝗍": results[2].value,
        "𝖨𝗇𝖽𝖾𝗑 𝖧𝗈𝗆𝖾𝗉𝖺𝗀𝖾": results[3].value
    };

    let response = `𝖦𝖣𝖯𝖧 𝖲𝖾𝗋𝗏𝖾𝗋 𝖲𝗍𝖺𝗍𝗎𝗌 𝖢𝗁𝖾𝖼𝗄\n\n`;

    for (const [server, stat] of Object.entries(status)) {
        response += `${server}: ${stat}\n`;
    }

    if (Object.values(status).every(stat => stat === '✅')) {
        response += "\n𝖠𝗅𝗅 𝗌𝖾𝗋𝗏𝖾𝗋𝗌 𝖺𝗋𝖾 𝗎𝗉.";
    } else if (Object.values(status).every(stat => stat === '❌')) {
        response += "\n𝖠𝗅𝗅 𝗌𝖾𝗋𝖽𝖾𝗋𝗌 𝖺𝗋𝖾 𝖽𝗈𝗐𝗇.";
    } else {
        response += "\n𝖲𝗈𝗆𝖾 𝗌𝖾𝗋𝖺𝖾𝗋𝗌 𝗆𝖺𝗒 𝖻𝖾 𝖾𝗑𝗉𝖾𝗋𝗂𝖾𝗇𝖼𝗂𝗇𝗀 𝗂𝗌𝗌𝗎𝖾𝗌.";
    }

    api.editMessage(response, checkingMessage.messageID, event.threadID, event.messageID);
};
