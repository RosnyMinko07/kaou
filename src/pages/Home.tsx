import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gift, Truck } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&auto=format&fit=crop" 
          alt="Four traditionnel" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg">
              Les Délices de Kaou
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 font-light drop-shadow-md">
              L'authenticité du fait maison, la passion du goût.
            </p>
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Commander Maintenant <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Nos Catégories Phares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Gâteaux au Chocolat', 
              img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop',
              desc: 'Intenses et fondants'
            },
            { 
              title: 'Tartes aux Fruits', 
              img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop',
              desc: 'Fraîcheur de saison'
            },
            { 
              title: 'Spécial Anniversaire', 
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
              desc: 'Personnalisables à souhait'
            }
          ].map((cat, idx) => (
            <Link key={idx} to="/catalog" className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{cat.title}</h3>
                <p className="text-stone-300 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="bg-amber-50 py-16 rounded-3xl">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Qualité Artisanale</h3>
            <p className="text-stone-600">Ingrédients frais et locaux, sans conservateurs.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Livraison Rapide</h3>
            <p className="text-stone-600">Suivez votre commande en temps réel jusqu'à votre porte.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Programme Fidélité</h3>
            <p className="text-stone-600">Gagnez des points et des réductions à chaque commande.</p>
          </div>
        </div>
      </section>

      {/* Referral Teaser */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-400">Parrainez vos amis !</h2>
          <p className="text-lg text-stone-300 leading-relaxed">
            Partagez la douceur des Délices de Kaou. Invitez un ami et recevez tous les deux <span className="font-bold text-white">20% de réduction</span> sur votre prochaine commande.
          </p>
          <Link to="/profile" className="inline-block bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-colors">
            Commencer le parrainage
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 bg-amber-500/20 rounded-full flex items-center justify-center animate-pulse">
            <Gift className="w-32 h-32 text-amber-400" />
          </div>
        </div>
      </section>
    </div>
  );
};
