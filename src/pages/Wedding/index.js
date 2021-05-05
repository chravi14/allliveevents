import React, { useEffect, useState } from 'react';
import './Wedding.css';
import axios from 'axios';
import WeddingPoster from './../../assets/Wedding_All.png';
import { getWeddingChannelId } from './../../shared/data';

const Wedding = () => {
    const [showWeddingImage, setShowWeddingImage] = useState(false);
    useEffect(() => {
        const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${getWeddingChannelId()}/events/`;
        const options = {
            method: 'GET',
            qs: { page: '1', page_length: '10' },
            headers: {
                Accept: 'application/json',
                Authorization: 'ADD AUthorization key here'
            }
        };
        axios.get(url, options).then(res => {
            console.log(res)
            const events = res.data.events;
            const mediaId = events.length > 0 ? events[0]['media_id'] : null;
            const streamCompleted = events.length > 0 && events[0]['status'] === 'completed' ? true : false;
            console.log("Video Id is ", mediaId);
            if (mediaId && !streamCompleted) {
                setShowWeddingImage(false);
                const mediaUrl = `https://api.jwplayer.com/v2/sites/3TrTO9d1/media/${mediaId}`;
                axios.get(mediaUrl, options).then(res => {
                    console.log(res);
                    // setSourceUrl(res.data.source_url)
                    window.jwplayer("weddingPlayer").setup({
                        "playlist": [{
                            "file": res.data.source_url
                        }],
                        "height": 360,
                        "width": 540,
                    });
                }).catch(err => {
                    console.log(err)
                })
            } else {
                setShowWeddingImage(true)
                // window.jwplayer("weddingPlayer").setup({
                //     "playlist": "https://cdn.jwplayer.com/v2/playlists/w6kHyfZa",
                //     "height": 360,
                //     "width": 500,
                //     "repeat": true,
                // });
            }

        }).catch(err => {
            console.log(err)
        })
    })

    return (
        <div className="wedding">
            <h1 className="main-header">Wedding Events</h1>
            <div id="weddingPlayer"></div>
            {showWeddingImage ? (<div id="weddingPoster"><img src={WeddingPoster} width="500px" alt="weddingImage" /></div>) : null}
        </div>
    )
}

export default Wedding;