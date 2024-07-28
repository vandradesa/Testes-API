const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
const axios = require('axios');
require('dotenv').config({path: '.env'});

describe('Testes de duração do vídeo', () => {
    const MAX_DURATION_SECONDS = 43200; // 12 horas em segundos
    videoData.videos.forEach(video => {
        test(`duração do vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;
            const expectedDuration = video.duration; // Assumindo que você tem a duração esperada no seu dataMock.json
            const duration = await youtubeServices.getDuration(videoId);
            expect(duration).toEqual(expectedDuration);
        });
    });

    test('deve retornar duração correta para vídeo com apenas minutos e segundos', async () => {
        const videoId = 'P7TODaFUPKE'; // Use um ID de vídeo válido que tenha apenas minutos e segundos
        const expectedDuration = 'PT10M10S'; // Substitua pela duração esperada
        const duration = await youtubeServices.getDuration(videoId);
        expect(duration).toEqual(expectedDuration);
    });

    test('deve retornar duração correta para vídeo com horas, minutos e segundos', async () => {
        const videoId = 'hjCugVMjK2E'; // Use um ID de vídeo válido que tenha horas, minutos e segundos
        const expectedDuration = 'PT3H49M35S'; // Substitua pela duração esperada
        const duration = await youtubeServices.getDuration(videoId);
        expect(duration).toEqual(expectedDuration);
    });

     test('deve garantir que a duração do vídeo esteja entre 0 e o limite máximo de 12 horas', async () => {
        const videoId = 'rN3YnSg0WjM'; // Use um ID de vídeo válido
        const duration = await youtubeServices.getDuration(videoId);
        const match = duration.match(/^PT(\d+H)?(\d+M)?(\d+S)?$/);
        if (match) {
            const hours = match[1] ? parseInt(match[1]) : 0;
            const minutes = match[2] ? parseInt(match[2]) : 0;
            const seconds = match[3] ? parseInt(match[3]) : 0;
            const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
            expect(totalSeconds).toBeGreaterThan(0);
            expect(totalSeconds).toBeLessThanOrEqual(MAX_DURATION_SECONDS);
        } else {
            throw new Error('Duração não está no formato esperado');
        }
    });

    test('deve retornar "Erro ao buscar duração do vídeo" se ocorrer um erro na API', async () => {
        const originalGet = axios.get;
        axios.get = jest.fn().mockRejectedValueOnce(new Error('API Error'));
        const videoId = 'rN3YnSg0WjM';
        const duration = await youtubeServices.getDuration(videoId);
        expect(duration).toBe('Erro ao buscar duração do vídeo');
        axios.get = originalGet; // Restaura o método original
    });
});