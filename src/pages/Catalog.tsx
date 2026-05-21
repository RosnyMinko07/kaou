import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, Product } from '../store/useStore';
import { ShoppingBag, Filter } from 'lucide-react';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gâteau au Chocolat Royal',
    category: 'Chocolat',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop',
    description: 'Un classique indémodable, riche en cacao et fondant en bouche.'
  },
  {
    id: '2',
    name: 'Tarte aux Fraises',
    category: 'Fruits',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop',
    description: 'Pâte sablée croustillante, crème pâtissière légère et fraises fraîches.'
  },
  {
    id: '3',
    name: 'Cheesecake aux Fruits Rouges',
    category: 'Crème',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',
    description: 'Onctueux et frais, avec un coulis de fruits rouges maison.'
  },
  {
    id: '4',
    name: 'Gâteau d\'Anniversaire Personnalisé',
    category: 'Custom',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    description: 'Le gâteau parfait pour célébrer, avec message personnalisé inclus.'
  },
  {
    id: '5',
    name: 'Assortiment de Cupcakes',
    category: 'Chocolat',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&auto=format&fit=crop',
    description: '6 cupcakes variés pour tous les goûts.'
  }
];

const CATEGORIES = ['Tout', 'Chocolat', 'Fruits', 'Crème', 'Custom'];

export const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const { addToCart } = useStore();

  const filteredProducts = selectedCategory === 'Tout' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8 text-center">Notre Catalogue</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-amber-600 text-white shadow-lg scale-105' 
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.category === 'Custom' && (
                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Personnalisable
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-stone-800">{product.name}</h3>
                <span className="text-lg font-serif font-bold text-amber-600">{product.price}€</span>
              </div>
              <p className="text-stone-500 text-sm mb-6 line-clamp-2">{product.description}</p>
              
              <div className="flex gap-3">
                <Link 
                  to={`/product/${product.id}`}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 py-3 rounded-xl font-medium text-center transition-colors"
                >
                  Détails
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" /> Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
