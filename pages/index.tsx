import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ImageProps } from '../types/types';
import MenuHeader from '../components/MenuHeader';

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const [catImages, setCatImages] = useState(images);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const newImages: ImageProps[] = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`,
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY,
          },
        }
      ).then((res) => res.json());
      setCatImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Failed to load more images', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>GWI Technical Challenge</title>
      </Head>
      <MenuHeader />
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {catImages.map(({ id, url }) => (
            <Link
              key={id}
              href={`/cats/${id}`}
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="A Cat image"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                src={url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreImages}
            disabled={loading}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        <img src="/gwi-logo.svg" alt="Vercel Logo" className="w-24 mx-auto" />
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results: ImageProps[] = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=10&page=0',
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    }
  ).then((res) => res.json());

  // as most results do not have breed details, we're appending one entry in the results for demonstration purposes
  results.push({
    id: '0XYvRd7oD',
    url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
    width: 1204,
    height: 1445,
  });

  return {
    props: {
      images: results,
    },
  };
}
