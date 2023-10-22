import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSelectedFiles } from '../Files/FilesProvider';

const ImageLoader = () => {
  const { currentPlay } = useSelectedFiles();
  return (
    <div className="text-white p-[11px] flex justify-center itens-center">
      <Image
        className="rounded-[5px] object-cover w-5/12 h-3/6"
        src={currentPlay.path}
        priority={true}
        alt="image-loader-content"
        width={150}
        height={150}
      />
    </div>
  );
};

export default ImageLoader;
