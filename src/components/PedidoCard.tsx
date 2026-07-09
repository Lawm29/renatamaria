'use client';

import { useState } from 'react';
import tamanhos from '@/data/tamanhos.json';

interface Pedido {
  id: string;
  dataPedido: string;
  dataEntrega: string;
  cliente: {
    nome: string;
    whatsapp: string;
    endereco: string;
  };
  categorias: string[];
  bolos: Array<{
    tipo: string;
    tamanho: string;
    recheio: string;
    cobertura: string;
    descricao?: string;
    observacoes?: string;
  }>;
  bolosFalsos: Array<{
    andares: number;
    descricao: string;
    observacoes?: string;
  }>;
  doces: Array<{
    nome: string;
    quantidade: number;
  }>;
  status: {
    contatoFeito: boolean;
    pago: boolean;
    finalizado: boolean;
  };
}

interface PedidoCardProps {
  pedido: Pedido;
  onStatusChange: (id: string, status: Pedido['status']) => void;
}

export default function PedidoCard({ pedido, onStatusChange }: PedidoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTamanhoInfo = (id: string) => tamanhos.find((t) => t.id === id);

  const getCategoriaLabel = (cat: string) => {
    const labels: Record<string, string> = {
      bolo: 'Bolo',
      artistico: 'Bolo Artístico',
      falso: 'Bolo Falso',
      doces: 'Doces',
    };
    return labels[cat] || cat;
  };

  const handleStatusChange = (field: keyof Pedido['status']) => {
    const newStatus = {
      ...pedido.status,
      [field]: !pedido.status[field],
    };
    onStatusChange(pedido.id, newStatus);
  };

  const dataPedido = new Date(pedido.dataPedido).toLocaleDateString('pt-BR');
  const dataEntrega = new Date(pedido.dataEntrega).toLocaleDateString('pt-BR');

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{pedido.cliente.nome}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {pedido.categorias.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 bg-[#b8f0ed]/20 text-[#5f9ea0] rounded-full"
              >
                {getCategoriaLabel(cat)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={pedido.status.contatoFeito}
              onChange={() => handleStatusChange('contatoFeito')}
              className="w-4 h-4 accent-[#5f9ea0]"
            />
            <span className="text-xs text-gray-600 hidden sm:inline">Contato</span>
          </label>

          <label
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={pedido.status.pago}
              onChange={() => handleStatusChange('pago')}
              className="w-4 h-4 accent-[#5f9ea0]"
            />
            <span className="text-xs text-gray-600 hidden sm:inline">Pago</span>
          </label>

          <label
            className="flex items-center gap-1 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={pedido.status.finalizado}
              onChange={() => handleStatusChange('finalizado')}
              className="w-4 h-4 accent-[#5f9ea0]"
            />
            <span className="text-xs text-gray-600 hidden sm:inline">Finalizado</span>
          </label>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Data do Pedido</p>
              <p className="text-sm font-medium">{dataPedido}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Entrega</p>
              <p className="text-sm font-medium">{dataEntrega}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="text-sm font-medium">{pedido.cliente.whatsapp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="text-sm font-medium">{pedido.cliente.endereco}</p>
            </div>
          </div>

          {pedido.bolos.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Bolos</h4>
              {pedido.bolos.map((bolo, index) => {
                const tamanhoInfo = getTamanhoInfo(bolo.tamanho);
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                    <p className="text-sm font-medium">
                      {bolo.tipo === 'artistico' ? 'Bolo Artístico' : 'Bolo'} {index + 1}
                    </p>
                    <p className="text-xs text-gray-600">
                      Tamanho: {tamanhoInfo?.id} ({tamanhoInfo?.tamanho}) | Recheio: {bolo.recheio} | Cobertura: {bolo.cobertura}
                    </p>
                    {bolo.tipo === 'artistico' && bolo.descricao && (
                      <p className="text-xs text-gray-600">Descrição: {bolo.descricao}</p>
                    )}
                    {bolo.observacoes && (
                      <p className="text-xs text-gray-500 italic">Obs: {bolo.observacoes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {pedido.bolosFalsos.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Bolos Falsos</h4>
              {pedido.bolosFalsos.map((bolo, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-sm font-medium">Bolo Falso {index + 1}</p>
                  <p className="text-xs text-gray-600">Andares: {bolo.andares}</p>
                  <p className="text-xs text-gray-600">Descrição: {bolo.descricao}</p>
                  {bolo.observacoes && (
                    <p className="text-xs text-gray-500 italic">Obs: {bolo.observacoes}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {pedido.doces.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Doces</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                {pedido.doces.map((doce) => (
                  <p key={doce.nome} className="text-xs text-gray-600">
                    {doce.nome} x{doce.quantidade}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
