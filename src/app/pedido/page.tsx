'use client';

import { useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import CategoriaSelector from '@/components/CategoriaSelector';
import BoloConfig, { BoloData } from '@/components/BoloConfig';
import DocesConfig, { DoceSelecionado } from '@/components/DocesConfig';
import ContactForm, { FormData } from '@/components/ContactForm';
import OrderSummary from '@/components/OrderSummary';

const categorias = [
  { id: 'bolo', nome: 'Bolo', icone: '🎂' },
  { id: 'artistico', nome: 'Bolo Artístico', icone: '✨' },
  { id: 'doces', nome: 'Doces', icone: '🍬' },
];

export default function PedidoPage() {
  const [step, setStep] = useState(1);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [configIndex, setConfigIndex] = useState(0);
  const [bolos, setBolos] = useState<BoloData[]>([]);
  const [doces, setDoces] = useState<DoceSelecionado[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    whatsapp: '',
    dataEntrega: '',
    rua: '',
    bairro: '',
    cidade: 'Barretos',
    estado: 'SP',
    cep: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const handleConfirm = () => {
    const phone = '5517981843759';
    
    let message = '🎂 *Pedido Renata Maria*\n\n';
    
    if (bolos.length > 0) {
      message += '*Bolos:*\n';
      bolos.forEach((bolo, index) => {
        const tipo = bolo.tipo === 'artistico' ? 'Bolo Artístico' : 'Bolo';
        message += `${tipo} ${index + 1}:\n`;
        message += `- Tamanho: ${bolo.tamanho}\n`;
        message += `- Recheio: ${bolo.recheio}\n`;
        message += `- Cobertura: ${bolo.cobertura}\n`;
        if (bolo.observacoes) {
          message += `- Obs: ${bolo.observacoes}\n`;
        }
        message += '\n';
      });
    }
    
    if (doces.length > 0) {
      message += '*Doces:*\n';
      doces.forEach((doce) => {
        message += `- ${doce.nome} x${doce.quantidade}\n`;
      });
      message += '\n';
    }
    
    message += '*Dados de Entrega:*\n';
    message += `- Nome: ${formData.nome}\n`;
    message += `- WhatsApp: ${formData.whatsapp}\n`;
    message += `- Data: ${new Date(formData.dataEntrega).toLocaleDateString('pt-BR')}\n`;
    message += `- Endereço: ${formData.rua}, ${formData.bairro} - ${formData.cidade}/${formData.estado}\n`;
    message += `- CEP: ${formData.cep}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    
    setIsConfirmed(true);
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
              setDoces([]);
              setFormData({
                nome: '',
                whatsapp: '',
                dataEntrega: '',
                rua: '',
                bairro: '',
                cidade: 'Barretos',
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
              doces={doces}
              dados={formData}
              onConfirm={handleConfirm}
              onBack={handlePrevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
