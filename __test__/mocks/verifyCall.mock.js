const axios = require('axios');
require('dotenv').config({path: '../../.env'});

const verifyCall = (videoId) => {
    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'snippet',
            id: videoId,
            key: process.env.YOUTUBE_API_KEY
        }
    });
};

module.exports = {
    verifyCall
};
