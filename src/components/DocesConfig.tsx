'use client';

import { useState } from 'react';
import doces from '@/data/doces.json';

interface DocesConfigProps {
  onNext: (data: DoceSelecionado[]) => void;
  onBack: () => void;
}

export interface DoceSelecionado {
  nome: string;
  categoria: string;
  quantidade: number;
}

export default function DocesConfig({ onNext, onBack }: DocesConfigProps) {
  const [selecionados, setSelecionados] = useState<DoceSelecionado[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Tradicionais');

  const adicionarDoce = (nome: string, categoria: string) => {
    const exists = selecionados.find((d) => d.nome === nome);
    if (!exists) {
      setSelecionados([...selecionados, { nome, categoria, quantidade: 1 }]);
    }
  };

  const removerDoce = (nome: string) => {
    setSelecionados(selecionados.filter((d) => d.nome !== nome));
  };

  const atualizarQuantidade = (nome: string, quantidade: number) => {
    if (quantidade < 1) {
      removerDoce(nome);
      return;
    }
    setSelecionados(
      selecionados.map((d) => (d.nome === nome ? { ...d, quantidade } : d))
    );
  };

  const categoriaAtual = doces.categorias.find((c) => c.nome === categoriaAtiva);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#5f9ea0]">
        Selecione seus doces
      </h2>
      <p className="text-center text-gray-600">
        Clique no doce para adicioná-lo ao seu pedido
      </p>

      <div className="flex gap-2 flex-wrap justify-center">
        {doces.categorias.map((cat) => (
          <button
            key={cat.nome}
            onClick={() => setCategoriaAtiva(cat.nome)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              categoriaAtiva === cat.nome
                ? 'bg-[#b8f0ed] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {categoriaAtual?.doces.map((doce) => {
          const isSelected = selecionados.find((d) => d.nome === doce);
          return (
            <button
              key={doce}
              onClick={() => adicionarDoce(doce, categoriaAtiva)}
              disabled={!!isSelected}
              className={`p-3 rounded-lg text-sm text-left transition-all ${
                isSelected
                  ? 'bg-[#b8f0ed]/20 border-2 border-[#b8f0ed] text-[#5f9ea0]'
                  : 'bg-white border border-gray-200 hover:border-[#b8f0ed]/50'
              }`}
            >
              {doce}
            </button>
          );
        })}
      </div>

      {selecionados.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Doces Selecionados</h3>
          <div className="space-y-2">
            {selecionados.map((doce) => (
              <div
                key={doce.nome}
                className="flex items-center gap-3 bg-white p-3 rounded-lg"
              >
                <span className="flex-1 text-sm">{doce.nome}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      atualizarQuantidade(doce.nome, doce.quantidade - 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={doce.quantidade}
                    onChange={(e) =>
                      atualizarQuantidade(doce.nome, parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center border border-gray-200 rounded-lg py-1"
                  />
                  <button
                    onClick={() =>
                      atualizarQuantidade(doce.nome, doce.quantidade + 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removerDoce(doce.nome)}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center ml-2"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-[#b8f0ed] transition-all"
        >
          Voltar
        </button>
        <button
          onClick={() => onNext(selecionados)}
          disabled={selecionados.length === 0}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            selecionados.length > 0
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
