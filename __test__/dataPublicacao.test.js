const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de data de publicação do vídeo', () => {
    describe('deve retornar corretamente ano, mês e dia da publicação do vídeo', () => {
        videoData.videos.forEach(video => {
            test(`link do vídeo: ${video.url}`, async () => {
                const videoId = video.videoId;
    
                const creationDate = await youtubeServices.getCreationDate(videoId);
                
                expect(creationDate).toEqual(video.creationDate);
            });
        });
    })
});

