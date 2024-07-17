const axios = require('axios');

const setupMockAxios = (videoId, description) => {
    return {
        status: 200,
        data: {
            items: [
                {
                    snippet: {
                        id: videoId,
                        description: description
                    }
                }
            ]
        }
    };
};

const setupTitle = (videoId, description) => {
    const response = setupMockAxios(videoId, description);
    axios.get.mockResolvedValue(response);
};

module.exports = {
    setupTitle
};