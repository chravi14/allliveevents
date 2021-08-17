import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import introVideo from "./../../assets/video.mp4";
import logo from "./../../assets/logo.png";
import Speaker from "./../../assets/speaker.png";
import Pause from "./../../assets/pause.png";
import Mute from "./../../assets/mute.png";
import Play from "./../../assets/play.png";
import VideoPlayer from "react-video-js-player";

const Introduction = () => {
  const loginBtn = React.createRef();
  const videoRef = React.createRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [playOrPauseSrc, setPlayOrPause] = useState(Pause);
  const [speakerSrc, setSpeakerSrc] = useState(Mute);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setPlayOrPause(
        "https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/video512x512.png"
      );
    } else {
      videoRef.current.play();
      setPlayOrPause(Pause);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      setSpeakerSrc(Speaker);
    } else {
      videoRef.current.muted = true;
      setSpeakerSrc(Mute);
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="introBg">
        <video
          type="video/mp4"
          preload="metadata"
          src={introVideo}
          ref={videoRef}
          autoPlay
          muted
          className="introVideo"
        />
      </div>
      <div className="introContent">
        <h1 className="introH1">Welcome to</h1>
        <img src={logo} alt="AAL Logo" />
        <p className="introP">
          We provide you an opportunity to watch all the live events online.
        </p>
      </div>
      <div className="btnContent">
        <a
          className="btn btn-danger"
          ref={loginBtn}
          id="memberspace-login"
          href="https://members.aaliveevents.com/member/sign_in"
        >
          Join Now / Login
        </a>
        <p className="btnText">
          To access the Tournaments page, create an account or login and
          purchase a $10 daily pass.
        </p>
      </div>
      <div className="controls">
        <div className="pause">
          <img
            src={playOrPauseSrc}
            alt="Play or Pause"
            onClick={togglePlay}
            width="42px"
            height="42px"
          />
        </div>
        <div className="volume">
          <img
            src={speakerSrc}
            alt="Mute or Unmute"
            onClick={toggleMute}
            width="40px"
            height="40px"
          />
        </div>
      </div>
    </>
  );
};

export default Introduction;
