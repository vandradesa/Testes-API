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
                return video.snippet.title;

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
                return video.snippet.description;

            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar título do vídeo';
        }
    },

    getViews: async function(videoId){
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'statistics',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                return video.statistics.viewCount;

            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar título do vídeo';
        }
    },

    getLikes: async function(videoId){
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'statistics',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                return video.statistics.likeCount;

            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar título do vídeo';
        }
    },

    getCreationDate: async function(videoId){
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
                const publishedAt = video.snippet.publishedAt;
                const date = new Date(publishedAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
                const day = String(date.getDate()).padStart(2, '0');       // Adiciona zero à esquerda se necessário

                return `${year}-${month}-${day}`;

            } else {
                return 'Vídeo não encontrado';
            }
    
        } catch (error) {
            return 'Erro ao buscar data de criação do vídeo';
        }
    }
}

module.exports = youtubeServices;