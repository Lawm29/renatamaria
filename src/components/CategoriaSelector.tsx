'use client';

interface Categoria {
  id: string;
  nome: string;
  icone: string;
}

interface CategoriaSelectorProps {
  categorias: Categoria[];
  selecionadas: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

export default function CategoriaSelector({
  categorias,
  selecionadas,
  onToggle,
  onNext,
}: CategoriaSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#5f9ea0]">
        Selecione as categorias do seu pedido
      </h2>
      <p className="text-center text-gray-600">
        Você pode selecionar múltiplas categorias
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
            className={`p-6 rounded-xl border-2 transition-all ${
              selecionadas.includes(cat.id)
                ? 'border-[#b8f0ed] bg-[#b8f0ed]/10 shadow-md'
                : 'border-gray-200 bg-white hover:border-[#b8f0ed]/50'
            }`}
          >
            <span className="text-4xl block mb-2">{cat.icone}</span>
            <span className="font-semibold text-gray-700">{cat.nome}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onNext}
          disabled={selecionadas.length === 0}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            selecionadas.length > 0
              ? 'bg-[#b8f0ed] text-white hover:bg-[#5f9ea0]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
