import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import MenuHeader from '../../components/MenuHeader';
import type { CatImageProps } from '../../types/types';

const CatDetail: NextPage<{ catData: CatImageProps; isFavorite: boolean }> = ({
  catData,
  isFavorite: initialFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  if (!catData) {
    return <div>Loading...</div>;
  }

  const handleToggleFavorite = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(
          `https://api.thecatapi.com/v1/favourites?limit=20&sub_id=user-123&order=DESC`,
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? '',
              'Content-Type': 'application/json',
            },
          }
        );
        const favourites = await response.json();
        const favoriteEntry = favourites.find(
          (fav: { image_id: string }) => fav.image_id === catData.id
        );

        if (favoriteEntry) {
          const deleteResponse = await fetch(
            `https://api.thecatapi.com/v1/favourites/${favoriteEntry.id}`,
            {
              method: 'DELETE',
              headers: {
                'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? '',
              },
            }
          );
          if (deleteResponse.ok) {
            setIsFavorite(false);
          } else {
            console.error('Failed to remove from favorites');
          }
        }
      } else {
        // Add to favorites
        const rawBody = JSON.stringify({
          image_id: catData.id,
          sub_id: 'user-123',
        });

        const response = await fetch(
          'https://api.thecatapi.com/v1/favourites',
          {
            method: 'POST',
            headers: {
              'x-api-key': `${process.env.NEXT_PUBLIC_CAT_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: rawBody,
          }
        );

        if (response.ok) {
          setIsFavorite(true);
        } else {
          console.error('Failed to add to favorites');
        }
      }
    } catch (error) {
      console.error('An error occurred while updating favorites', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cat Detail Page</title>
        <meta property="og:image" content={catData.url} />
        <meta name="twitter:image" content={catData.url} />
      </Head>
      <MenuHeader />
      <main className="flex items-center justify-center h-screen mx-auto max-w-[1960px] p-4">
        <div className="flex flex-col items-center">
          <div className="image-wrapper relative">
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={catData.url}
              alt="A Cat image"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: 'translate3d(0, 0, 0)' }}
              width={catData.width / 2}
              height={catData.height / 2}
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            {catData.breeds && catData.breeds.length > 0 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {catData.breeds[0].name}
                </h2>
                <p className="text-lg mb-2">{catData.breeds[0].description}</p>
                <p className="text-lg mb-2">
                  Life Span: {catData.breeds[0].life_span} years
                </p>
                <p className="text-lg mb-2">
                  Origin: {catData.breeds[0].origin}
                </p>
                <p className="text-lg">
                  Temperament: {catData.breeds[0].temperament}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleToggleFavorite}
            disabled={loading}
            data-test="toggle-favorite"
            className={`mt-6 px-3 py-2 w-[250px] text-lg font-semibold text-white rounded-lg transition-transform transform hover:scale-105 active:scale-95 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500'
            }`}
          >
            {isFavorite ? 'Remove from Favorites 💔' : 'Add to Favorites ❤️'}
          </button>
        </div>
      </main>
    </>
  );
};

export default CatDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const photoId = context.params?.id as string;
  const res = await fetch(`https://api.thecatapi.com/v1/images/${photoId}`);
  const catData: CatImageProps = await res.json();

  if (!catData) {
    return {
      notFound: true,
    };
  }

  // Fetch favorites to check if the current cat is already favorited
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
  const isFavorite = favourites.some(
    (fav: { image_id: string }) => fav.image_id === catData.id
  );

  return {
    props: {
      catData,
      isFavorite,
    },
    revalidate: 10, // Revalidate data every 10 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // Use blocking fallback to handle unknown paths
  };
};
