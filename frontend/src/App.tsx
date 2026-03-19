import { useEffect, useState } from 'react'
import { getOffers } from './api/api'
import { Leaf, Package, MapPin, DollarSign, Plus, RefreshCw } from 'lucide-react'
import { AddOfferModal } from './components/AddOfferModal' // Importando o modal que vamos criar

// 1. MUDANÇA: Interface atualizada com o campo 'price'
interface WasteOffer {
  id: string;
  description: string;
  wasteType: string;
  weightKg: number;
  price: number; // Novo campo
  status: string;
}

function App() {
  const [offers, setOffers] = useState<WasteOffer[]>([]);
  const [loading, setLoading] = useState(true);
  // 2. MUDANÇA: Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error("Erro ao carregar ofertas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-emerald-400 flex items-center gap-2">
            <Leaf size={32} /> GuaxiSpace
          </h1>
          <p className="text-slate-400">Marketplace de Orgânicos | Boa Vista</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={loadOffers}
            className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
            title="Atualizar lista"
          >
            <RefreshCw size={20} className={loading ? "animate-spin text-emerald-400" : "text-slate-400"} />
          </button>
          
          {/* 3. MUDANÇA: Botão principal para abrir o cadastro de venda */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
          >
            <Plus size={20} /> Anunciar Resíduo
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading && offers.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-emerald-500/50 transition-all group shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-900/30 text-emerald-400 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                    {offer.wasteType}
                  </span>
                  <span className="text-slate-600 text-[10px] font-mono">ID: {offer.id.slice(-6)}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {offer.description}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Package size={16} className="text-emerald-500/70" /> 
                    <span>{offer.weightKg} kg disponíveis</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin size={16} className="text-emerald-500/70" /> 
                    <span>Boa Vista, RR</span>
                  </div>
                  {/* 4. MUDANÇA: Exibição do Preço no Card */}
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mt-2">
                    <DollarSign size={20} />
                    <span>R$ {offer.price?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest italic">
                    {offer.status}
                  </span>
                  <button className="bg-slate-900 hover:bg-emerald-900/20 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Negociar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 5. MUDANÇA: Inclusão do Modal de Cadastro */}
      <AddOfferModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadOffers} 
      />
    </div>
  )
}

export default App;
