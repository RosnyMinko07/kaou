import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Truck, Gift, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/catalog', label: 'Nos Gâteaux' },
    { path: '/blog', label: 'Conseils & Astuces' },
    { path: '/tracking', label: 'Suivi de Commande' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-amber-700 flex items-center gap-2">
            <span className="text-3xl">🍰</span> Les Délices de Kaou
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  location.pathname === link.path ? 'text-amber-600 underline underline-offset-4' : 'text-stone-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/profile" className="p-2 hover:bg-stone-100 rounded-full transition-colors relative group">
              <User className="w-6 h-6 text-stone-600 group-hover:text-amber-600" />
              <span className="sr-only">Profil</span>
            </Link>
            <Link to="/cart" className="p-2 hover:bg-stone-100 rounded-full transition-colors relative group">
              <ShoppingCart className="w-6 h-6 text-stone-600 group-hover:text-amber-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Panier</span>
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-stone-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 p-4 absolute w-full shadow-lg">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-medium text-stone-600 hover:text-amber-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Les Délices de Kaou</h3>
            <p className="text-sm leading-relaxed">
              Des gâteaux faits maison avec amour, cuits au four traditionnel pour une saveur authentique.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-amber-400">Catalogue</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400">Blog & Astuces</Link></li>
              <li><Link to="/tracking" className="hover:text-amber-400">Suivi de Commande</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Programme de Parrainage</h4>
            <p className="text-sm mb-4">Invitez vos amis et gagnez des réductions sur vos prochaines commandes !</p>
            <Link to="/profile" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm">
              <Gift className="w-4 h-4" /> En savoir plus
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Les Délices de Kaou. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};
