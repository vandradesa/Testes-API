const axios = require('axios');
const youtubeServices = require('../src/youtubeServices');
const { setupTitle } = require('./mocks/setupTitle.mock');
const { setupDescription } = require('./mocks/setupDescription.mock');
const { verifyCall } = require('./mocks/verifyCall.mock')

jest.mock('axios');

describe('deve retornar título do vídeo', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('título: 📚 A biblioteca Axios para Requisições HTTP no JavaScript', async () => {
        const videoId = 'Lu4BbMPBXGc';
        const title = '📚 A Biblioteca Axios para Requisições HTTP no JavaScript';
        
        setupTitle(videoId, title);

        const result = await youtubeServices.getTitle(videoId);
        console.log(result)

        verifyCall(videoId)
        expect(result).toEqual({ title: title });
    });

    it('título: Como começar BEM no Stardew Valley! 🤩', async () => {
        const videoId = 'd0jPS1q7mus';
        const title = 'Como começar BEM no Stardew Valley! 🤩';
        
        setupTitle(videoId, title);
        
        const result = await youtubeServices.getTitle(videoId);

        verifyCall(videoId)
        expect(result).toEqual({ title: title });
    });

    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const videoId = 'wn7Ig1AShlM';
        const title = '25 DICAS RÁPIDAS para INICIANTES no Stardew Valley';
        
        setupTitle(videoId, title);

        const result = await youtubeServices.getTitle(videoId);
        

        verifyCall(videoId)
        expect(result).toEqual({ title: title });
    });
});

describe('deve retornar com sucesso que a palavra Stardew Valley está no título do vídeo', () => {
    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const videoId = 'wn7Ig1AShlM';
        const title = '25 DICAS RÁPIDAS para INICIANTES no Stardew Valley';
        
        setupTitle(videoId, title);

        const result = await youtubeServices.getTitle(videoId);

        verifyCall(videoId)
        expect(result.title).toContain('Stardew Valley');
    });

    it('título: Como começar BEM no Stardew Valley! 🤩', async () => {
        const videoId = 'd0jPS1q7mus';
        const title = 'Como começar BEM no Stardew Valley! 🤩';
        
        setupTitle(videoId, title);

        const result = await youtubeServices.getTitle(videoId);

        verifyCall(videoId)
        expect(result.title).toContain('Stardew Valley');
    });
});
/*
describe('Deve retornar com sucesso que a palavra axios está na descrição do vídeo', () => {
    it('título: 📚 A biblioteca Axios para Requisições HTTP no JavaScript')
        const videoId = 'Lu4BbMPBXGc'
        const description = ''

        setupDescription(videoId)
        expect(result.description).toContain('axios')

})
*/