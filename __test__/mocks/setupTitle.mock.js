const axios = require('axios');

const setupMockAxios = (videoId, title) => {
    return {
        status: 200,
        data: {
            items: [
                {
                    snippet: {
                        id: videoId,
                        title: title
                    }
                }
            ]
        }
    };
};

const setupTitle = (videoId, title) => {
    const response = setupMockAxios(videoId, title);
    axios.get.mockResolvedValue(response);
};

module.exports = {
    setupTitle
};