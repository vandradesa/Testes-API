const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de views', () => {
    describe('deve retornar corretamente que a quantidade de views estão no intervalo de 1000 até 2000000', () => {
        videoData.videos.forEach(video => {
            test(`link do vídeo: ${video.url}`, async () => {
                const videoId = video.videoId;
    
                const views = await youtubeServices.getViews(videoId);
                
                expect(Number(views)).toBeGreaterThanOrEqual(1000);
                expect(Number(views)).toBeLessThanOrEqual(200000)
            });
        });
    })
});