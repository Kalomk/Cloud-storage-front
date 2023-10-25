import { notification } from 'antd';
import axios from '../../../core/axios';
import { FileType } from './dto/files.dto';
import { UploadRequestOption } from './dto/files.dto';
import { AxiosResponse } from 'axios';

export const getAllFiles = async (type = FileType.ALL) =>
  (await axios.get(`/files/all?type=${type}`)).data;

export const uploadFiles = async (options: UploadRequestOption, folderName?: string) => {
  const { onProgress, onError, onSuccess, file } = options;
  const formData = new FormData();
  formData.append('file', file);

  if (folderName) {
    formData.append('folderName', folderName);
  }

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post('/files', formData, config);
    onSuccess();
    return data;
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: "file can'not load",
      duration: 2,
    });
    onError({ error });
    console.log(error);
  }
};

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('/files?ids=' + ids);
};

export const updateText = (fileName: string, text: string): Promise<AxiosResponse> => {
  return axios.put(`/files/text/${fileName}`, { text });
};
