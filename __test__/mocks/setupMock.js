const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

const validVideoIds = ['Lu4BbMPBXGc', 'd0jPS1q7mus', 'wn7Ig1AShlM']; // Lista de videoIds válidos

const setupMockAxios = async (videoId, title = '', description = '', viewCount = 0) => {
    if (!validVideoIds.includes(videoId)) {
        mock.onGet('https://www.googleapis.com/youtube/v3/videos', {
            params: { part: 'snippet,statistics', id: videoId }
        }).reply(404, {
            error: {
                message: 'Vídeo não encontrado'
            }
        });
    } else {
        mock.onGet('https://www.googleapis.com/youtube/v3/videos', {
            params: { part: 'snippet,statistics', id: videoId }
        }).reply(200, {
            items: [
                {
                    snippet: {
                        id: videoId,
                        title: title,
                        description: description,
                       
                    },
                    statistics: {
                        viewCount: viewCount
                    }
                }
            ]
        });
    }
};

const setupMock = async (videoId, title, description, viewCount) => {
    try {
        await setupMockAxios(videoId, title, description, viewCount);
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: { part: 'snippet,statistics', id: videoId }
        });
        return { 
            title: response.data.items[0].snippet.title,
            description: response.data.items[0].snippet.description,
            viewCount: Number(response.data.items[0].statistics.viewCount)
        };
    } catch (error) {
        return "Erro ao buscar vídeo";
    }
};


module.exports = { setupMock };