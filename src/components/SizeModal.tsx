'use client';

import Image from 'next/image';
import tamanhos from '@/data/tamanhos.json';

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tamanho: string) => void;
  selectedSize: string;
}

export default function SizeModal({ isOpen, onClose, onSelect, selectedSize }: SizeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#5f9ea0]">Escolha o tamanho do bolo</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {tamanhos.map((tamanho) => (
              <button
                key={tamanho.id}
                onClick={() => {
                  onSelect(tamanho.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedSize === tamanho.id
                    ? 'border-[#b8f0ed] bg-[#b8f0ed]/10'
                    : 'border-gray-200 hover:border-[#b8f0ed]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#5f9ea0]">{tamanho.id}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{tamanho.nome}</p>
                    <p className="text-sm text-gray-500">
                      {tamanho.tamanho} | {tamanho.fatias} fatias | {tamanho.peso}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p>*Quantidade de 80 a 100g por pessoa.</p>
            <p>*O peso varia de acordo com a densidade de cada recheio.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
