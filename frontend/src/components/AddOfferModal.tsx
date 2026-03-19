import React, { useState } from 'react';
import { createOffer } from '../api/api';
import { X, DollarSign, Tag, Weight, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddOfferModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    wasteType: 'Orgânico',
    weightKg: 0,
    price: 0,
    latitude: 2.82, // Fixado em Boa Vista para o MVP
    longitude: -60.67,
    status: 'DISPONÍVEL'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // --- VALIDAÇÃO SIMPLES ---
    if (formData.description.length < 5) {
      setError("A descrição precisa de pelo menos 5 caracteres.");
      return;
    }
    if (formData.price <= 0 || formData.weightKg <= 0) {
      setError("Preço e Peso devem ser maiores que zero.");
      return;
    }

    setLoading(true);
    try {
      await createOffer(formData);
      onSuccess(); // Recarrega a lista no App.tsx
      onClose();   // Fecha o modal
      // Limpa o form para a próxima
      setFormData({ description: '', wasteType: 'Orgânico', weightKg: 0, price: 0, latitude: 2.82, longitude: -60.67, status: 'DISPONÍVEL' });
    } catch (err) {
      setError("Falha ao conectar com o Backend. O Java está rodando?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700/30 px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Tag size={20} /> Novo Anúncio
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição do Resíduo</label>
            <input 
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="Ex: 3kg de cascas de banana e manga"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Peso (kg)</label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="number" step="0.1" required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 pl-10 outline-none focus:border-emerald-500"
                  value={formData.weightKg || ''}
                  onChange={e => setFormData({...formData, weightKg: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-emerald-500" size={18} />
                <input 
                  type="number" step="0.01" required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 pl-10 outline-none focus:border-emerald-500 font-mono text-emerald-400"
                  value={formData.price || ''}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/40 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : "Publicar agora em Boa Vista"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
