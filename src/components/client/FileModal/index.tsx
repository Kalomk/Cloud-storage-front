import {
  GalleryClicker,
  ImageLoader,
  MusicPlayer,
  PdfReader,
  Portal,
  TextReader,
  VideoPlayer,
} from '..';
import React, { useEffect, useState, useRef } from 'react';
import { useSelectedFiles } from '../Files/FilesProvider';

const FileModal = () => {
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
    // Add a class to the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isOpen]);

  const getContentFromFormat = (format: string) => {
    switch (format) {
      case 'image':
        return <ImageLoader key="image" />;
      case 'video':
        return <VideoPlayer key="video" />;
      case 'audio':
        return <MusicPlayer key="audio" />;
      case 'pdf':
        return <PdfReader key="pdf" />;
      case 'text':
        return <TextReader key="text" />;
      default:
        return (
          <div className="text-white flex flex-col justify-center items-center pt-[10px]">
            Sorry,cannot read the file
          </div>
        );
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
