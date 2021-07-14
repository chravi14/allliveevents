import React, { useEffect } from "react";
import "./Players.css";
import axios from "axios";

const Players = ({ channels, pageTitle }) => {
  useEffect(() => {
    channels.forEach((channel, index) => {
      const elementName = channel.id;
      const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${channel.id}/events/`;
      const options = {
        method: "GET",
        qs: { page: "1", page_length: "10" },
        headers: {
          Accept: "application/json",
          Authorization:
            "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
        },
      };

      axios
        .get(url, options)
        .then((res) => {
          const events = res.data.events;
          const mediaId = events.length > 0 ? events[0]["media_id"] : null;
          const streamCompleted =
            events.length > 0 && events[0]["status"] === "completed"
              ? true
              : false;
          if (mediaId && !streamCompleted) {
            const mediaUrl = `https://api.jwplayer.com/v2/sites/3TrTO9d1/media/${mediaId}`;
            axios
              .get(mediaUrl, options)
              .then((res) => {
                console.log(res);
                window.jwplayer(elementName).setup({
                  playlist: [
                    {
                      file: res.data.source_url,
                    },
                  ],
                  height: 360,
                  width: 540,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            window.jwplayer(elementName).setup({
              playlist: "https://cdn.jwplayer.com/v2/playlists/w6kHyfZa",
              height: 360,
              width: 500,
              repeat: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <div className="row">
      {channels.map((channel, index) => {
        return (
          <div key={index} className="col-md-5 field">
            <div id={channel.id}></div>
            <div className="court-details">
              <h3 className="name">{channel.metadata.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
