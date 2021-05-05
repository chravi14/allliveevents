import React, { useEffect, useState } from 'react';
import './Sports.css';
import axios from 'axios';
import { getChannelIDs, channelCourtMap } from './../../shared/data';

const Sports = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        if (!isDisabled) {
            getChannelIDs().then(data => {
                const channels = data;
                console.log(channels);
                channels.forEach((channel, index) => {
                    const elementName = channelCourtMap[index + 1];
                    console.log(elementName);
                    const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${channel.id}/events/`;
                    const options = {
                        method: 'GET',
                        qs: { page: '1', page_length: '10' },
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Add AUTH KEY here'
                        }
                    };

                    axios.get(url, options).then(res => {
                        console.log(res)
                        const events = res.data.events;
                        const mediaId = events.length > 0 ? events[0]['media_id'] : null;
                        const streamCompleted = events.length > 0 && events[0]['status'] === 'completed' ? true : false;
                        console.log("Video Id is ", mediaId);
                        if (mediaId && !streamCompleted) {
                            const mediaUrl = `https://api.jwplayer.com/v2/sites/3TrTO9d1/media/${mediaId}`;
                            axios.get(mediaUrl, options).then(res => {
                                console.log(res);
                                window.jwplayer(elementName).setup({
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
                            window.jwplayer(elementName).setup({
                                "playlist": "https://cdn.jwplayer.com/v2/playlists/w6kHyfZa",
                                "height": 360,
                                "width": 500,
                                "repeat": true,
                            });
                        }

                    }).catch(err => {
                        console.log(err)
                    })
                })
            }).catch(err => {
                console.log(err)
            });
        }
    }, [])
    const videoPlayers = (
        <div className="players">
            <p className="intro">Please click on any of the courts to start watching the event.</p>
            <div className="row">
                <div className="col-md-5 mr-5">
                    <div id="court1"></div>
                    <div className="court-details">
                        <h3 className="name">Court 1</h3>
                    </div>
                </div>
                <div className="col-md-5 ml-5">
                    <div id="court2"></div>
                    <div className="court-details">
                        <h3 className="name">Court 2</h3>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-5 offset-md-3">
                    <div id="court3"></div>
                    <div className="court-details">
                        <h3 className="name">Court 3</h3>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="sports">
            <h1 className="main-header">Tournaments</h1>
            {isDisabled ? "There are no events happening right now." : videoPlayers}
        </div>
    )
}

export default Sports;