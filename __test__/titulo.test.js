const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de título', () => {
    describe('deve retornar corretamente o título do vídeo', () => {
        videoData.videos.forEach(video => {
            test(`link do vídeo: ${video.url}`, async () => {
                const videoId = video.videoId;
    
                const title = await youtubeServices.getTitle(videoId);
                
                expect(title).toEqual(video.title);
            });
        });
    })
});