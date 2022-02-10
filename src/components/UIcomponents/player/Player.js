import React, { useEffect, useState, useRef } from "react";

import "./styles.css";

import { SoundOutlined } from "@ant-design/icons";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = (props) => {
  const { url, passive } = props;
  const [playing, toggle] = useAudio(url);

  return (
    <>
      {passive ? (
        <SoundOutlined className="player__sound-icon-disabled" />
      ) : (
        <SoundOutlined
          className={
            ("new",
            playing ? "player__sound-icon-playing" : "player__sound-icon")
          }
          // className="player__sound-icon"
          onClick={toggle}
        />
      )}
    </>
  );
};

export default Player;
