'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Renata Maria - Bolos e Doces Finos"
            width={60}
            height={60}
            className="object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-[#5f9ea0]">Renata Maria</h1>
            <p className="text-xs text-gray-500">Bolos e Doces Finos</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link
            href="/pedido"
            className="bg-[#b8f0ed] text-white px-4 py-2 rounded-full hover:bg-[#5f9ea0] transition-colors font-medium"
          >
            Fazer Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
