const axios = require('axios');
require('dotenv').config({path: '../.env'});

const youtubeServices = {
    getVideoDetails: async function(videoId) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet, statistics',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                return {
                    title: video.snippet.title,
                    description: video.snippet.description,
                    viewCount: Number(video.statistics.viewCount)
                };
            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao encontrar o vídeo';
        }
    }
}

youtubeServices.getVideoDetails('Lu4BbMPBXGc').then(getVideoDetails => {
    console.log(getVideoDetails)
})

module.exports = youtubeServices;