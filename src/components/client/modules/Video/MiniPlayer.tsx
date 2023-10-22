import Image from 'next/image';
import DelayedComponent from '../../DelayedComponent/DelayedComponent';
import axios from '../../../../core/axios';
import { useState, useRef } from 'react';
import { ProgressBar } from '../..';
import useDebounce from '@/hooks/useDebounce';

interface MiniPlayerProps {
  fallbackImgPath: string;
  videoName: string;
  isVideoPlay: boolean;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ videoName, fallbackImgPath, isVideoPlay }) => {
  // Constants
  const VIDEO_SRC = `${axios.defaults.baseURL}/uploads/videoPreview-${videoName}.mp4`;
  const videoPrewRef = useRef<HTMLDivElement | any>(null);
  // States
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { debounceFunc, clearDebounceTimeout } = useDebounce(() => startBar, 300, true);
  // Progress bar function
  const startBar = async () => {
    const url = await videoPrewRef.current.fetchProgress();
    setVideoUrl(url);
  };

  const resetBar = () => {
    clearDebounceTimeout();
    videoPrewRef.current.resetProgress();
    setVideoUrl('');
  };

  const Thumbnail = () => {
    return (
      <Image
        className="rounded-[5px] z-10 object-cover"
        src={`${fallbackImgPath}screenshot-${videoName}.png`}
        priority={true}
        alt="file"
        width={150}
        height={150}
      />
    );
  };

  if (!isVideoPlay) {
    return <Thumbnail />;
  }

  return (
    <div onMouseEnter={debounceFunc} onMouseLeave={resetBar} className="absolute top-0 left-0">
      <DelayedComponent conditional={!!videoUrl} timeout={600} fallback={<Thumbnail />}>
        <div className="w-[200px] h-[200px] relative z-20">
          <video className="w-[150px] h-[150px]" autoPlay loop>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag. //{' '}
          </video>
        </div>
      </DelayedComponent>
      <div className={`translate-y-[3px] mt-[-12px] relative z-10`}>
        <ProgressBar ref={videoPrewRef} path={VIDEO_SRC} />
      </div>
    </div>
  );
};

export default MiniPlayer;
