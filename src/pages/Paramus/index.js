import React, { useEffect, useState } from 'react';
import './Paramus.css';
import axios from 'axios';
import { getParamusChannelIDs, channelCourtMap } from './../../shared/data';

const Paramus = () => {
    const [courts, setCourts] = useState(getParamusChannelIDs);
    console.log(courts);
    useEffect(() => {
        courts.forEach((channel, index) => {
            const elementName = channel.elementName;
            console.log(elementName);
            const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${channel.id}/events/`;
            const options = {
                method: 'GET',
                qs: { page: '1', page_length: '10' },
                headers: {
                    Accept: 'application/json',
                    Authorization: 'dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn'
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
    }, [])
    const videoPlayers = (
        <div className="players">
            <p className="intro">Please click on any of the courts to start watching the event.</p>
            <div className="row">
                {courts.map((court, index) => {
                    return (<div className="col-md-5 field">
                        <div id={court.elementName} ></div>
                        <div className="court-details">
                            <h3 className="name">{court.name}</h3>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
    return (
        <div className="sports">
            <h1 className="main-header">Paramus High School</h1>
            {videoPlayers}
        </div>
    )
}

export default Paramus;