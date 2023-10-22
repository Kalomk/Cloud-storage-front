import { FilesAndSelection } from '../';
import { FileSelectType } from './FilesAndSelection';
import Api from '@/app/api';
import { FileActions } from '../';
import { useSelectedFiles } from './FilesProvider';
import { SelectedType } from './FilesProvider';

const Files = ({ children }: { children: React.ReactNode }) => {
  const { selected, addSelected, removeSelected, clearSelected } = useSelectedFiles();

  const onFileSelect = (
    { selectedId, selectedFileName, selectedFormat }: SelectedType | any,
    type: FileSelectType,
    id?: number
  ) => {
    if (type === 'select') {
      addSelected({ selectedId, selectedFileName, selectedFormat });
    } else {
      removeSelected(id!);
    }
  };

  const onClickRemove = () => {
    Api.Files.remove(selected.selectedIds);
    window.location.reload();
    clearSelected();
  };

  const onClickShare = () => {
    alert('share');
  };

  return (
    <>
      <FileActions
        onClickRemove={onClickRemove}
        onClickShare={onClickShare}
        isActive={selected.selectedIds.length > 0}
      />
      <FilesAndSelection onFileSelect={onFileSelect}>{children}</FilesAndSelection>
    </>
  );
};
export default Files;
