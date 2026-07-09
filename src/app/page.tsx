import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#b8f0ed]/20 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/images/logo.png"
            alt="Renata Maria - Bolos e Doces Finos"
            width={200}
            height={200}
            className="mx-auto mb-6"
            style={{ mixBlendMode: 'multiply' }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f9ea0] mb-4">
            Renata Maria
          </h1>
          <p className="text-xl text-gray-600 mb-2">Bolos e Doces Finos</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Confeitaria artesanal e familiar em Barretos-SP
          </p>
          <Link
            href="/pedido"
            className="inline-block mt-8 bg-[#b8f0ed] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5f9ea0] transition-all shadow-lg hover:shadow-xl"
          >
            Faça seu Pedido
          </Link>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#5f9ea0] mb-6">Sobre Nós</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Somos uma confeitaria artesanal e familiar em Barretos-SP, comandada por mãe e filha. 
              Nossos doces refletem intimidade, carinho, ingredientes de alta qualidade e elevado nível artístico.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-4">
              Cada bolo e doce é feito com amor e dedicação, transformando seus momentos especiais 
              em memórias doces e inesquecíveis.
            </p>
            <div className="mt-8 p-6 bg-[#b8f0ed]/10 rounded-xl">
              <p className="text-[#5f9ea0] font-semibold text-lg">📍 Rua Trinta, 640 - Centro, Barretos - SP</p>
              <p className="text-gray-600 mt-2">Apenas retirada em Barretos | Entrega para todo o estado de São Paulo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5f9ea0] mb-8">
            Nossos Produtos
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="text-6xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-[#5f9ea0] mb-3">
                Bolos e Doces Finos
              </h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Bolos personalizados, bolos artísticos comestíveis com detalhes decorativos, 
                bolos falsos para decoração e doces finos para todas as ocasiões. 
                Escolha o tamanho, recheio, cobertura e muito mais!
              </p>
              <Link
                href="/pedido"
                className="inline-block bg-[#b8f0ed] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5f9ea0] transition-all shadow-md hover:shadow-lg"
              >
                Montar Pedido
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5f9ea0] mb-8">
            Nossa Arte
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              '/images/bolos/Captura de tela 2026-07-09 113755.png',
              '/images/bolos/Captura de tela 2026-07-09 113859.png',
              '/images/bolos/Captura de tela 2026-07-09 113914.png',
              '/images/bolos/Captura de tela 2026-07-09 113925.png',
            ].map((foto, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
              >
                <img
                  src={foto}
                  alt={`Bolo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#b8f0ed]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#5f9ea0] mb-4">
            Pronto para adoçar seu dia?
          </h2>
          <p className="text-gray-600 mb-6">
            Faça seu pedido agora mesmo ou entre em contato pelo WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedido"
              className="bg-[#b8f0ed] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5f9ea0] transition-all"
            >
              Fazer Pedido
            </Link>
            <a
              href="https://wa.me/5517981843759"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
