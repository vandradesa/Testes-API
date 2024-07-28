const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de likes', () => {
    describe('deve retornar corretamente que a quantidade de likes estão no intervalo de 100 até 200000', () => {
        videoData.videos.forEach(video => {
            test('link do vídeo ${video.url}', async () => {
                const videoId = video.videoId;
    
                const likes = await youtubeServices.getLikes(videoId);
                expect(Number(likes)).toBeGreaterThanOrEqual(100);
                expect(Number(likes)).toBeLessThanOrEqual(200000);
            });
        });
    })
});