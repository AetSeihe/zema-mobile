import {Asset} from 'react-native-image-picker';
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
  name: string;
  type: FileType;


  constructor(data: FileModuleType | Asset) {
    this.id = +(data.id || Math.random()),
    this.name = data.fileName || Math.random().toString();
    this.url = data.uri ||`${serverUrl}/file/${data.fileName}`;
    this.type = !data.fileName ? 'any' : getFileType(data.fileName.split('.')[1]);
  }
}
