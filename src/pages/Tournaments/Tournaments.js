import React, { useEffect, useState } from "react";
import Players from "./../../components/Players/Players";
import { getChannelsByCategory } from "./../../shared/data";
import Loader from "./../../components/UI/Loader";

const Tournaments = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [eventChannels, setEventChannels] = useState([]);

  useEffect(() => {
    setShowLoader(true);
    getChannelsByCategory("tournaments").then((res) => {
      setShowLoader(false);
      if (res.length > 0) {
        setEventChannels(res);
      } else {
        window.jwplayer("trailer").setup({
          playlist: "https://cdn.jwplayer.com/v2/playlists/w6kHyfZa",
          height: 360,
          width: 750,
          repeat: true,
        });
      }
    });
  }, []);

  return showLoader ? (
    <Loader />
  ) : (
    <>
      <div className="sports">
        <h1 className="main-header">Tournaments</h1>
      </div>
      {eventChannels.length > 0 ? (
        <Players channels={eventChannels} pageTitle="Tournaments" />
      ) : (
        <div className="empty">
          There are no events happening under this category.
          <div className="row">
            <div className="col-md-6 offset-md-2">
              <div id="trailer" className="m-auto"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tournaments;
