import {serverUrl} from '../constants/root';

type FileModuleType = {
    id: number,
    fileName: string
}

type FileType = 'image' | 'video' | 'any'

const getFileType = (extension: string): FileType => {
  switch (extension) {
    case 'jpeg':
    case 'png':
    case 'jpg':
      return 'image';
    default:
      return 'any';
  }
};

export class FileModule {
  id: number;
  url: string;
  type: string;


  constructor(data: FileModuleType) {
    this.id = data.id,
    this.url = `${serverUrl}/file/${data.fileName}`;
    this.type = getFileType(data.fileName.split('.')[1]);
  }
}
