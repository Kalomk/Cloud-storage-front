import { Button, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UploadRequestOption } from '@/app/api/files/dto/files.dto';
import Api from '@/app/api';

const UploadButton = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onSuccess = async (options: UploadRequestOption | unknown) => {
    try {
      await Api.Files.uploadFiles(options as UploadRequestOption, 'cool');
      setFileList([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Upload
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      customRequest={onSuccess}
      className="upload"
    >
      <Button type="primary" size="large" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default UploadButton;
