import React from 'react';
import { FileOutlined } from '@ant-design/icons';
import {
  getExtensionByFileName,
  isImage,
  getColorByExtencion,
  isVideo,
  isAudio,
  isArchive,
  isPdf,
  isText,
} from '@/utils';
import { Extension } from '@/utils/getColorByExtencion';
import { AudioFile, ImageFile, VideoFile } from '..';
import { FileContent } from '@/components/client';
import { ArchiveFile, TextFile, PdfFile } from '@/components/client';
import { useEffect, useState } from 'react';

interface FileItemProps {
  fileName: string;
  originalName: string;
  id: number;
  isEventExist?: boolean;
  isVideoPlay: boolean;
}

const extensionObj = {
  image: [isImage, ImageFile],
  video: [isVideo, VideoFile],
  audio: [isAudio, AudioFile],
  archive: [isArchive, ArchiveFile],
  pdf: [isPdf, PdfFile],
  text: [isText, TextFile],
};

const FileItem: React.FC<FileItemProps> = ({
  fileName,
  originalName,
  id,
  isEventExist = true,
  isVideoPlay = true,
}) => {
  const ext = getExtensionByFileName(fileName) as Extension;
  const color = getColorByExtencion(ext);
  const modifiedOriginalName = originalName.trim().toLowerCase();
  const [data, setData] = useState<{ component: JSX.Element | undefined; fileFormat: string }>({
    component: undefined,
    fileFormat: '',
  });
  const getComponentByExt = (ext: string) => {
    for (const [fileFormat, [func, component]] of Object.entries(extensionObj)) {
      //declare types
      const isFormat = func as (ext: string) => boolean;
      const Component = component as React.FC<{ fileName: string; isVideoPlay?: boolean }>;
      if (isFormat(ext)) {
        return {
          component: <Component key={fileName} fileName={fileName} isVideoPlay={isVideoPlay} />,
          fileFormat,
        };
      }
    }
    return {
      component: <FileOutlined className="w-[100%] h-[150px]" key={fileName} />,
      fileFormat: 'none-format',
    };
  };

  useEffect(() => {
    const { component, fileFormat } = getComponentByExt(ext);

    setData({ component, fileFormat });
  }, []);
  return (
    <FileContent
      extFile={data.component}
      isEventExist={isEventExist}
      originalName={modifiedOriginalName}
      ext={ext}
      id={id}
      fileFormat={data.fileFormat}
      color={color}
      fileName={fileName}
    />
  );
};

export default FileItem;
