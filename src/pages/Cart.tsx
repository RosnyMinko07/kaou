import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    placeOrder();
    navigate('/tracking');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800">Votre panier est vide</h2>
        <p className="text-stone-500">Découvrez nos délicieux gâteaux pour le remplir !</p>
        <Link 
          to="/catalog" 
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors"
        >
          Voir le Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">Votre Panier</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        {cart.map((item) => (
          <div key={`${item.id}-${item.message}`} className="p-6 border-b border-stone-100 last:border-0 flex flex-col sm:flex-row items-center gap-6">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg text-stone-800">{item.name}</h3>
              <p className="text-amber-600 font-medium">{item.price.toFixed(2)} €</p>
              {item.message && (
                <p className="text-sm text-stone-500 mt-1 italic">
                  Message: "{item.message}"
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-200 rounded-lg">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 hover:bg-stone-50 text-stone-600"
                >
                  -
                </button>
                <span className="px-3 py-1 font-medium text-stone-800">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-stone-50 text-stone-600"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-stone-600">Total</span>
          <span className="text-3xl font-serif font-bold text-amber-600">{total.toFixed(2)} €</span>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Commander <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
