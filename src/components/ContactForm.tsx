'use client';

import { useState } from 'react';
import { BoloData } from './BoloConfig';
import { DoceSelecionado } from './DocesConfig';

interface ContactFormProps {
  bolos: BoloData[];
  doces: DoceSelecionado[];
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export interface FormData {
  nome: string;
  whatsapp: string;
  dataEntrega: string;
  tipoLocal: 'barretos' | 'outras' | null;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function ContactForm({ bolos, doces, onSubmit, onBack }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    nome: '',
    whatsapp: '',
    dataEntrega: '',
    tipoLocal: null,
    rua: '',
    bairro: '',
    cidade: '',
    estado: 'SP',
    cep: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTipoLocal = (tipo: 'barretos' | 'outras') => {
    setForm({ ...form, tipoLocal: tipo });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid = form.nome && form.whatsapp && form.dataEntrega && form.tipoLocal &&
    (form.tipoLocal === 'barretos' || (form.rua && form.bairro && form.cidade && form.estado && form.cep));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#5f9ea0]">
          Seus dados de contato
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Onde você está? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleTipoLocal('barretos')}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                form.tipoLocal === 'barretos'
                  ? 'border-[#5f9ea0] bg-[#b8f0ed]/20 text-[#5f9ea0]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">📍</div>
              <div className="font-semibold">Barretos</div>
              <div className="text-xs mt-1 opacity-70">Apenas retirada</div>
            </button>
            <button
              type="button"
              onClick={() => handleTipoLocal('outras')}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                form.tipoLocal === 'outras'
                  ? 'border-[#5f9ea0] bg-[#b8f0ed]/20 text-[#5f9ea0]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">🚚</div>
              <div className="font-semibold">Outras cidades</div>
              <div className="text-xs mt-1 opacity-70">Entrega em SP</div>
            </button>
          </div>
        </div>

        {form.tipoLocal && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp *
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Entrega *
              </label>
              <input
                type="date"
                name="dataEntrega"
                value={form.dataEntrega}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
              />
            </div>

            {form.tipoLocal === 'outras' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rua e Número *
                  </label>
                  <input
                    type="text"
                    name="rua"
                    value={form.rua}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    value={form.bairro}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={form.cidade}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado *
                    </label>
                    <select
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                    >
                      <option value="SP">São Paulo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={form.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8f0ed] focus:border-transparent"
                  />
                </div>
              </>
            )}

            {form.tipoLocal === 'barretos' && (
              <div className="bg-[#b8f0ed]/10 p-4 rounded-xl text-center">
                <p className="text-sm text-[#5f9ea0]">
                  📍 Retirada em Barretos-SP
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  O endereço será informado após a confirmação do pedido
                </p>
              </div>
            )}
          </>
        )}
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
          type="submit"
          disabled={!isValid}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            isValid
              ? 'bg-[#b8f0ed] text-white hover:bg-[#5f9ea0]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Enviar Pedido
        </button>
      </div>
    </form>
  );
}
