'use client';

import { BoloData } from './BoloConfig';
import { DoceSelecionado } from './DocesConfig';
import { FormData } from './ContactForm';
import tamanhos from '@/data/tamanhos.json';

interface OrderSummaryProps {
  bolos: BoloData[];
  doces: DoceSelecionado[];
  dados: FormData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function OrderSummary({ bolos, doces, dados, onConfirm, onBack }: OrderSummaryProps) {
  const getTamanhoInfo = (id: string) => tamanhos.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#5f9ea0]">
        Resumo do Pedido
      </h2>

      {bolos.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">Bolos</h3>
          {bolos.map((bolo, index) => {
            const tamanhoInfo = getTamanhoInfo(bolo.tamanho);
            return (
              <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                <p className="font-medium">
                  {bolo.tipo === 'artistico' ? '🎂 Bolo Artístico' : '🎂 Bolo'} {index + 1}
                </p>
                <p className="text-sm text-gray-600">
                  Tamanho: {tamanhoInfo?.id} ({tamanhoInfo?.tamanho}, {tamanhoInfo?.fatias} fatias)
                </p>
                <p className="text-sm text-gray-600">Recheio: {bolo.recheio}</p>
                <p className="text-sm text-gray-600">Cobertura: {bolo.cobertura}</p>
                {bolo.observacoes && (
                  <p className="text-sm text-gray-500 italic">Obs: {bolo.observacoes}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {doces.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">Doces</h3>
          <div className="space-y-2">
            {doces.map((doce) => (
              <div key={doce.nome} className="flex justify-between text-sm">
                <span>{doce.nome}</span>
                <span className="font-medium">x{doce.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Dados de Entrega</h3>
        <div className="text-sm space-y-1">
          <p><strong>Nome:</strong> {dados.nome}</p>
          <p><strong>WhatsApp:</strong> {dados.whatsapp}</p>
          <p><strong>Data:</strong> {new Date(dados.dataEntrega).toLocaleDateString('pt-BR')}</p>
          <p><strong>Endereço:</strong> {dados.rua}, {dados.bairro} - {dados.cidade}/{dados.estado}</p>
          <p><strong>CEP:</strong> {dados.cep}</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-[#b8f0ed] transition-all"
        >
          Voltar
        </button>
        <button
          onClick={onConfirm}
          className="px-8 py-3 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition-all"
        >
          Enviar via WhatsApp
        </button>
      </div>
    </div>
  );
}
