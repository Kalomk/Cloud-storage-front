import { FileModal, Files } from '@/components/client';
import { FileList, GalleryLoader } from '@/components/server';
import { FileType } from '@/app/api/files/dto/files.dto';

const Dashboard = ({ searchParams }: { searchParams?: { type: FileType | undefined } }) => {
  const type = searchParams?.type;

  return (
    <>
      <Files>
        <FileList type={type} />
        <FileModal />
      </Files>
    </>
  );
};

export default Dashboard;
