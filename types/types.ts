/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: string;
  height: number;
  width: number;
  url: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export interface CatImageProps {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: {
    name: string;
    description: string;
    life_span: string;
    origin: string;
    temperament: string;
  }[];
}
