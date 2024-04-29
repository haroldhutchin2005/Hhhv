const ytdl = require('ytdl-core');
const simpleytapi = require('simple-youtube-api');
const path = require('path');
const fs = require('fs');

module.exports.config = {
  name: "youtube",
  hasPermssion: 0,
  version: "1.0.1",
  credits: "Jonell Magallanes",
  usePrefix: false,
  description: "Search and send YouTube video",
  commandCategory: "video",
  cooldowns: 40
};

module.exports.run = async function ({ event, api, args }) {
    const youtube = new simpleytapi('AIzaSyCMWAbuVEw0H26r94BhyFU4mTaP5oUGWRw');

    const tid = event.threadID;
    const mid = event.messageID;
    
    const searchString = args.join(' ');
    if (!searchString) return api.sendMessage("📝 | Please Enter Your Search Query to Youtube Command", tid, mid);
    try {
      const videos = await youtube.searchVideos(searchString, 1);
      api.sendMessage(`⏱️ | Search for ${searchString} Please Wait....`, tid, mid);
      console.log(`downloading Video of ${videos[0].title}`);
      const url = `https://www.youtube.com/watch?v=${videos[0].id}`;

      const videoInfo = await ytdl.getInfo(url);
      const videoTitle = videoInfo.videoDetails.title;
      const videoDescription = videoInfo.videoDetails.description;
      const file = path.resolve(__dirname, 'cache', `video.mp4`);
      console.log(`Downloaded Complete Ready to send The user`);

      ytdl(url, { filter: 'videoandaudio' }).pipe(fs.createWriteStream(file)).on('finish', () => {
        api.sendMessage({
          body: `🎥 | Here's the YouTube video you requested\nURL: ${url}\n\nTitle: ${videoTitle}\nDescription: ${videoDescription}`,
          attachment: fs.createReadStream(file)
        }, event.threadID);
      });
    } catch (error) {
      api.sendMessage("🚨 | An error occurred while searching for the YouTube video.", event.threadID);
    }
};
