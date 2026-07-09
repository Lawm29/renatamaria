'use client';

import { useState } from 'react';

interface BoloFalsoConfigProps {
  onNext: (data: BoloFalsoData) => void;
  onBack: () => void;
}

export interface BoloFalsoData {
  tipo: 'falso';
  andares: number;
  descricao: string;
  observacoes: string;
}

export default function BoloFalsoConfig({ onNext, onBack }: BoloFalsoConfigProps) {
  const [andares, setAndares] = useState<number>(1);
  const [descricao, setDescricao] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleNext = () => {
    if (andares && descricao) {
      onNext({ tipo: 'falso', andares, descricao, observacoes });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#5f9ea0]">
          Configure seu Bolo Falso
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Bolo para decoração e eventos (não comestível)
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Andares *
          </label>
          <select
            value={andares}
            onChange={(e) => setAndares(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
          >
            <option value={1}>1 andar</option>
            <option value={2}>2 andares</option>
            <option value={3}>3 andares</option>
            <option value={4}>4 andares</option>
            <option value={5}>5 ou mais andares</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição do Bolo *
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            placeholder="Descreva como você gostaria que ficasse o bolo: cores, tema, decorações, referências..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            placeholder="Alguma informação adicional..."
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
          disabled={!andares || !descricao}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            andares && descricao
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
