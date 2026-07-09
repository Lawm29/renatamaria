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
  onEdit: (pedido: Pedido) => void;
  onDelete: (id: string) => void;
}

export default function PedidoCard({ pedido, onStatusChange, onEdit, onDelete }: PedidoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expandedError, setExpandedError] = useState<string | null>(null);

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

  const handleDelete = () => {
    onDelete(pedido.id);
    setShowDeleteConfirm(false);
  };

  const handleExpand = () => {
    try {
      setExpandedError(null);
      setIsExpanded(!isExpanded);
    } catch (err) {
      console.error('Erro ao expandir pedido:', err);
      setExpandedError('Erro ao carregar detalhes do pedido');
    }
  };

  const safeDate = (dateStr: string) => {
    try {
      if (!dateStr) return 'Não informado';
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? 'Data inválida' : d.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const dataPedido = safeDate(pedido.dataPedido);
  const dataEntrega = safeDate(pedido.dataEntrega);

  const bolos = Array.isArray(pedido.bolos) ? pedido.bolos : [];
  const bolosFalsos = Array.isArray(pedido.bolosFalsos) ? pedido.bolosFalsos : [];
  const doces = Array.isArray(pedido.doces) ? pedido.doces : [];
  const categorias = Array.isArray(pedido.categorias) ? pedido.categorias : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleExpand}
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
          <p className="font-semibold text-gray-800 truncate">{pedido.cliente?.nome || 'Cliente não informado'}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {categorias.map((cat) => (
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
          {expandedError ? (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">{expandedError}</p>
            </div>
          ) : (
            <>
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
                  <p className="text-sm font-medium">{pedido.cliente?.whatsapp || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="text-sm font-medium">{pedido.cliente?.endereco || 'Não informado'}</p>
                </div>
              </div>

              {bolos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Bolos</h4>
                  {bolos.map((bolo, index) => {
                    const tamanhoInfo = getTamanhoInfo(bolo.tamanho || '');
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                        <p className="text-sm font-medium">
                          {bolo.tipo === 'artistico' ? 'Bolo Artístico' : 'Bolo'} {index + 1}
                        </p>
                        <p className="text-xs text-gray-600">
                          Tamanho: {tamanhoInfo?.id || bolo.tamanho || 'N/I'} ({tamanhoInfo?.tamanho || 'N/I'}) | Recheio: {bolo.recheio || 'N/I'} | Cobertura: {bolo.cobertura || 'N/I'}
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

              {bolosFalsos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Bolos Falsos</h4>
                  {bolosFalsos.map((bolo, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                      <p className="text-sm font-medium">Bolo Falso {index + 1}</p>
                      <p className="text-xs text-gray-600">Andares: {bolo.andares || 'N/I'}</p>
                      <p className="text-xs text-gray-600">Descrição: {bolo.descricao || 'N/I'}</p>
                      {bolo.observacoes && (
                        <p className="text-xs text-gray-500 italic">Obs: {bolo.observacoes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {doces.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Doces</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {doces.map((doce, index) => (
                      <p key={doce.nome || index} className="text-xs text-gray-600">
                        {doce.nome || 'Doce N/I'} x{doce.quantidade || 0}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(pedido);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-[#5f9ea0] bg-[#b8f0ed]/20 rounded-lg hover:bg-[#b8f0ed]/30 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Apagar
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Apagar pedido?</h3>
              <p className="text-sm text-gray-600 mb-6">
                Tem certeza que deseja apagar o pedido de <strong>{pedido.cliente.nome}</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Apagar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
