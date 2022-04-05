import React, { useEffect } from "react";
import Download from "./../../assets/download_icon.png";

const RecordedEvents = (props) => {
  console.log(props.recordedEvents);
  useEffect(() => {
    props.recordedEvents.map((media) => {
      const elementName = media.id;
      const playerInstance = window.jwplayer(elementName).setup({
        playlist: `https://cdn.jwplayer.com/v2/media/${media.id}?max_resolution=1920`,
        height: "100%",
        width: "100%",
        displaytitle: true,
      });

      const buttonId = "download-video-button";
      const iconPath = Download;
      const tooltipText = "Download Video";
      var downloadUrl = "";
      playerInstance.on("playlistItem", function (e) {
        console.log(e.item);
        downloadUrl = e.item.allSources.find(
          (source) => source.type === "mp4" && source.height === 720
        )?.file;
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
        if (fileUrl) {
          anchor.setAttribute("href", fileUrl);
          anchor.setAttribute("target", "_blank");

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
        } else {
          alert("There is no file for this media item.");
        }
      }
    });
  }, [props.recordedEvents]);

  const pageNumbers = new Array(Math.floor(props.count / 50)).fill(0);
  console.log(pageNumbers);

  const goToNextPage = () => {
    if (props.currentPage < pageNumbers.length) {
      props.paginationClick(props.currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (props.currentPage > 1) {
      props.paginationClick(props.currentPage - 1);
    }
  };
  console.log(props.count);

  const mediaPlayer = props.recordedEvents.map((media) => {
    return (
      <div key={media.id} className="col-md-4 mt-4">
        <div className="card">
          <div id={media.id}></div>
        </div>
      </div>
    );
  });

  const pageClickHandler = (event, pageNum) => {
    event.preventDefault();
    props.paginationClick(pageNum);
  };

  const paginationSection = pageNumbers.map((pageNumber, index) => {
    let pageActiveClassName =
      index + 1 === props.currentPage ? "page-item active" : "page-item";
    return (
      <li className={pageActiveClassName}>
        <a
          className="page-link"
          href="#"
          onClick={(event) => pageClickHandler(event, index + 1)}
        >
          {index + 1}
        </a>
      </li>
    );
  });

  return (
    <div className="events-container">
      <h5 className="mt-2">Recorded Events</h5>
      {/* <nav aria-label="Page navigation example"> */}
      <ul className="pagination justify-content-center">
        <li
          className={`page-item${props.currentPage === 1 ? " disabled" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => goToPrevPage()}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {paginationSection}
        <li
          className={`page-item${
            props.currentPage === pageNumbers.length ? " disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => goToNextPage()}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
      {/* </nav> */}
      <div className="row">{mediaPlayer}</div>
    </div>
  );
};

export default RecordedEvents;
