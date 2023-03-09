const axios = require('axios');
const { UNSPLASH_CLIENT_ID } = require('../config');

const getRandomImage = async () => {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
            collections: 1114848
        },
        headers: {
            Authorization: `Client-ID ${UNSPLASH_CLIENT_ID}`
        }
    })
    return resp.data.urls.small;
}

module.exports = getRandomImage;