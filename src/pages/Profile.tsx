import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Gift, Calendar, Copy, Check } from 'lucide-react';

export const Profile: React.FC = () => {
  const { birthday, setBirthday } = useStore();
  const [date, setDate] = useState(birthday || '');
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralCode = 'KAOU-FRIEND-2026';

  const handleSaveBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    setBirthday(date);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-12">
      <h1 className="text-3xl font-serif font-bold text-stone-800 text-center">Mon Espace Gourmand</h1>

      {/* Birthday Section */}
      <section className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-amber-100 p-3 rounded-full text-amber-600">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-800">Mon Anniversaire</h2>
        </div>

        <p className="text-stone-600 mb-6">
          Enregistrez votre date d'anniversaire pour recevoir des suggestions personnalisées et une surprise une semaine à l'avance !
        </p>

        <form onSubmit={handleSaveBirthday} className="flex gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center gap-2"
          >
            {isSaved ? <Check className="w-5 h-5" /> : 'Enregistrer'}
          </button>
        </form>
        {isSaved && (
          <p className="text-green-600 text-sm mt-3 flex items-center gap-2">
            <Check className="w-4 h-4" /> Date enregistrée avec succès !
          </p>
        )}
      </section>

      {/* Referral Section */}
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-full text-white">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Parrainage</h2>
          </div>

          <p className="text-amber-50 mb-8 text-lg">
            Invitez vos amis à découvrir Les Délices de Kaou. Ils recevront <span className="font-bold text-white">20% de réduction</span> sur leur première commande, et vous aussi !
          </p>

          <div className="bg-white/10 p-4 rounded-xl flex items-center justify-between border border-white/20">
            <code className="font-mono text-xl font-bold tracking-wider">{referralCode}</code>
            <button
              onClick={copyReferral}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Copier le code"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-sm text-amber-100 mt-4 text-center">
            Partagez ce code avec vos proches !
          </p>
        </div>
      </section>
    </div>
  );
};
