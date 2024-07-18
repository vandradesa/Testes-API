const fs = require('fs').promises;
const filePath = '/home/v.glima/treinamento-projetos/Testes-API/__test__/json/dataMock.json';

async function readDataMock(videoId, flag) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);

        const video = jsonData.find(video => video.videoId === videoId);

        if (video){
            if(flag === "title"){
                return video.title;
            }

            if(flag === "description"){
                return video.description
            }

            if(flag === "viewCount"){
                return video.viewCount
                
            }
        }
        
        return ""; 

    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        return null;
    }
}
/*
(async () => {
    const title = await readDataMock("wn7Ig1AShlM", "viewCount");
    console.log(title);
})();
*/

module.exports = { readDataMock };