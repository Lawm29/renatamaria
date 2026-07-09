'use client';

import { useState } from 'react';
import recheios from '@/data/recheios.json';
import coberturas from '@/data/coberturas.json';
import doces from '@/data/doces.json';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'recheios' | 'coberturas' | 'doces'>('recheios');
  const [recheiosData, setRecheiosData] = useState(recheios);
  const [coberturasData, setCoberturasData] = useState(coberturas);
  const [docesData, setDocesData] = useState(doces);

  const [newRecheio, setNewRecheio] = useState('');
  const [newCategoria, setNewCategoria] = useState('Nobre');
  const [newCobertura, setNewCobertura] = useState('');
  const [newDoce, setNewDoce] = useState('');
  const [newDoceCategoria, setNewDoceCategoria] = useState('Tradicionais');

  const addRecheio = () => {
    if (newRecheio.trim()) {
      const updated = { ...recheiosData };
      const cat = updated.categorias.find((c) => c.nome === newCategoria);
      if (cat && !cat.recheios.includes(newRecheio)) {
        cat.recheios.push(newRecheio);
        setRecheiosData(updated);
        setNewRecheio('');
      }
    }
  };

  const removeRecheio = (categoria: string, index: number) => {
    const updated = { ...recheiosData };
    const cat = updated.categorias.find((c) => c.nome === categoria);
    if (cat) {
      cat.recheios.splice(index, 1);
      setRecheiosData(updated);
    }
  };

  const addCobertura = () => {
    if (newCobertura.trim() && !coberturasData.includes(newCobertura)) {
      setCoberturasData([...coberturasData, newCobertura]);
      setNewCobertura('');
    }
  };

  const removeCobertura = (index: number) => {
    const updated = [...coberturasData];
    updated.splice(index, 1);
    setCoberturasData(updated);
  };

  const addDoce = () => {
    if (newDoce.trim()) {
      const updated = { ...docesData };
      const cat = updated.categorias.find((c) => c.nome === newDoceCategoria);
      if (cat && !cat.doces.includes(newDoce)) {
        cat.doces.push(newDoce);
        setDocesData(updated);
        setNewDoce('');
      }
    }
  };

  const removeDoce = (categoria: string, index: number) => {
    const updated = { ...docesData };
    const cat = updated.categorias.find((c) => c.nome === categoria);
    if (cat) {
      cat.doces.splice(index, 1);
      setDocesData(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#5f9ea0] mb-8 text-center">
          Painel Administrativo
        </h1>

        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('recheios')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'recheios'
                ? 'bg-[#b8f0ed] text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Recheios
          </button>
          <button
            onClick={() => setActiveTab('coberturas')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'coberturas'
                ? 'bg-[#b8f0ed] text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Coberturas
          </button>
          <button
            onClick={() => setActiveTab('doces')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'doces'
                ? 'bg-[#b8f0ed] text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Doces
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {activeTab === 'recheios' && (
            <div>
              <h2 className="text-xl font-bold text-[#5f9ea0] mb-4">Gerenciar Recheios</h2>
              
              <div className="flex gap-2 mb-4">
                <select
                  value={newCategoria}
                  onChange={(e) => setNewCategoria(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Nobre">Nobre</option>
                  <option value="Gourmet">Gourmet</option>
                  <option value="Tradicional">Tradicional</option>
                </select>
                <input
                  type="text"
                  value={newRecheio}
                  onChange={(e) => setNewRecheio(e.target.value)}
                  placeholder="Nome do recheio"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addRecheio}
                  className="bg-[#b8f0ed] text-white px-4 py-2 rounded-lg hover:bg-[#5f9ea0]"
                >
                  Adicionar
                </button>
              </div>

              {recheiosData.categorias.map((cat) => (
                <div key={cat.nome} className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">{cat.nome}</h3>
                  <div className="space-y-1">
                    {cat.recheios.map((r, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{r}</span>
                        <button
                          onClick={() => removeRecheio(cat.nome, i)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coberturas' && (
            <div>
              <h2 className="text-xl font-bold text-[#5f9ea0] mb-4">Gerenciar Coberturas</h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCobertura}
                  onChange={(e) => setNewCobertura(e.target.value)}
                  placeholder="Nome da cobertura"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addCobertura}
                  className="bg-[#b8f0ed] text-white px-4 py-2 rounded-lg hover:bg-[#5f9ea0]"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-1">
                {coberturasData.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{c}</span>
                    <button
                      onClick={() => removeCobertura(i)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'doces' && (
            <div>
              <h2 className="text-xl font-bold text-[#5f9ea0] mb-4">Gerenciar Doces</h2>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                <select
                  value={newDoceCategoria}
                  onChange={(e) => setNewDoceCategoria(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Tradicionais">Tradicionais</option>
                  <option value="Gourmet">Gourmet</option>
                  <option value="Finos (Castanhas)">Finos (Castanhas)</option>
                  <option value="Finos (Frutas)">Finos (Frutas)</option>
                </select>
                <input
                  type="text"
                  value={newDoce}
                  onChange={(e) => setNewDoce(e.target.value)}
                  placeholder="Nome do doce"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addDoce}
                  className="bg-[#b8f0ed] text-white px-4 py-2 rounded-lg hover:bg-[#5f9ea0]"
                >
                  Adicionar
                </button>
              </div>

              {docesData.categorias.map((cat) => (
                <div key={cat.nome} className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">{cat.nome}</h3>
                  <div className="space-y-1">
                    {cat.doces.map((d, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{d}</span>
                        <button
                          onClick={() => removeDoce(cat.nome, i)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> As alterações feitas aqui são apenas para visualização. 
            Para salvar permanentemente, seria necessário integrar com um banco de dados.
          </p>
        </div>
      </div>
    </div>
  );
}
