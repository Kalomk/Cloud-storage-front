import React, { useState, useRef } from 'react';

interface Track {
  id: number;
  title: string;
  source: string;
}

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  const tracks: Track[] = [
    {
      id: 1,
      title: 'Song 1',
      source: 'path/to/song1.mp3',
    },
    {
      id: 2,
      title: 'Song 2',
      source: 'path/to/song2.mp3',
    },
    // Add more tracks as needed
  ];

  const playPauseToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTrackClick = (track: Track) => {
    if (currentTrack === track.id) {
      playPauseToggle();
    } else {
      setCurrentTrack(track.id);
      if (audioRef.current) {
        audioRef.current.src = track.source;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="music-player">
      <div className="track-list">
        <h2>Tracklist</h2>
        <ul>
          {tracks.map((track) => (
            <li key={track.id} onClick={() => handleTrackClick(track)}>
              {track.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="audio-controls">
        <h2>Now Playing</h2>
        <div className="track-info">
          {currentTrack !== null && (
            <p>{tracks.find((track) => track.id === currentTrack)?.title}</p>
          )}
        </div>

        <audio ref={audioRef} controls />

        <button className="play-pause-button" onClick={playPauseToggle}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
