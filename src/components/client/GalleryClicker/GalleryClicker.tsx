import { FileItem } from '..';
import { useSelectedFiles } from '../Files/FilesProvider';

const GalleryClicker = () => {
  const { addtoCurrentPlay, currentPlay, selected } = useSelectedFiles();

  return (
    <div className="w-[90%] flex flex-col justify-start items-center relative z-50 overflow-x-auto p-[10px]">
      <ul className="flex w-full gap-2">
        {selected.selectedFileNames.map((gi: string, index) => {
          const fileNameWithoutUrl = currentPlay.path.split('/').pop();
          return (
            <li
              onClick={() =>
                addtoCurrentPlay(gi, selected.selectedFormat[index] as 'audio' | 'video' | 'image')
              }
              data-item={gi}
              key={gi + Math.random()}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <div
                className={`ml-[15px] flex flex-col justify-center items-center p-[5px] ${
                  gi === fileNameWithoutUrl ? 'bg-white ' : ''
                }`}
              >
                <FileItem
                  fileName={gi}
                  isEventExist={false}
                  originalName={gi}
                  isVideoPlay={false}
                  id={index + Math.random()}
                />
              </div>

              <div
                className="text-white whitespace-normal mt-[5px]"
                style={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', height: 75 }}
              >
                {gi}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GalleryClicker;
