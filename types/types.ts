export interface ImageProps {
  id: string;
  height: number;
  width: number;
  url: string;
}

export interface CatImageProps extends ImageProps {
  isFavorite?: boolean;
  breeds?: {
    name: string;
    description: string;
    life_span: string;
    origin: string;
    temperament: string;
  }[];
}
