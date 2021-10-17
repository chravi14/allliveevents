import React, { useState, useEffect } from "react";
import Download from "./../../assets/download_icon.png";

const RecordedEvents = (props) => {
  console.log(props.recordedEvents);
  useEffect(() => {
    props.recordedEvents.map((re) => {
      const elementName = re.media_id;
      const playerInstance = window.jwplayer(elementName).setup({
        playlist: `https://cdn.jwplayer.com/v2/media/${re.media_id}`,
        height: "100%",
        width: "100%",
        displaytitle: true,
      });

      const buttonId = "download-video-button";
      const iconPath = Download;
      const tooltipText = "Download Video";
      var downloadUrl = "";
      playerInstance.on("playlistItem", function (e) {
        downloadUrl = e.item.allSources[5].file;
        console.log("This is the download URL", downloadUrl);
      });

      // Call the player's `addButton` API method to add the custom button
      playerInstance.addButton(
        iconPath,
        tooltipText,
        buttonClickAction,
        buttonId
      );

      // This function is executed when the button is clicked
      function buttonClickAction() {
        const playlistItem = playerInstance.getPlaylistItem();
        console.log(playlistItem);
        // Create an anchor element
        const anchor = document.createElement("a");

        // Set the anchor's `href` attribute to the media's file URL
        const fileUrl = downloadUrl;
        anchor.setAttribute("href", fileUrl);

        // set the anchor's `download` attribute to the media's file name
        const downloadName = playlistItem.file.split("/").pop();
        anchor.setAttribute("download", downloadName);

        // Set the anchor's style to hide it when it's added to the page
        anchor.style.display = "none";

        // Add the anchor to the page
        document.body.appendChild(anchor);

        // Trigger a click event to activate the anchor
        anchor.click();

        // Remove the anchor from the page, it's not needed anymore
        document.body.removeChild(anchor);
      }
    });
  }, []);

  const mediaPlayer = props.recordedEvents.map((re) => {
    return (
      <div key={re.media_id} className="col-md-4 mt-4">
        <div className="card">
          <div id={re.media_id}></div>
        </div>
      </div>
    );
  });

  return (
    <div className="events-container">
      <h5 className="mt-2">Recorded Events</h5>
      <div className="row">{mediaPlayer}</div>
    </div>
  );
};

export default RecordedEvents;
