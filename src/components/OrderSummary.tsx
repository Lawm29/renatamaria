'use client';

import { BoloData } from './BoloConfig';
import { BoloFalsoData } from './BoloFalsoConfig';
import { DoceSelecionado } from './DocesConfig';
import { FormData } from './ContactForm';
import tamanhos from '@/data/tamanhos.json';

interface OrderSummaryProps {
  bolos: BoloData[];
  bolosFalsos: BoloFalsoData[];
  doces: DoceSelecionado[];
  dados: FormData;
  onConfirm: () => void;
  onBack: () => void;
  isSending: boolean;
}

export default function OrderSummary({ bolos, bolosFalsos, doces, dados, onConfirm, onBack, isSending }: OrderSummaryProps) {
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

      {bolosFalsos.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">Bolos Falsos</h3>
          {bolosFalsos.map((bolo, index) => (
            <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
              <p className="font-medium">🎨 Bolo Falso {index + 1}</p>
              <p className="text-sm text-gray-600">Andares: {bolo.andares}</p>
              <p className="text-sm text-gray-600">Descrição: {bolo.descricao}</p>
              {bolo.observacoes && (
                <p className="text-sm text-gray-500 italic">Obs: {bolo.observacoes}</p>
              )}
            </div>
          ))}
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
        <h3 className="font-semibold text-gray-700 mb-3">Dados de Contato e Endereço</h3>
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
          disabled={isSending}
          className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-600 hover:border-[#b8f0ed] transition-all disabled:opacity-50"
        >
          Voltar
        </button>
        <button
          onClick={onConfirm}
          disabled={isSending}
          className="px-8 py-3 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Enviando...
            </span>
          ) : (
            'Finalizar Pedido'
          )}
        </button>
      </div>
    </div>
  );
}
