import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import axios from '../../../../core/axios';
import MiniPlayer from './MiniPlayer';

const VideoFile = ({
  fileName,
  isVideoPlay = true,
}: {
  fileName: string;
  isVideoPlay?: boolean;
}) => {
  //variables
  const [loading, setLoading] = useState(true);
  const videoName = fileName.split('/').pop()?.split('.').shift();
  const folderName = fileName.split('/').shift();

  let intervalId: NodeJS.Timeout | null = null; // Declare intervalId here

  //constants
  const THUMBNAIL_INTERVAL = 10000; // 10 seconds
  const THUMBNAIL_BASE_URL = `${axios.defaults.baseURL}/uploads/${folderName}/thumbnails/`;

  const fetchThumbnail = async () => {
    try {
      const response = await axios.get(`${THUMBNAIL_BASE_URL}screenshot-${videoName}.png`);

      if (response.status === 200) {
        if (intervalId) {
          clearInterval(intervalId); // Stop the interval
        }

        setLoading(false); // Set loading to false
      } else if (response.status === 404) {
        setLoading(true); // Set loading to true
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(true); // Set loading to true
    }
  };

  useEffect(() => {
    // Fetch the thumbnail initially
    fetchThumbnail();

    // Set up an interval to fetch the thumbnail every 10 seconds
    intervalId = setInterval(fetchThumbnail, THUMBNAIL_INTERVAL);

    // Clean up the interval when the component unmounts

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fileName]);

  const renderContent = () => {
    if (loading) {
      return <Spin size="large" />;
    }
    return (
      <MiniPlayer
        videoName={videoName!}
        folderName={folderName!}
        isVideoPlay={isVideoPlay}
        fallbackImgPath={THUMBNAIL_BASE_URL}
      />
    );
  };

  return (
    <div
      className={`${
        isVideoPlay ? 'hover:scale-125' : ''
      } duration-120 w-[150px] h-[150px] flex items-center justify-center bg-black relative overflow-hidden`}
    >
      {renderContent()}
    </div>
  );
};

export default VideoFile;
