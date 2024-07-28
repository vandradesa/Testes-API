const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de descrição', () => {
    describe('deve retornar corretamente que a 1ᵃ oração da descrição está no vídeo', () => {
        videoData.videos.forEach(video => {
            test(`link do vídeo: ${video.url}`, async () => {
                const videoId = video.videoId;
    
                const description = await youtubeServices.getDescription(videoId);
                
                expect(description).toContain(video.firstSentenceDescription);
            });
        });
    })
});