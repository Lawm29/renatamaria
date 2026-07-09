'use client';

import { useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import CategoriaSelector from '@/components/CategoriaSelector';
import BoloConfig, { BoloData } from '@/components/BoloConfig';
import BoloFalsoConfig, { BoloFalsoData } from '@/components/BoloFalsoConfig';
import DocesConfig, { DoceSelecionado } from '@/components/DocesConfig';
import ContactForm, { FormData } from '@/components/ContactForm';
import OrderSummary from '@/components/OrderSummary';

const categorias = [
  { id: 'bolo', nome: 'Bolo', icone: '🎂', descricao: 'Bolos personalizados para todas as ocasiões' },
  { id: 'artistico', nome: 'Bolo Artístico', icone: '✨', descricao: 'Bolos comestíveis decorados com detalhes artísticos' },
  { id: 'falso', nome: 'Bolo Falso', icone: '🎨', descricao: 'Bolos para decoração e eventos (não comestível)' },
  { id: 'doces', nome: 'Doces', icone: '🍬', descricao: 'Brigadeiros, bombons e doces finos' },
];

export default function PedidoPage() {
  const [step, setStep] = useState(1);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [configIndex, setConfigIndex] = useState(0);
  const [bolos, setBolos] = useState<BoloData[]>([]);
  const [bolosFalsos, setBolosFalsos] = useState<BoloFalsoData[]>([]);
  const [doces, setDoces] = useState<DoceSelecionado[]>([]);
  const [formData, setFormData] = useState<FormData>({
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toggleCategoria = (id: string) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 2 && configIndex > 0) {
      setConfigIndex(configIndex - 1);
    } else {
      setStep(step - 1);
    }
  };

  const handleBoloNext = (data: BoloData) => {
    const newBolos = [...bolos];
    newBolos[configIndex] = data;
    setBolos(newBolos);

    const nextConfigIndex = configIndex + 1;
    if (nextConfigIndex < categoriasSelecionadas.length) {
      setConfigIndex(nextConfigIndex);
    } else {
      setStep(3);
    }
  };

  const handleBoloFalsoNext = (data: BoloFalsoData) => {
    const newBolosFalsos = [...bolosFalsos];
    newBolosFalsos[configIndex] = data;
    setBolosFalsos(newBolosFalsos);

    const nextConfigIndex = configIndex + 1;
    if (nextConfigIndex < categoriasSelecionadas.length) {
      setConfigIndex(nextConfigIndex);
    } else {
      setStep(3);
    }
  };

  const handleDocesNext = (data: DoceSelecionado[]) => {
    setDoces(data);
    const nextConfigIndex = configIndex + 1;
    if (nextConfigIndex < categoriasSelecionadas.length) {
      setConfigIndex(nextConfigIndex);
    } else {
      setStep(3);
    }
  };

  const handleContactNext = (data: FormData) => {
    setFormData(data);
    setStep(4);
  };

  const handleConfirm = async () => {
    setIsSending(true);

    try {
      const orderData = {
        bolos,
        bolosFalsos,
        doces,
        formData,
        categorias: categoriasSelecionadas,
      };

      // 1. Salvar pedido no Redis primeiro
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        alert('Erro ao salvar pedido. Por favor, tente novamente.');
        return;
      }

      // 2. Tentar enviar email (não bloqueante)
      let emailFailed = false;
      try {
        const emailResponse = await fetch('/api/send-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        const emailResult = await emailResponse.json();
        emailFailed = !emailResult.success;

        if (emailFailed) {
          console.warn('Email falhou, mas pedido foi salvo:', emailResult.error);
        }
      } catch (emailErr) {
        emailFailed = true;
        console.warn('Erro ao enviar email:', emailErr);
      }

      // 3. Confirmar pedido (sempre, pois foi salvo)
      if (emailFailed) {
        alert('Pedido salvo com sucesso! Enviamos seu pedido, mas houve um problema com o email. Não se preocupe, recebemos seu pedido!');
      }
      setIsConfirmed(true);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      alert('Erro ao salvar pedido. Por favor, tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#5f9ea0] mb-4">
            Obrigada por escolher nossa confeitaria!
          </h2>
          <p className="text-gray-600 mb-6">
            Em breve entraremos em contato para confirmar sua encomenda.
          </p>
          <button
            onClick={() => {
              setIsConfirmed(false);
              setStep(1);
              setCategoriasSelecionadas([]);
              setConfigIndex(0);
              setBolos([]);
              setBolosFalsos([]);
              setDoces([]);
              setFormData({
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
            }}
            className="bg-[#b8f0ed] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#5f9ea0] transition-all"
          >
            Novo Pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <StepIndicator currentStep={step} totalSteps={4} />

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {step === 1 && (
            <CategoriaSelector
              categorias={categorias}
              selecionadas={categoriasSelecionadas}
              onToggle={toggleCategoria}
              onNext={handleNextStep}
            />
          )}

          {step === 2 && (
            <>
              {categoriasSelecionadas[configIndex] === 'bolo' && (
                <BoloConfig
                  tipo="comum"
                  onNext={handleBoloNext}
                  onBack={handlePrevStep}
                />
              )}
              {categoriasSelecionadas[configIndex] === 'artistico' && (
                <BoloConfig
                  tipo="artistico"
                  onNext={handleBoloNext}
                  onBack={handlePrevStep}
                />
              )}
              {categoriasSelecionadas[configIndex] === 'falso' && (
                <BoloFalsoConfig
                  onNext={handleBoloFalsoNext}
                  onBack={handlePrevStep}
                />
              )}
              {categoriasSelecionadas[configIndex] === 'doces' && (
                <DocesConfig
                  onNext={handleDocesNext}
                  onBack={handlePrevStep}
                />
              )}
            </>
          )}

          {step === 3 && (
            <ContactForm
              bolos={bolos}
              doces={doces}
              onSubmit={handleContactNext}
              onBack={handlePrevStep}
            />
          )}

          {step === 4 && (
            <OrderSummary
              bolos={bolos}
              bolosFalsos={bolosFalsos}
              doces={doces}
              dados={formData}
              onConfirm={handleConfirm}
              onBack={handlePrevStep}
              isSending={isSending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
