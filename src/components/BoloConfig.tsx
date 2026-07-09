'use client';

import { useState } from 'react';
import recheios from '@/data/recheios.json';
import coberturas from '@/data/coberturas.json';
import SizeModal from './SizeModal';
import tamanhos from '@/data/tamanhos.json';

interface BoloConfigProps {
  tipo: 'comum' | 'artistico';
  onNext: (data: BoloData) => void;
  onBack: () => void;
}

export interface BoloData {
  tipo: 'comum' | 'artistico';
  tamanho: string;
  recheio: string;
  cobertura: string;
  observacoes: string;
}

export default function BoloConfig({ tipo, onNext, onBack }: BoloConfigProps) {
  const [tamanho, setTamanho] = useState('');
  const [recheio, setRecheio] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [recheioCategoria, setRecheioCategoria] = useState('Nobre');

  const handleNext = () => {
    if (tamanho && recheio && cobertura) {
      onNext({ tipo, tamanho, recheio, cobertura, observacoes });
    }
  };

  const selectedTamanho = tamanhos.find((t) => t.id === tamanho);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#5f9ea0]">
        {tipo === 'artistico' ? 'Configure seu Bolo Artístico' : 'Configure seu Bolo'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho do Bolo *
          </label>
          <button
            onClick={() => setIsSizeModalOpen(true)}
            className="w-full p-3 border border-gray-300 rounded-lg text-left hover:border-[#b8f0ed] transition-colors"
          >
            {selectedTamanho ? (
              <span>
                {selectedTamanho.id} - {selectedTamanho.nome} ({selectedTamanho.tamanho}, {selectedTamanho.fatias} fatias)
              </span>
            ) : (
              <span className="text-gray-400">Clique para selecionar o tamanho</span>
            )}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria do Recheio *
          </label>
          <div className="flex gap-2 flex-wrap">
            {recheios.categorias.map((cat) => (
              <button
                key={cat.nome}
                onClick={() => {
                  setRecheioCategoria(cat.nome);
                  setRecheio('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  recheioCategoria === cat.nome
                    ? 'bg-[#b8f0ed] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recheio *
          </label>
          <select
            value={recheio}
            onChange={(e) => setRecheio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
          >
            <option value="">Selecione o recheio</option>
            {recheios.categorias
              .find((c) => c.nome === recheioCategoria)
              ?.recheios.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cobertura *
          </label>
          <select
            value={cobertura}
            onChange={(e) => setCobertura(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
          >
            <option value="">Selecione a cobertura</option>
            {coberturas.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            placeholder="Ex: Sem corantes, Preferência por..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-[#b8f0ed] transition-all"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          disabled={!tamanho || !recheio || !cobertura}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            tamanho && recheio && cobertura
              ? 'bg-[#b8f0ed] text-white hover:bg-[#5f9ea0]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Próximo
        </button>
      </div>

      <SizeModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        onSelect={setTamanho}
        selectedSize={tamanho}
      />
    </div>
  );
}
