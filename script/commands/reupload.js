const axios = require('axios');

module.exports.config = {
    name: "addsong",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Reupload music from GDPH",
    usePrefix: false,
    commandCategory: "GDPH",
    usages: "songlink | title",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const { body, threadID, messageID } = event;
    let link, title;

    if (event.type === "message_reply") {
        const replyMessage = event.messageReply.body;
        const youtubeMatch = replyMessage.match(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/[^\s]+/);
        if (youtubeMatch) {
            link = youtubeMatch[0];
            title = args.join(" ").trim();
        } else {
            return api.sendMessage("❌ | 𝖳𝗁𝗂𝗌 𝖬𝗎𝗌𝗂𝖼 𝗒𝗈𝗎 𝗋𝖾𝗉𝗅𝗒 𝗁𝖺𝗌 𝗇𝗈 𝖼𝗈𝗇𝗍𝖺𝗂𝗇𝖾𝖽 𝖺 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 𝗅𝗂𝗇𝗄𝗌", threadID, messageID);
        }
    } else {
        [link, title] = args.join(" ").split("|").map(arg => arg.trim());
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!link) {
        return api.sendMessage("𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗌𝗈𝗇𝗀 𝗅𝗂𝗇𝗄 𝖺𝗇𝖽 𝗍𝗂𝗍𝗅𝖾.\n\n𝖴𝗌𝖺𝗀𝖾: 𝖺𝖽𝖽𝗌𝗈𝗇𝗀 𝗌𝗈𝗇𝗀𝗅𝗂𝗇𝗄 | 𝖳𝗂𝗍𝗅𝖾 𝗈𝖿 𝖬𝗎𝗌𝗂𝖼", threadID, messageID);
    }

    const waitMessage = await api.sendMessage("☁️ | 𝖱𝖾𝗎𝗉𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝖬𝗎𝗌𝗂𝖼 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍..", threadID);

    try {
        let uploadData;

        if (youtubeRegex.test(link)) {
            const axiosUrl = `https://reuploadgdph-0816871a3a93.herokuapp.com/api/upload?link=${encodeURIComponent(link)}`;
            const uploadResponse = await axios.get(axiosUrl);
            uploadData = uploadResponse.data;

            if (!uploadData.src) {
                return api.editMessage("Failed to get src from the API.", waitMessage.messageID, threadID);
            }

            title = uploadData.src;
            link = `https://reuploadgdph-0816871a3a93.herokuapp.com/files?src=${encodeURIComponent(title)}`;
        }

        const apiUrl = `https://reupload-gdph-music-api-by-jonell.onrender.com/gdph?songlink=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}&artist=GDPHBOT`;

        const response = await axios.get(apiUrl);
        let responseData = response.data;

        responseData = responseData.replace(/<\/?b>/g, "").replace(/<hr>/g, "");

        if (responseData.startsWith("Song reuploaded")) {
            const songID = responseData.match(/Song reuploaded: (\d+)/)[1];
            const message = `✅ | 𝖱𝖾-𝗎𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖬𝗎𝗌𝗂𝖼 𝖦𝖣𝖯𝖧\n\n𝖨𝖣: ${songID}\n𝖭𝖺𝗆𝖾: ${title}`;

            api.editMessage(message, waitMessage.messageID, threadID);
        } else if (responseData.includes("This URL doesn't point to a valid audio file.") || responseData.includes("This song already exists in our database.")) {
            api.editMessage(responseData, waitMessage.messageID, threadID);
        } else {
            api.editMessage("An error occurred while processing your request.", waitMessage.messageID, threadID);
        }
    } catch (error) {
        console.error(error);
        api.editMessage("An error occurred while processing your request.", waitMessage.messageID, threadID);
    }
};
        
