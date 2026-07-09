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
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5f9ea0] mb-8">
            Nossos Produtos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl text-center mb-4">🎂</div>
              <h3 className="text-xl font-bold text-center text-[#5f9ea0] mb-2">
                Bolos
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Bolos personalizados para todas as ocasiões. Escolha o tamanho, recheio e cobertura.
              </p>
              <Link
                href="/pedido"
                className="block text-center bg-[#b8f0ed]/20 text-[#5f9ea0] py-2 rounded-lg hover:bg-[#b8f0ed]/30 transition-colors font-medium"
              >
                Montar Pedido
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl text-center mb-4">✨</div>
              <h3 className="text-xl font-bold text-center text-[#5f9ea0] mb-2">
                Bolos Artísticos
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Bolos decorados com detalhes artísticos para eventos especiais e festas temáticas.
              </p>
              <Link
                href="/pedido"
                className="block text-center bg-[#b8f0ed]/20 text-[#5f9ea0] py-2 rounded-lg hover:bg-[#b8f0ed]/30 transition-colors font-medium"
              >
                Montar Pedido
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl text-center mb-4">🍬</div>
              <h3 className="text-xl font-bold text-center text-[#5f9ea0] mb-2">
                Doces Finos
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Brigadeiros, bombons e doces finos para festas e eventos. Tradicionais, gourmet e finos.
              </p>
              <Link
                href="/pedido"
                className="block text-center bg-[#b8f0ed]/20 text-[#5f9ea0] py-2 rounded-lg hover:bg-[#b8f0ed]/30 transition-colors font-medium"
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
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
              >
                <img
                  src={`/images/bolos/Captura de tela 2026-07-09 11375${3 + i}.png`}
                  alt={`Bolo ${i}`}
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
