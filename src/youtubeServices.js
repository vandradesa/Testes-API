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
    },

    getChannelName: async function(videoId) {
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
                return video.snippet.channelTitle;
            } else {
                return 'Vídeo não encontrado';
            }
        } catch (error) {
            return 'Erro ao buscar nome do canal';
        }
    },

    getComments: async function(videoId){
        try {

            const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });

            const video = videoResponse.data.items[0];

            if (!video) {
                return 'Vídeo não encontrado';
            }

            const commentsResponse = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: videoId,
                    maxResults: 4, // Limitar a 10 comentários
                    key: process.env.YOUTUBE_API_KEY
                }
            });

            const comments = commentsResponse.data.items.map(item => {
                return item.snippet.topLevelComment.snippet.textDisplay;
            });

            if (comments.length > 0) {
                return comments;
            } else {
                return 'Nenhum comentário encontrado';
            }

        } catch (error) {
            return 'Erro ao buscar comentários do vídeo';
        }
    },
    
    getDuration: async function(videoId) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'contentDetails',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });
    
            const video = response.data.items[0];
    
            if (video) {
                const duration = video.contentDetails.duration;
                return duration;
            } else {
                return 'Vídeo não encontrado';
            }
        } catch (error) {
            return 'Erro ao buscar duração do vídeo';
        }
    }

}

module.exports = youtubeServices;