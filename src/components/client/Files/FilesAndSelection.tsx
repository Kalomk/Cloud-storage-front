import Selecto from 'react-selecto';
import { SelectedType, useSelectedFiles } from './FilesProvider';

export type FileSelectType = 'select' | 'unselect';

interface FileListProps {
  onFileSelect: (select: SelectedType | {}, type: FileSelectType, id?: number) => void;
  children: React.ReactNode;
}

const FilesAndSelection: React.FC<FileListProps> = ({ children, onFileSelect }) => {
  const { addtoCurrentPlay } = useSelectedFiles();
  const selectFiles = (id: number, fileName: string, format: string) => {
    onFileSelect(
      {
        selectedId: id,
        selectedFileName: fileName,
        selectedFormat: format,
      },
      'select'
    );
    addtoCurrentPlay(fileName, format as 'video' | 'audio' | 'image');
  };

  const unselectFiles = (id: number) => {
    onFileSelect({}, 'unselect', id);
  };
  return (
    <div className="min-h-[100%]">
      {children}
      <Selecto
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add('active');
            selectFiles(
              Number(el.getAttribute('data-set')),
              el.getAttribute('data-name')!,
              el.getAttribute('data-format')!
            );
          });
          e.removed.forEach((el) => {
            el.classList.remove('active');
            unselectFiles(Number(el.getAttribute('data-set')));
          });
        }}
      />
    </div>
  );
};

export default FilesAndSelection;
