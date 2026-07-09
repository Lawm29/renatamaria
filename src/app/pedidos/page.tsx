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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [ordenacao, setOrdenacao] = useState<'dataPedido' | 'dataEntrega'>('dataPedido');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchPedidos();
    } else {
      setIsLoadingAuth(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        fetchPedidos();
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
    } catch {
      setError('Erro ao validar senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPedidos = async () => {
    setIsLoading(true);
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPedidos([]);
    setPassword('');
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#b8f0ed] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔒</div>
              <h1 className="text-2xl font-bold text-[#5f9ea0]">Acesso Restrito</h1>
              <p className="text-gray-500 mt-2">
                Insira a senha para acessar o painel de pedidos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                  placeholder="Digite a senha"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full py-3 bg-[#b8f0ed] text-white rounded-full font-semibold hover:bg-[#5f9ea0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Validando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    const dateA = new Date(a[ordenacao]).getTime();
    const dateB = new Date(b[ordenacao]).getTime();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#5f9ea0]">Histórico de Pedidos</h1>
          
          <div className="flex items-center gap-4">
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
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sair
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#b8f0ed] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando pedidos...</p>
          </div>
        ) : pedidosOrdenados.length === 0 ? (
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
