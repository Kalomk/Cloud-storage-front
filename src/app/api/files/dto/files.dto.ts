import { User } from '../../auth/dto/auth.dto';

export enum FileType {
  ALL = 'all',
  PHOTOS = 'photos',
  TRASH = 'trash',
}
export interface UploadRequestOption<T = any> {
  onProgress: (event: any) => void;
  onError: (body?: T) => void;
  onSuccess: (body?: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: Exclude<any, File | boolean>;
}

export interface FileItemType {
  fileName: string;
  originalName: string;
  size: number;
  mimetype: string;
  user: User;
  deletedAt: string | null;
  id: number;
}
