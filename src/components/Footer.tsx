'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#5f9ea0] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Renata Maria"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold">Renata Maria</h3>
              <p className="text-sm opacity-90">Bolos e Doces Finos</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">Rua Trinta, 640 - Centro</p>
            <p className="text-sm">Barretos - SP</p>
            <p className="text-sm mt-2 font-semibold">Apenas retirada em Barretos</p>
            <p className="text-sm">Entrega para todo o estado de São Paulo</p>
            <p className="text-sm mt-2">
              <a 
                href="https://wa.me/5517981843759" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                (17) 98184-3759
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-6 text-center text-sm opacity-80">
          <p>&copy; 2026 Renata Maria - Bolos e Doces Finos. Todos os direitos reservados.</p>
          <Link
            href="/controledepedidos"
            className="text-xs opacity-40 hover:opacity-100 transition-opacity mt-2 inline-block"
          >
            Área do Administrador
          </Link>
        </div>
      </div>
    </footer>
  );
}
