import Link from 'next/link';
import React from 'react';

const MenuHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="max-w-[1960px] mx-auto px-4 flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/favorites" className="hover:text-blue-400">
            Favorites
          </Link>
          <Link href="/breeds" className="hover:text-blue-400">
            Breeds
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MenuHeader;
