
/*
getVideoComments: async function (videoId) {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
            params: {
                part: 'snippet',
                videoId: videoId,
                maxResults: 100, // Limitar a 100 comentários
                key: process.env.YOUTUBE_API_KEY
            }
        });

        const comments = response.data.items.map(item => {
            return item.snippet.topLevelComment.snippet.textDisplay;
        });

        return comments;

    } catch (error) {
        console.error('Erro ao encontrar os comentários:', error);
        return 'Erro ao encontrar os comentários';
    }
}

 */