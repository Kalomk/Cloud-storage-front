'use client';

import { Menu } from 'antd';
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
  VideoCameraOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileZipOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { FileModal, UploadButton } from '@/components/client';
import { useRef, useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const selectedMenu = usePathname();
  const router = useRouter();
  // Create a ref to the div element
  const divRef = useRef<HTMLDivElement>(null);

  // Function to send a click event to the div element
  const sendClickEvent = () => {
    if (divRef.current) {
      divRef.current.click(); // Trigger a click event on the div element
    }
  };

  // useEffect to send a click event to the div element after rendering
  useEffect(() => {
    sendClickEvent();
  }, []);
  return (
    <main className="bg-[#fff] grid grid-cols-[0.3fr,1fr] mt-[150px]">
      <div className="flex flex-col min-w-[250px] p-[20px]">
        <UploadButton />
        <Menu
          className="mt-[20px] pr-[10px] h-[100%]"
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: `/dashboard/all`,
              icon: <FileOutlined />,
              label: `Files`,
              onClick: () => router.push('/dashboard/all?type=all'),
            },
            {
              key: `/dashboard/photos`,
              icon: <FileImageOutlined />,
              label: `Photos`,
              onClick: () => router.push('/dashboard/photos?type=photos'),
            },
            {
              key: `/dashboard/trash`,
              icon: <DeleteOutlined />,
              label: `Trash`,
              onClick: () => router.push('/dashboard/trash?type=trash'),
            },
            {
              key: `/dashboard/videos`,
              icon: <VideoCameraOutlined />,
              label: `Videos`,
              onClick: () => router.push('/dashboard/videos?type=videos'),
            },
            {
              key: `/dashboard/audio`,
              icon: <AudioOutlined />,
              label: `Audio`,
              onClick: () => router.push('/dashboard/audio?type=audio'),
            },
            {
              key: `/dashboard/pdfs`,
              icon: <FilePdfOutlined />,
              label: `Pdfs`,
              onClick: () => router.push('/dashboard/pdfs?type=pdfs'),
            },
            {
              key: `/dashboard/txts`,
              icon: <FileTextOutlined />,
              label: `Texts`,
              onClick: () => router.push('/dashboard/txts?type=texts'),
            },
            {
              key: `/dashboard/archives`,
              icon: <FileZipOutlined />,
              label: `Archives`,
              onClick: () => router.push('/dashboard/archives?type=archives'),
            },
          ]}
        />
      </div>

      <div ref={divRef} className="flex rounded-[15px] flex-col min-h-[600px]">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
