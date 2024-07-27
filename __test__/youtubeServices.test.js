const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
const axios = require('axios');
require('dotenv').config({path: '.env'});

describe("Testes de verificação de chamada da API do YouTube", () => {
    test('API deve retornar 200 ao ser chamada corretamente', async () => {
        const API_KEY = process.env.YOUTUBE_API_KEY;

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=&key=${API_KEY}`;

        const response = await axios.get(url);

        expect(response.status).toBe(200);
    })

    test('API deve retornar 400 ao ser chamada com credenciais (KEY) incorreta', async () => {
        const API_KEY = "chaveincorreta";

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=&key=${API_KEY}`;

        let response;
        let error;
        try {
            response = await axios.get(url);

        } catch (err) {
            error = err;
        }

        expect(error.response?.status).toBe(400);
    })
})

describe('Testes de exceções', () => {
    test('deve retornar Vídeo não encontrado ao informar ID de vídeo inválida', async () => {
        const videoId = "id-invalida";

        const title = await youtubeServices.getTitle(videoId);
        
        expect(title).toEqual("Vídeo não encontrado");
    })
})

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
