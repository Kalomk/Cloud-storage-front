import { checkAuth } from '@/utils/checkAuth';
import Api from '@/app/api';
import { FileType } from '@/app/api/files/dto/files.dto';
import { FileItem } from '../../client';
import { User } from '@/app/api/auth/dto/auth.dto';
import { Empty } from 'antd';

const getFiles = async (type: FileType | undefined) => {
  await checkAuth();
  try {
    const files = await Api.Files.getAllFiles(type);
    return files;
  } catch (error) {
    console.log('Error loading:' + error);
    return [];
  }
};

const FileList = async ({ type = FileType.ALL }: { type?: FileType | undefined }) => {
  const files = await getFiles(type);
  return (
    <>
      {files.length > 0 ? (
        <ul className="flex p-[30px 10px] flex-wrap gap-[10px]">
          {files.map((item: User) => (
            <FileItem
              id={item.id}
              key={item.id}
              isEventExist={true}
              fileName={item.fileName}
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
