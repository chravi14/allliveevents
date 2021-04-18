import axios from 'axios';

export const channelCourtMap = {
    1: "court1",
    2: "court2",
    3: "court3",
}

export const getChannelIDs = () => {
    const url = 'https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/';

    const options = {
        method: 'GET',
        qs: { page: '1', page_length: '10' },
        headers: {
            Accept: 'application/json',
            Authorization: 'ADD API Key here'
        }
    };
    return axios.get(url, options).then(response => {
        return response.data.channels;
    });

}

export const getWeddingChannelId = () => {
    return "m9jrfF7Q";
}