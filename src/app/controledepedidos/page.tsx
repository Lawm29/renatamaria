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

type TabType = 'andamento' | 'concluidos';

export default function ControlePedidosPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('andamento');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);
  const [editForm, setEditForm] = useState({
    dataEntrega: '',
    endereco: '',
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
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

  const handleEdit = (pedido: Pedido) => {
    setEditingPedido(pedido);
    setEditForm({
      dataEntrega: pedido.dataEntrega.split('T')[0],
      endereco: pedido.cliente.endereco,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingPedido) return;

    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingPedido.id,
          dataEntrega: editForm.dataEntrega,
          cliente: {
            ...editingPedido.cliente,
            endereco: editForm.endereco,
          },
        }),
      });

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === editingPedido.id
            ? {
                ...p,
                dataEntrega: editForm.dataEntrega,
                cliente: { ...p.cliente, endereco: editForm.endereco },
              }
            : p
        )
      );

      setEditingPedido(null);
    } catch (error) {
      console.error('Erro ao editar pedido:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      setPedidos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro ao apagar pedido:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPedidos([]);
    setPassword('');
  };

  const filteredPedidos = pedidos.filter((pedido) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      pedido.cliente.nome.toLowerCase().includes(query) ||
      pedido.cliente.whatsapp.includes(query) ||
      pedido.categorias.some((cat) => cat.toLowerCase().includes(query));

    const isConcluido = pedido.status.finalizado;

    if (activeTab === 'andamento') {
      return matchesSearch && !isConcluido;
    } else {
      return matchesSearch && isConcluido;
    }
  });

  const andamentoCount = pedidos.filter((p) => !p.status.finalizado).length;
  const concluidosCount = pedidos.filter((p) => p.status.finalizado).length;

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#5f9ea0]">Pedidos</h1>

          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sair
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Pesquisar por nome, WhatsApp ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('andamento')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'andamento'
                ? 'bg-[#5f9ea0] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Em andamento ({andamentoCount})
          </button>
          <button
            onClick={() => setActiveTab('concluidos')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'concluidos'
                ? 'bg-[#5f9ea0] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Concluídos ({concluidosCount})
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#b8f0ed] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando pedidos...</p>
          </div>
        ) : filteredPedidos.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery
                ? 'Nenhum pedido encontrado'
                : activeTab === 'andamento'
                ? 'Nenhum pedido em andamento'
                : 'Nenhum pedido concluído'}
            </h2>
            <p className="text-gray-500">
              {searchQuery
                ? 'Tente pesquisar com outros termos.'
                : activeTab === 'andamento'
                ? 'Todos os pedidos foram concluídos.'
                : 'Os pedidos concluídos aparecerão aqui.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                pedido={pedido}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Total: {filteredPedidos.length} pedido{filteredPedidos.length !== 1 ? 's' : ''}
        </div>
      </div>

      {editingPedido && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Editar Pedido</h3>
            <p className="text-sm text-gray-600 mb-4">
              <strong>{editingPedido.cliente.nome}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Entrega
                </label>
                <input
                  type="date"
                  value={editForm.dataEntrega}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dataEntrega: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={editForm.endereco}
                  onChange={(e) =>
                    setEditForm({ ...editForm, endereco: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingPedido(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#5f9ea0] rounded-lg hover:bg-[#4a8a8c] transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
