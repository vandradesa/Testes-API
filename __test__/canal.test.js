const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
require('dotenv').config({path: '.env'});

describe('Testes de nome do canal', () => {

    videoData.videos.forEach(video => {
        test(`link do vídeo: ${video.url}`, async () => {
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).toEqual(video.canal);
        });
    });
 
    videoData.videos.forEach(video => {
    test(`Todos os canais devem ser strings não vazias - link do vídeo: ${video.url}`, async () => {
        const videoId = video.videoId;
        const canal = await youtubeServices.getChannelName(videoId);
        expect(typeof canal).toBe('string');
        expect(canal).not.toBe('');
        });
    });

    videoData.videos.forEach(video => {
        test(`O nome do canal deve ter comprimento entre 1 e 100 caracteres - Canal do vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal.length).toBeGreaterThanOrEqual(1);
            expect(canal.length).toBeLessThanOrEqual(100);
        });
    });
    
    videoData.videos.forEach(video => {
        test(`O nome do canal não deve ser em branco - Canal do vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).not.toBe('');
        });
    });

    videoData.videos.forEach(video => {
        test(`O nome do canal não deve ser apenas espaços em branco - Canal do vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).not.toMatch(/^\s+$/);
        });
    });
});
