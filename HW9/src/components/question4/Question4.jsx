import { useEffect, useRef, useState } from "react";
import ThatBoyWasNeverGonnaChange from "../../assets/audio/That Boy Was Never Gonna Change.mp3";
import styles from './Question4.module.css'

export default function Question4() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function handleClick() {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);


  return (
    <>
      <div className={`container mt-5 p-5 text-center border rounded-3  bg-transparent ${styles.containerBg}`}>
        <p className={`p-3 rounded-3 fw-bold fst-italic ${styles.glass}`}>
          That Boy Was Never Gonna Change - Madilyn
        </p>
        <div className="audio-container mt-5">
          <audio
            className="w-75 mb-3 border rounded-5 shadow"
            controls
            ref={audioRef}
          >
            <source src={ThatBoyWasNeverGonnaChange} type="audio/mpeg" />
            Your browser does not suppoet the audio element
          </audio>
        </div>
        <div className="text-center btn-group mt-3">
          <button
            className={`btn px-5 text-white ${
              isPlaying
                ? "btn-secondary disabled btn-outline-primary"
                : "btn-primary text-black"
            }`}
            onClick={handleClick}
          >
            Play
          </button>
          <button
            className={`btn px-5 text-white ${
              isPlaying
                ? "btn-primary text-black"
                : "btn-secondary disabled btn-outline-primary"
            }`}
            onClick={handleClick}
          >
            Pause
          </button>
        </div>
      </div>
    </>
  );
}
