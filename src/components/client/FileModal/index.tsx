import { GalleryClicker, ImageLoader, MusicPlayer, Portal, VideoPlayer } from '..';
import React, { useEffect, useState, useRef } from 'react';
import { useSelectedFiles } from '../Files/FilesProvider';

const FileModal = ({ children }: { children: JSX.Element }) => {
  const { isOpen, openOrCloseSelectedFiles, currentPlay } = useSelectedFiles();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      openOrCloseSelectedFiles(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      handleClickOutside(e);
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  const getContentFromFormat = (format: string) => {
    switch (format) {
      case 'image':
        return <ImageLoader key="image" />;
      case 'video':
        return <VideoPlayer key="video" />;
      case 'audio':
        return <MusicPlayer key="audio" />;
      default:
        return <div className="text-white">Sorry,cannot read the file</div>;
    }
  };
  const [pContent, setPContent] = useState<React.ReactNode[]>(
    isOpen ? [getContentFromFormat(currentPlay.type)] : []
  );
  useEffect(() => {
    if (isOpen) {
      setPContent([getContentFromFormat(currentPlay.type)]);
      console.log(currentPlay.type);
    }
  }, [isOpen, currentPlay]);

  return (
    <>
      {isOpen && (
        <Portal isShow={isOpen} portalRef={ref}>
          <div className="w-[750px] bg-black">
            {pContent}
            <GalleryClicker />
          </div>
        </Portal>
      )}
    </>
  );
};

export default FileModal;
