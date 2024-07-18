const { setupMock } = require('./mocks/setupMock');
const { readDataMock } = require('./functions/readDataMock')

describe('deve retornar o título do vídeo', () => {
    it('título: 📚 A biblioteca Axios para Requisições HTTP no JavaScript', async () => {
        const result = await setupMock('Lu4BbMPBXGc', await readDataMock("Lu4BbMPBXGc", "title"));
        expect(result.title).toEqual('📚 A Biblioteca Axios para Requisições HTTP no JavaScript');
    });

    it('título: Como começar BEM no Stardew Valley! 🤩', async () => {
        const result = await setupMock('d0jPS1q7mus', await readDataMock("d0jPS1q7mus", "title"));
        expect(result.title).toEqual('Como começar BEM no Stardew Valley! 🤩');
    });

    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const result = await setupMock('wn7Ig1AShlM', await readDataMock("wn7Ig1AShlM", "title"));
        expect(result.title).toEqual('25 DICAS RÁPIDAS para INICIANTES no Stardew Valley');
    });
})

describe('deve retornar com sucesso que a palavra Stardew Valley está na descrição' , () => {
    it('título: Como começar BEM no Stardew Valley! 🤩', async () => {
        const result = await setupMock('d0jPS1q7mus', '', await readDataMock("d0jPS1q7mus", "description"));
        expect(result.description).toContain('StardewValley');
    });

    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const result = await setupMock('wn7Ig1AShlM', '', await readDataMock("wn7Ig1AShlM", "description"));
        expect(result.description).toContain('StardewValley');
    });
})

describe('deve retornar que a palavra sino NÃO está na descrição' , () => {
    it('título: 📚 A biblioteca Axios para Requisições HTTP no JavaScript ', async () => {
        const result = await setupMock('Lu4BbMPBXGc', '', await readDataMock("Lu4BbMPBXGc", "description"));
        expect(result.description).not.toContain('sino');
    })

    it('título: Como começar BEM no Stardew Valley! 🤩 ', async () => {
        const result = await setupMock('d0jPS1q7mus', await readDataMock("Lu4BbMPBXGc", "description"));
        expect(result).not.toContain('sino');
    })

    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const result = await setupMock('wn7Ig1AShlM', await readDataMock("wn7Ig1AShlM", "description"));
        expect(result).not.toContain('sino');
    })
});

describe('deve retornar erro ao inserir id de vídeo incorreto' , () => {
    it('video id = aabc', async () => {
        const result = await setupMock('aabc', '');
        expect(result).toEqual('Erro ao buscar vídeo');
    })

    it('video id = eeadc31313a', async () => {
        const result = await setupMock('eeadc31313a', '');
        expect(result).toEqual('Erro ao buscar vídeo');
    })
});

describe('deve retornar valores igual ou acima do esperado para views',() => {
    it('título: 25 DICAS RÁPIDAS para INICIANTES no Stardew Valley', async () => {
        const result = await setupMock('wn7Ig1AShlM', '', '', await readDataMock("wn7Ig1AShlM", 'viewCount'));
        expect(result.viewCount).toBeGreaterThanOrEqual(820000)
    });
});


    