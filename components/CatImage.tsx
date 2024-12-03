import Image from 'next/image';
import type { ImageProps } from '../types/types';

const CatImage = ({ image }: { image: ImageProps }) => {
  return (
    <Image
      alt="A Cat image"
      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
      style={{ transform: 'translate3d(0, 0, 0)' }}
      src={image.url}
      width={720}
      height={480}
      sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
    />
  );
};

export default CatImage;
