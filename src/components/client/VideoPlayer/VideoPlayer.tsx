import React, { useRef, useEffect, useState } from 'react';
import useDoubleClick from '@/hooks/useDoubleClick';
import { FastForwardOutlined, FastBackwardOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useSelectedFiles } from '../Files/FilesProvider';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMovedForward, setIsMovedForward] = useState<boolean>(false);
  const [isMovedBackward, setIsMovedBackward] = useState<boolean>(false);
  const { currentPlay } = useSelectedFiles();
  const blinkInterval = useRef<NodeJS.Timeout | null>(null);

  const blinkMoveIcons = (setIsMoved: (isMoved: boolean) => void) => {
    if (blinkInterval.current != null) clearInterval(blinkInterval.current);
    setIsMoved(true);
    blinkInterval.current = setInterval(() => {
      setIsMoved(false);
    }, 75);
  };

  const changeVideoSource = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the current video
      videoRef.current.src = currentPlay.path; // Set the new video source
      videoRef.current.load(); // Load the new video
      videoRef.current.play(); // Play the new video
    }
  };

  const doubleClickForward = useDoubleClick({
    click: () => pauseVideo(),
    doubleClick: () => skipForward(),
  });
  const doubleClickBackward = useDoubleClick({
    click: () => pauseVideo(),
    doubleClick: () => skipBackward(),
  });

  // Function to play the video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
      blinkMoveIcons(setIsMovedForward);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
      blinkMoveIcons(setIsMovedBackward);
    }
  };

  const playOrPause = (e: any) => {
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        playVideo();
        setIsPaused(false); // Set isPaused to false when playing
      } else {
        pauseVideo();
        setIsPaused(true); // Set isPaused to true when paused
      }
    }
  };

  useEffect(() => {
    // Automatically play the video when the component mounts
    playVideo();
  }, []);

  useEffect(() => {
    // Watch for changes in currentPlay and change video source accordingly
    changeVideoSource();
  }, [currentPlay]);

  useEffect(() => {
    // Add event listeners for play and pause events
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => {
        setIsPaused(false);
      });

      videoRef.current.addEventListener('pause', () => {
        setIsPaused(true);
      });
    }

    // Cleanup event listeners when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', () => {
          setIsPaused(false);
        });

        videoRef.current.removeEventListener('pause', () => {
          setIsPaused(true);
        });
      }
    };
  }, []);

  return (
    <div className="player flex flex-col items-center justify-center">
      <div className="relative">
        <video onClick={playOrPause} className="w-full h-full relative" ref={videoRef} controls>
          <source src={currentPlay.path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {isPaused && (
          <div
            onClick={playOrPause}
            className="cursor-pointer hover:scale-[1.25] w-[64px] h-[64px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  right-0 bottom-0 flex justify-center items-center"
          >
            <CaretRightOutlined style={{ fontSize: '64px', color: 'white' }} />
          </div>
        )}
        <div
          onClick={doubleClickBackward}
          className="color-white text-[52px] z-20 absolute left-0 top-0 h-[80%] w-[20%]"
        >
          {isMovedBackward ? (
            <FastBackwardOutlined className="left-[10px] absolute top-[50%] translate-y-[-70%]" />
          ) : null}
        </div>
        <div
          onClick={doubleClickForward}
          className="color-white text-[52px] z-20 absolute right-[10px] top-0 h-[80%] w-[20%]"
        >
          {isMovedForward ? (
            <FastForwardOutlined className="absolute right-0 top-[50%] translate-y-[-70%]" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
