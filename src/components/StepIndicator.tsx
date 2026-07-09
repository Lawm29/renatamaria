'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = ['Categorias', 'Configurar Itens', 'Dados Pessoais', 'Confirmação'];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                index + 1 <= currentStep
                  ? 'bg-[#b8f0ed] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center hidden sm:block">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-1 mx-2 ${
                index + 1 < currentStep ? 'bg-[#b8f0ed]' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
