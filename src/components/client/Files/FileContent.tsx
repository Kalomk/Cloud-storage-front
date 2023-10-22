import useDoubleClick from '@/hooks/useDoubleClick';
import { useSelectedFiles } from '../Files/FilesProvider';

interface FileContentProps {
  color: string;
  extFile: React.ReactNode;
  originalName: string;
  ext: string;
  fileFormat: string;
  fileName: string;
  id: number;
  isEventExist: boolean;
}

const FileContent: React.FC<FileContentProps> = ({
  color,
  extFile,
  originalName,
  ext,
  fileFormat,
  fileName,
  id,
  isEventExist,
}) => {
  const { openOrCloseSelectedFiles, addtoCurrentPlay } = useSelectedFiles();
  const onDblClick = useDoubleClick({ doubleClick: () => getFormatData() });

  const getFormatData = () => {
    addtoCurrentPlay(fileName, fileFormat as 'audio' | 'video' | 'image');
    openOrCloseSelectedFiles(true);
  };

  return (
    <>
      <div
        data-set={id}
        data-name={fileName}
        data-format={fileFormat}
        onClick={isEventExist ? onDblClick : undefined}
        className="flex flex-col items-center justify-center rounded-[10px] w-[220px] h-[220px] cursor-pointer file z-100 relative"
      >
        <div className="relative mb-[10px]">
          <i
            style={{ backgroundColor: color }}
            className="not-italic rounded-[6px] absolute bottom-0 left-0 font-bold color-[#fff] bg-[#777] uppercase text-[12px] p-[6px]"
          >
            {ext}
          </i>
          {extFile}
        </div>
        {isEventExist && <span>{originalName.slice(0, 8) + '...' + ext}</span>}
      </div>
    </>
  );
};

export default FileContent;
