const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
const axios = require('axios');
const fs = require('fs');

const path = require('path');
const xlsx = require('xlsx');
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


// Função para ler comentários esperados de um arquivo JSON
function readExpectedCommentsFromJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    return json.comments;
};

describe('YouTube Services', () => {
    const videoId = 'rN3YnSg0WjM';
    const jsonFilePath = path.resolve(__dirname, 'json/comments.json');

    let expectedComments;

    beforeAll(() => {
        expectedComments = readExpectedCommentsFromJson(jsonFilePath);
    });

    it('deve retornar os comentários corretos para um vídeo existente', async () => {
        const comments = await youtubeServices.getComments(videoId);
        expect(comments).toEqual(expectedComments);
    });

    it('deve retornar "Vídeo não encontrado" se o vídeo não existir', async () => {
        const nonExistentVideoId = 'fdfadfad';
        const comments = await youtubeServices.getComments(nonExistentVideoId);
        expect(comments).toBe('Vídeo não encontrado');
    });

    it('deve retornar "Nenhum comentário encontrado" se não houver comentários', async () => {
        const videoIdWithoutComments = 'MClDFkrNhpo'; // Substitua pelo ID de um vídeo conhecido por não ter comentários
        const comments = await youtubeServices.getComments(videoIdWithoutComments);
        expect(comments).toBe('Nenhum comentário encontrado');
    });

    it('deve garantir que nenhum comentário esteja vazio', async () => {
        const comments = await youtubeServices.getComments(videoId);
        comments.forEach(comment => {
            expect(comments).not.toBe('');
        });
    });

    it('deve garantir que todos o primeiro comentário contenha a palavra "ótimo"', async () => {
        const comments = await youtubeServices.getComments(videoId);
        comments.forEach(comment => {
            expect(comments[0]).toContain('otimo video]');
        });
    });

    it('deve garantir que todos os comentários contenham pelo menos um caractere alfabético', async () => {
        const comments = await youtubeServices.getComments(videoId);
        comments.forEach(comment => {
            expect(/[a-zA-Z]/.test(comment.text)).toBe(true);
        });
    });

    it('deve garantir que todos os comentários não excedam 1000 caracteres', async () => {
        const comments = await youtubeServices.getComments(videoId);
        comments.forEach(comment => {
            expect(comments[0].length).toBeLessThanOrEqual(1000);
        });
    });
        

    it('deve garantir que nenhum comentário contenha caracteres especiais indesejados', async () => {
        const forbiddenChars = /[!@#$%^&*()_+={}\[\]:;"'<>,.?\/|\\`~]/; // Lista de caracteres especiais proibidos
        const comments = await youtubeServices.getComments(videoId);
        comments.forEach(comment => {
            expect(forbiddenChars.test(comment.text)).toBe(false);
        });
    });

});


describe('Testes de duração', () => {
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

describe('Testes de nome do canal', () => {

    videoData.videos.forEach(video => {
        test(`Canal do vídeo com ID ${video.videoId}`, async () => {
            const videoId = video.videoId;
            const expectedCanal = video.canal; // Assumindo que você tem a duração esperada no seu dataMock.json
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).toEqual(expectedCanal);
        });
    });
 
    videoData.videos.forEach(video => {
    test(`Todos os canais devem ser strings não vazias - Canal do vídeo com ID ${video.videoId}`, async () => {
      
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(typeof canal).toBe('string');
            expect(canal).not.toBe('');
        
    });
});

    
        // Teste de comprimento mínimo e máximo do nome do canal
        videoData.videos.forEach(video => {
        test(`O nome do canal deve ter comprimento entre 1 e 100 caracteres - Canal do vídeo com ID ${video.videoId}`, async () => {
                const videoId = video.videoId;
                const canal = await youtubeServices.getChannelName(videoId);
                expect(canal.length).toBeGreaterThanOrEqual(1);
                expect(canal.length).toBeLessThanOrEqual(100);
            
        });
    });
    
    videoData.videos.forEach(video => {
            // Teste de nome de canal em branco
    test(`O nome do canal não deve ser em branco - Canal do vídeo com ID ${video.videoId}`, async () => {
        
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).not.toBe('');
        
    });
    });

    // Teste de nome de canal com espaços em branco
    videoData.videos.forEach(video => {
    test(`O nome do canal não deve ser apenas espaços em branco - Canal do vídeo com ID ${video.videoId}`, async () => {
     
            const videoId = video.videoId;
            const canal = await youtubeServices.getChannelName(videoId);
            expect(canal).not.toMatch(/^\s+$/);
    
        });
    });
  

});
