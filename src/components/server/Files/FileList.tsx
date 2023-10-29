import { checkAuth } from '@/utils/checkAuth';
import Api from '@/app/api';
import { FileItemType, FileType } from '@/app/api/files/dto/files.dto';
import { FileItem } from '../../client';
import { Empty } from 'antd';

interface GetFilesReturnValue {
  userFolderName: string;
  files: FileItemType[];
}

const getFiles = async (type: FileType | undefined): Promise<GetFilesReturnValue> => {
  const { fullName } = await checkAuth();
  try {
    const files = await Api.Files.getAllFiles(type);
    return {
      userFolderName: fullName,
      files,
    };
  } catch (error) {
    console.log('Error loading:' + error);
    return {
      userFolderName: fullName,
      files: [],
    };
  }
};

const FileList = async ({ type = FileType.ALL }: { type?: FileType | undefined }) => {
  const filesObject = await getFiles(type);
  return (
    <>
      {filesObject?.files.length > 0 ? (
        <ul className="flex p-[30px 10px] flex-wrap gap-[10px]">
          {filesObject?.files.map((item: FileItemType) => (
            <FileItem
              id={item.id}
              key={item.id}
              isEventExist={true}
              fileName={`${filesObject.userFolderName}/${item.fileName}`}
              originalName={item.originalName}
            />
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default FileList;
