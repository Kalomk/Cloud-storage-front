import React from 'react';
import { Button, Popconfirm } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useSelectedFiles } from './FilesProvider';

interface FileActionsProps {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
}

const FileActions: React.FC<FileActionsProps> = ({ isActive, onClickRemove, onClickShare }) => {
  const { openOrCloseSelectedFiles } = useSelectedFiles();

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => openOrCloseSelectedFiles(true)}>open</div>,
      key: '0',
    },
    {
      label: <div>download</div>,
      key: '1',
    },
    {
      label: <div>restolation</div>,
      key: '2',
    },
  ];

  return (
    <div className="p-[25px 25px 0] flex mt-[26px] w-[300px]">
      <Button onClick={onClickShare} className="mr-[10px]" disabled={!isActive}>
        <ShareAltOutlined />
        Share
      </Button>

      <Popconfirm
        title="Delete files?"
        description="All files will puts on the trash"
        okText="Yes"
        cancelText="No"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Delete
        </Button>
      </Popconfirm>
      <Dropdown className="ml-[10px]" menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Click me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default FileActions;
