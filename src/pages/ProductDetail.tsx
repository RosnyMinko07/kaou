import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore, Product } from '../store/useStore';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';

// Mock data (same as Catalog for simplicity)
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gâteau au Chocolat Royal',
    category: 'Chocolat',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop',
    description: 'Un classique indémodable, riche en cacao et fondant en bouche. Parfait pour les amateurs de chocolat intense.'
  },
  {
    id: '2',
    name: 'Tarte aux Fraises',
    category: 'Fruits',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop',
    description: 'Pâte sablée croustillante, crème pâtissière légère et fraises fraîches de saison. Une touche de fraîcheur irrésistible.'
  },
  {
    id: '3',
    name: 'Cheesecake aux Fruits Rouges',
    category: 'Crème',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',
    description: 'Onctueux et frais, avec un coulis de fruits rouges maison. La douceur du fromage frais alliée à l\'acidité des fruits.'
  },
  {
    id: '4',
    name: 'Gâteau d\'Anniversaire Personnalisé',
    category: 'Custom',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    description: 'Le gâteau parfait pour célébrer, avec message personnalisé inclus. Choisissez votre parfum et votre message.'
  },
  {
    id: '5',
    name: 'Assortiment de Cupcakes',
    category: 'Chocolat',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&auto=format&fit=crop',
    description: '6 cupcakes variés pour tous les goûts. Idéal pour partager (ou pas !).'
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [message, setMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-20">Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, message);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">{product.name}</h1>
            <p className="text-2xl text-amber-600 font-bold">{product.price.toFixed(2)} €</p>
          </div>

          <p className="text-stone-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Customization */}
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <label className="block text-sm font-bold text-stone-700 mb-2">
              Message d'anniversaire (Optionnel)
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Joyeux Anniversaire..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
            <p className="text-xs text-stone-500 mt-2">
              Nous écrirons ce message délicatement sur votre gâteau.
            </p>
          </div>

          {/* Action */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
              isAdded 
                ? 'bg-green-600 text-white' 
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-xl'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-6 h-6" /> Ajouté au panier
              </>
            ) : (
              <>
                <ShoppingBag className="w-6 h-6" /> Ajouter au Panier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
