import React, { useRef, useEffect, useState } from 'react';
import { useSelectedFiles } from '../Files/FilesProvider';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPlay } = useSelectedFiles();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[10px]">
      <audio ref={audioRef} controls>
        <source src={currentPlay.path} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <br />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default MusicPlayer;
