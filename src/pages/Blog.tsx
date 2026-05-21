import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: 'Comment conserver vos pâtisseries ?',
    excerpt: 'Découvrez nos astuces pour garder vos gâteaux frais et moelleux plus longtemps.',
    date: '22 Fév 2026',
    author: 'Kaou',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',
    content: `
      Pour conserver au mieux vos pâtisseries, il est essentiel de les garder à l'abri de l'air et de l'humidité.
      
      1. **Les gâteaux moelleux (cakes, muffins)** : Conservez-les dans une boîte hermétique à température ambiante pendant 3 à 4 jours.
      2. **Les tartes aux fruits** : Elles doivent être conservées au réfrigérateur et consommées dans les 48h.
      3. **Les gâteaux à la crème** : Toujours au frais ! Sortez-les 15 minutes avant de déguster pour plus de saveur.
    `
  },
  {
    id: 2,
    title: 'L\'art de la dégustation',
    excerpt: 'Apprenez à savourer chaque bouchée comme un pro.',
    date: '15 Fév 2026',
    author: 'Kaou',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop',
    content: `
      Prenez le temps d'observer votre gâteau, de sentir ses arômes avant de le goûter.
      Accompagnez-le d'un thé léger ou d'un café noir pour ne pas masquer les saveurs délicates.
    `
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-12 text-center">Le Blog des Gourmands</h1>

      <div className="grid gap-12">
        {POSTS.map(post => (
          <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto relative">
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-4 hover:text-amber-600 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {post.content.split('\n')[1]}...
                </p>
                <button className="text-amber-600 font-bold hover:text-amber-700 self-start flex items-center gap-2 group">
                  Lire la suite <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
