const axios = require('axios');
require('dotenv').config({path: '../.env'});

const youtubeServices = {
    getTitle: async function(videoId) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                return {
                    title: video.snippet.title,
                };
            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar título do vídeo';
        }
    },

    getDescription: async function(videoId){
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                return {
                    description: video.snippet.description,
                };
            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar título do vídeo';
        }
    }
}

youtubeServices.getTitle('Lu4BbMPBXGc').then(getTitle => {
    console.log('Título do vídeo:', getTitle)
})

youtubeServices.getDescription('Lu4BbMPBXGc').then(getDescription => {
    console.log('Descrição do vídeo:', getDescription);
});


module.exports = youtubeServices;