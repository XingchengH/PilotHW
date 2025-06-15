import { useEffect, useRef, useState } from "react";

import ThatBoyWasNeverGonnaChange from "../../assets/audio/That Boy Was Never Gonna Change.mp3";
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

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    }
  }, [])


  return (
    <>
      <div className="container mt-4 text-center">
        <div className="audio-container">
          <audio className="w-75 my-3 border rounded-5 shadow" controls ref={audioRef}>
            <source src={ThatBoyWasNeverGonnaChange} type="audio/mpeg" />
            Your browser does not suppoet the audio element
          </audio>
        </div>
        <div className="text-center btn-group mt-3">
          <button
            className={`btn px-5 ${isPlaying ? 'btn-secondary disabled btn-outline-primary' : 'btn-primary text-black'}`}
            onClick={handleClick}
          >
            Play
          </button>
          <button
            className={`btn px-5 ${isPlaying ? 'btn-primary text-black' : 'btn-secondary disabled btn-outline-primary'}`}
            onClick={handleClick}
          >
            Pause
          </button>
        </div>
      </div>
    </>
  );
}
