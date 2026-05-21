import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle, Truck, Package, Clock } from 'lucide-react';

const STEPS = [
  { id: 'pending', label: 'Commande Reçue', icon: Clock },
  { id: 'baking', label: 'En Préparation', icon: Package },
  { id: 'delivering', label: 'En Livraison', icon: Truck },
  { id: 'delivered', label: 'Livré', icon: CheckCircle },
];

export const Tracking: React.FC = () => {
  const { orders } = useStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate progress for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Aucune commande en cours</h2>
        <p className="text-stone-500">Passez une commande pour suivre son avancement !</p>
      </div>
    );
  }

  const latestOrder = orders[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Suivi de Commande</h1>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-stone-500 uppercase tracking-wider font-bold">Commande N°</p>
            <p className="text-2xl font-mono font-bold text-stone-800">#{latestOrder.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-stone-500 uppercase tracking-wider font-bold">Date</p>
            <p className="text-stone-800 font-medium">{new Date(latestOrder.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -translate-y-1/2 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-amber-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                      isActive 
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-110' 
                        : 'bg-white border-stone-200 text-stone-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span 
                    className={`text-xs font-bold uppercase tracking-wide transition-colors duration-500 ${
                      isActive ? 'text-amber-600' : 'text-stone-300'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-stone-50 p-6 rounded-2xl">
          <h3 className="font-bold text-stone-800 mb-4">Détails de la commande</h3>
          <ul className="space-y-3">
            {latestOrder.items.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span className="text-stone-600">
                  {item.quantity}x {item.name}
                  {item.message && <span className="block text-xs italic text-stone-400">Msg: "{item.message}"</span>}
                </span>
                <span className="font-medium text-stone-800">{(item.price * item.quantity).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-amber-600">{latestOrder.total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};
