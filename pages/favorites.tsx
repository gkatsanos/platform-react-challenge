import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import type { ImageProps } from '../types/types';
import MenuHeader from '../components/MenuHeader';
import CatImage from '../components/CatImage';

interface FavoriteCatProps {
  favoriteCats: { id: number; image: ImageProps }[];
}

const Favorites: NextPage<FavoriteCatProps> = ({ favoriteCats }) => {
  const [favorites, setFavorites] = useState(favoriteCats);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleRemoveFavorite = async (favoriteId: number) => {
    setLoadingId(favoriteId);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/favourites/${favoriteId}`,
        {
          method: 'DELETE',
          headers: {
            'x-api-key': `${process.env.NEXT_PUBLIC_CAT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== favoriteId)
        );
      } else {
        console.error('Failed to remove from favorites');
      }
    } catch (error) {
      console.error('An error occurred while removing from favorites', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Head>
        <title>Favorite Cats</title>
      </Head>
      <MenuHeader />
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {favorites.map(({ id, image }) => (
            <div key={id} className="relative group mb-5 block w-full">
              <button
                onClick={() => handleRemoveFavorite(id)}
                className="absolute bottom-4 right-4 z-30 text-sm text-white border border-white-400 px-2 py-1 rounded  bg-opacity-75 hover:shadow-lg hover:bg-slate-500"
              >
                Remove
              </button>
              {loadingId === id && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              )}
              <CatImage image={image} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Favorites;

export const getStaticProps: GetStaticProps = async () => {
  // Fetch all favorite cats for the user
  const favoritesRes = await fetch(
    'https://api.thecatapi.com/v1/favourites?limit=20&sub_id=user-123&order=DESC',
    {
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? '',
      },
    }
  );
  const favourites = await favoritesRes.json();
  const favoriteCats = favourites.map(
    (fav: { id: number; image: ImageProps }) => fav
  );

  return {
    props: {
      favoriteCats,
    },
    revalidate: 10, // Revalidate data every 10 seconds
  };
};
