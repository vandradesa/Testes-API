const youtubeServices = require('../src/youtubeServices');
const videoData = require('../__test__/json/dataMock.json');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config({path: '.env'});


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