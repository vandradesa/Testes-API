const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
const axios = require('axios');
require('dotenv').config({path: '.env'});

describe("Testes de verificação de chamada da API", () => {
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

describe('Testes de título: deve retornar corretamente o título do vídeo', () => {
    videoData.videos.forEach(video => {
        test(`vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;

            const title = await youtubeServices.getTitle(videoId);
            
            expect(title).toEqual(video.title);
        });
    });
});

describe('Testes de descrição', () => {
    
});
