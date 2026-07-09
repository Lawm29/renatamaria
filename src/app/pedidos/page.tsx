'use client';

import { useState, useEffect } from 'react';
import PedidoCard from '@/components/PedidoCard';

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

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [ordenacao, setOrdenacao] = useState<'dataPedido' | 'dataEntrega'>('dataPedido');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: Pedido['status']) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    const dateA = new Date(a[ordenacao]).getTime();
    const dateB = new Date(b[ordenacao]).getTime();
    return dateB - dateA;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#b8f0ed] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#5f9ea0]">Histórico de Pedidos</h1>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Ordenar por:</label>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as 'dataPedido' | 'dataEntrega')}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
            >
              <option value="dataPedido">Data do Pedido</option>
              <option value="dataEntrega">Data de Entrega</option>
            </select>
          </div>
        </div>

        {pedidosOrdenados.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum pedido encontrado
            </h2>
            <p className="text-gray-500">
              Os pedidos aparecerão aqui quando forem realizados.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pedidosOrdenados.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                pedido={pedido}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Total de pedidos: {pedidos.length}
        </div>
      </div>
    </div>
  );
}
