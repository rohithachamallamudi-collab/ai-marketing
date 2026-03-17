const { useState, useEffect, useRef, useCallback } = React;

// ── Icon Set ──────────────────────────────────────────────
const Icons = {
    Activity:    ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    DollarSign:  ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    TrendingUp:  ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    Zap:         ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Users:       ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    ArrowRight:  ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    Plus:        ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Trash:       ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
    RefreshCw:   ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    Settings:    ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    X:           ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    BarChart:    ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    Search:      ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Upload:      ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    Check:       ({size=20,className=""})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
};

const API_BASE_DEFAULT = "http://localhost:8000/api/v1";

// ── Spinner ───────────────────────────────────────────────
const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
);

// ── Toast ─────────────────────────────────────────────────
function useToast() {
    const [toasts, setToasts] = useState([]);
    const add = (msg, type="success") => {
        const id = Date.now();
        setToasts(t => [...t, {id, msg, type}]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
    };
    return {toasts, add};
}

function ToastContainer({toasts}) {
    return (
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-[100]">
            {toasts.map(t => (
                <div key={t.id} className={`px-4 py-3 rounded-lg text-sm font-medium shadow-lg flex items-center gap-2 animate-fade-in ${t.type==='error'?'bg-red-600':'bg-emerald-600'}`}>
                    {t.type==='error' ? <Icons.X size={16}/> : <Icons.Check size={16}/>}
                    {t.msg}
                </div>
            ))}
        </div>
    );
}

// ── Settings Modal ────────────────────────────────────────
function SettingsModal({apiBase, onSave, onClose}) {
    const [url, setUrl] = useState(apiBase);
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="glass rounded-2xl p-6 w-full max-w-md border border-gray-700" onClick={e=>e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Icons.Settings size={18} className="text-primary"/> Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><Icons.X/></button>
                </div>
                <label className="block text-sm text-gray-400 mb-1">API Base URL</label>
                <input value={url} onChange={e=>setUrl(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white mb-4 focus:outline-none focus:border-primary"/>
                <button onClick={()=>{ onSave(url); onClose(); }}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary font-bold">Save Settings</button>
            </div>
        </div>
    );
}

// ── Add-Campaign Modal ────────────────────────────────────
function AddCampaignModal({onAdd, onClose}) {
    const [form, setForm] = useState({campaign_id:'', budget:'', ad_spend:'', ctr:'', cpc:''});
    const set = (k,v) => setForm(f=>({...f,[k]:v}));
    const handleSubmit = () => {
        if(!form.campaign_id || !form.budget || !form.ad_spend || !form.ctr || !form.cpc) return;
        onAdd({
            campaign_id: form.campaign_id,
            budget: parseFloat(form.budget),
            ad_spend: parseFloat(form.ad_spend),
            ctr: parseFloat(form.ctr),
            cpc: parseFloat(form.cpc),
        });
        onClose();
    };
    const fields = [
        {key:'campaign_id', label:'Campaign ID', placeholder:'e.g. CMP_0100', type:'text'},
        {key:'budget',      label:'Budget ($)',   placeholder:'e.g. 2000',    type:'number'},
        {key:'ad_spend',    label:'Ad Spend ($)', placeholder:'e.g. 1500',    type:'number'},
        {key:'ctr',         label:'CTR (%)',       placeholder:'e.g. 3.5',     type:'number'},
        {key:'cpc',         label:'CPC ($)',       placeholder:'e.g. 1.2',     type:'number'},
    ];
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="glass rounded-2xl p-6 w-full max-w-md border border-gray-700" onClick={e=>e.stopPropagation()}>
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Icons.Plus size={18} className="text-accent"/> Add Campaign</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><Icons.X/></button>
                </div>
                <div className="space-y-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                            <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                                onChange={e=>set(f.key,e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"/>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit}
                    className="w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary font-bold flex items-center justify-center gap-2">
                    <Icons.Plus size={16}/> Add Campaign
                </button>
            </div>
        </div>
    );
}

// ── Predict Modal ─────────────────────────────────────────
function PredictModal({apiBase, toast, onClose}) {
    const [form, setForm] = useState({budget:'', ad_spend:'', ctr:'', cpc:''});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const set = (k,v) => setForm(f=>({...f,[k]:v}));
    const handlePredict = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${apiBase}/predict`, {
                method:'POST', headers:{'Content-Type':'application/json'},
                body: JSON.stringify({budget:parseFloat(form.budget), ad_spend:parseFloat(form.ad_spend), ctr:parseFloat(form.ctr), cpc:parseFloat(form.cpc)})
            });
            const data = await r.json();
            if(!r.ok) throw new Error(data.detail||'Prediction failed');
            setResult(data.predicted_conversions);
        } catch(e) { toast(e.message,'error'); }
        finally { setLoading(false); }
    };
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="glass rounded-2xl p-6 w-full max-w-md border border-gray-700" onClick={e=>e.stopPropagation()}>
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Icons.Search size={18} className="text-yellow-400"/> Quick Predict</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><Icons.X/></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[{k:'budget',label:'Budget ($)'},{k:'ad_spend',label:'Ad Spend ($)'},{k:'ctr',label:'CTR (%)'},{k:'cpc',label:'CPC ($)'}].map(({k,label})=>(
                        <div key={k}>
                            <label className="block text-xs text-gray-400 mb-1">{label}</label>
                            <input type="number" placeholder="0" value={form[k]} onChange={e=>set(k,e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"/>
                        </div>
                    ))}
                </div>
                {result !== null && (
                    <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-400">Predicted Conversions</p>
                        <p className="text-3xl font-extrabold text-emerald-400 mt-1">{result.toFixed(1)}</p>
                    </div>
                )}
                <button onClick={handlePredict} disabled={loading}
                    className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 font-bold flex items-center justify-center gap-2">
                    {loading ? <Spinner/> : <><Icons.Search size={16}/> Predict</>}
                </button>
            </div>
        </div>
    );
}

// ── Bar Chart ─────────────────────────────────────────────
function CampaignBarChart({campaigns, optimizationResult}) {
    const canvasRef = useRef(null);
    const chartRef  = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();

        const labels = campaigns.map(c => c.campaign_id);
        const datasets = optimizationResult ? [
            {
                label: 'Original Budget ($)',
                data: optimizationResult.campaigns.map(c => c.original_budget),
                backgroundColor: 'rgba(99,102,241,0.7)',
                borderRadius: 6,
            },
            {
                label: 'Optimized Budget ($)',
                data: optimizationResult.campaigns.map(c => c.optimized_budget),
                backgroundColor: 'rgba(16,185,129,0.7)',
                borderRadius: 6,
            },
            {
                label: 'Predicted Conversions',
                data: optimizationResult.campaigns.map(c => c.predicted_conversions),
                backgroundColor: 'rgba(236,72,153,0.7)',
                borderRadius: 6,
                yAxisID: 'y2',
            }
        ] : [
            {
                label: 'Budget ($)',
                data: campaigns.map(c => c.budget),
                backgroundColor: 'rgba(99,102,241,0.7)',
                borderRadius: 6,
            },
            {
                label: 'Ad Spend ($)',
                data: campaigns.map(c => c.ad_spend),
                backgroundColor: 'rgba(236,72,153,0.7)',
                borderRadius: 6,
            },
        ];

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#9ca3af', font: {size: 11} } },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    ...(optimizationResult ? { y2: { position: 'right', ticks: { color: '#ec4899' }, grid: { display: false } } } : {}),
                }
            }
        });
        return () => chartRef.current && chartRef.current.destroy();
    }, [campaigns, optimizationResult]);

    return <canvas ref={canvasRef} style={{height:'280px'}}/>;
}

// ── Main App ──────────────────────────────────────────────
function App() {
    const {toasts, add: toast} = useToast();
    const [apiBase, setApiBase]   = useState(API_BASE_DEFAULT);
    const [campaigns, setCampaigns]  = useState([]);
    const [loading, setLoading]      = useState(false);
    const [optimizing, setOptimizing]= useState(false);
    const [totalBudget, setTotalBudget] = useState(10000);
    const [optimizationResult, setOptimizationResult] = useState(null);
    const [tab, setTab]              = useState('campaigns');  // 'campaigns' | 'charts' | 'predict'
    const [showSettings, setShowSettings] = useState(false);
    const [showAddCampaign, setShowAddCampaign] = useState(false);
    const [showPredict, setShowPredict]  = useState(false);
    const [ingesting, setIngesting]  = useState(false);

    const fetchCampaigns = useCallback(async () => {
        setLoading(true);
        try {
            const r = await fetch(`${apiBase}/campaigns`);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const data = await r.json();
            setCampaigns(data.campaigns || []);
            toast(`Loaded ${(data.campaigns||[]).length} campaigns`);
        } catch(e) {
            toast(`Failed to fetch campaigns: ${e.message}`, 'error');
        } finally { setLoading(false); }
    }, [apiBase]);

    useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

    // Add campaign locally + ingest to backend
    const handleAddCampaign = async (camp) => {
        setIngesting(true);
        try {
            const r = await fetch(`${apiBase}/ingest`, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({campaigns: [camp]})
            });
            if (!r.ok) throw new Error('Ingest failed');
            toast(`Campaign ${camp.campaign_id} added!`);
            await fetchCampaigns();
        } catch(e) {
            toast(e.message, 'error');
        } finally { setIngesting(false); }
    };

    // Remove campaign from local state
    const handleRemoveCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.campaign_id !== id));
        toast(`Campaign ${id} removed from view`);
        if (optimizationResult) setOptimizationResult(null);
    };

    const handleOptimize = async () => {
        if (!totalBudget || campaigns.length === 0) return;
        setOptimizing(true);
        try {
            const r = await fetch(`${apiBase}/optimize`, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ total_budget: parseFloat(totalBudget), campaigns })
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.detail||'Optimization failed');
            setOptimizationResult(data);
            setTab('charts');
            toast('Optimization complete! View Charts tab.');
        } catch(e) {
            toast(e.message, 'error');
        } finally { setOptimizing(false); }
    };

    const stats = [
        { label:'Active Campaigns', value: campaigns.length,                                                           icon:<Icons.Activity size={18} className="text-blue-400"/>},
        { label:'Total Spend',      value:`$${campaigns.reduce((a,b)=>a+b.ad_spend,0).toLocaleString(undefined,{maximumFractionDigits:0})}`, icon:<Icons.DollarSign size={18} className="text-green-400"/>},
        { label:'Avg CTR',          value:`${(campaigns.reduce((a,b)=>a+parseFloat(b.ctr),0)/Math.max(campaigns.length,1)).toFixed(2)}%`,  icon:<Icons.TrendingUp size={18} className="text-yellow-400"/>},
        { label:'Total Conversions',value: campaigns.reduce((a,b)=>a+(b.conversions||0),0),                              icon:<Icons.Users size={18} className="text-purple-400"/>},
    ];

    return (
        <div className="min-h-screen bg-darkbg text-white font-inter">

            {/* Navbar */}
            <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg">
                        <Icons.Zap size={22} className="text-white"/>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">AI Marketing Optimizer</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchCampaigns} title="Refresh data"
                        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                        <Icons.RefreshCw size={16} className={loading?'animate-spin':''}/>
                    </button>
                    <button onClick={() => setShowPredict(true)}
                        className="px-3 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm font-medium flex items-center gap-1.5 transition">
                        <Icons.Search size={15}/> Quick Predict
                    </button>
                    <button onClick={() => setShowAddCampaign(true)}
                        className="px-3 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 text-emerald-300 text-sm font-medium flex items-center gap-1.5 transition">
                        <Icons.Upload size={15}/> Import Campaign
                    </button>
                    <button onClick={() => setShowSettings(true)}
                        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm flex items-center gap-1.5 transition">
                        <Icons.Settings size={15}/> Settings
                    </button>
                </div>
            </nav>

            <main className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s,i) => (
                        <div key={i} className="glass rounded-xl p-5 border border-gray-700/50 hover-glow transition duration-300">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-gray-400 text-sm font-medium">{s.label}</p>
                                <div className="p-1.5 bg-gray-800 rounded-md">{s.icon}</div>
                            </div>
                            <h3 className="text-2xl font-bold">{loading ? '...' : s.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Optimizer Panel */}
                    <div className="glass rounded-xl p-6 border border-gray-700/50 flex flex-col">
                        <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                            <Icons.Zap size={18} className="text-yellow-400"/> AI Budget Optimizer
                        </h2>
                        <p className="text-xs text-gray-400 mb-5">ML model maximizes conversions across campaigns using your total budget constraint.</p>

                        <label className="block text-sm font-medium text-gray-300 mb-1">Total Budget ($)</label>
                        <input type="number" value={totalBudget} onChange={e=>setTotalBudget(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-primary transition"/>

                        <button onClick={handleOptimize}
                            disabled={optimizing || campaigns.length === 0}
                            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${optimizing||campaigns.length===0?'bg-gray-700 cursor-not-allowed opacity-60':'bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-[1.02]'}`}>
                            {optimizing ? <><Spinner/> Optimizing...</> : <>Optimize Budgets <Icons.ArrowRight size={16}/></>}
                        </button>

                        {optimizationResult && (
                            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-1">Last Optimization Result</p>
                                <p className="text-sm font-semibold text-emerald-400">
                                    ~{optimizationResult.total_predicted_conversions.toFixed(0)} total predicted conversions
                                </p>
                                <button onClick={()=>setOptimizationResult(null)} className="text-xs text-gray-500 hover:text-gray-300 mt-2">Clear result</button>
                            </div>
                        )}

                        {/* AI Recommendations */}
                        <div className="mt-5 bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex-1">
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"/>
                                AI Recommendations
                            </h3>
                            <ul className="text-xs text-gray-300 space-y-2">
                                {campaigns.length === 0 && <li className="text-gray-500">Import campaigns to see insights.</li>}
                                {campaigns.length > 0 && (()=>{
                                    const sorted = [...campaigns].sort((a,b)=>parseFloat(b.ctr)-parseFloat(a.ctr));
                                    const best = sorted[0];
                                    const worst = sorted[sorted.length-1];
                                    return <>
                                        <li>✨ <strong>{best?.campaign_id}</strong> has highest CTR ({parseFloat(best?.ctr).toFixed(2)}%) — consider increasing budget.</li>
                                        {sorted.length > 1 && <li>⚠️ <strong>{worst?.campaign_id}</strong> has lowest CTR ({parseFloat(worst?.ctr).toFixed(2)}%) — review targeting.</li>}
                                        {campaigns.some(c=>parseFloat(c.cpc)>3) && <li>🔴 Some campaigns have CPC {'>'} $3. High cost per click detected.</li>}
                                    </>;
                                })()}
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="glass rounded-xl p-6 border border-gray-700/50 lg:col-span-2">

                        {/* Tabs */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
                                {[{id:'campaigns',label:'Campaigns',icon:<Icons.Activity size={14}/>},{id:'charts',label:'Charts',icon:<Icons.BarChart size={14}/>}].map(t=>(
                                    <button key={t.id} onClick={()=>setTab(t.id)}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition ${tab===t.id?'bg-primary text-white':'text-gray-400 hover:text-white'}`}>
                                        {t.icon}{t.label}
                                    </button>
                                ))}
                            </div>
                            <button onClick={()=>setShowAddCampaign(true)}
                                className="text-sm px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center gap-1.5 transition">
                                <Icons.Plus size={14}/> Add Campaign
                            </button>
                        </div>

                        {/* Campaigns Tab */}
                        {tab === 'campaigns' && (
                            loading ? (
                                <div className="flex justify-center items-center h-40"><Spinner/></div>
                            ) : campaigns.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-gray-500 gap-3">
                                    <Icons.Upload size={32}/>
                                    <p className="text-sm">No campaigns yet. Click <strong>"Import Campaign"</strong> to add one.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="text-gray-400 border-b border-gray-700">
                                                <th className="pb-3">Campaign</th>
                                                <th className="pb-3 text-right">Budget</th>
                                                <th className="pb-3 text-right">Spend</th>
                                                <th className="pb-3 text-right">CTR&nbsp;(%)</th>
                                                <th className="pb-3 text-right">CPC</th>
                                                <th className="pb-3 text-right">Conv.</th>
                                                <th className="pb-3"/>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campaigns.map((c,i)=>(
                                                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                                    <td className="py-2.5 font-medium text-blue-400">{c.campaign_id}</td>
                                                    <td className="py-2.5 text-right">${Number(c.budget).toFixed(0)}</td>
                                                    <td className="py-2.5 text-right">${Number(c.ad_spend).toFixed(0)}</td>
                                                    <td className="py-2.5 text-right">{parseFloat(c.ctr).toFixed(2)}</td>
                                                    <td className="py-2.5 text-right">${parseFloat(c.cpc).toFixed(2)}</td>
                                                    <td className="py-2.5 text-right text-purple-400">{c.conversions ?? '–'}</td>
                                                    <td className="py-2.5 text-right">
                                                        <button onClick={()=>handleRemoveCampaign(c.campaign_id)}
                                                            className="text-gray-600 hover:text-red-400 transition">
                                                            <Icons.Trash size={15}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {optimizationResult && (
                                        <div className="mt-5">
                                            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Optimization Results</p>
                                            <table className="w-full text-left text-sm">
                                                <thead>
                                                    <tr className="text-gray-400 border-b border-gray-700">
                                                        <th className="pb-2">Campaign</th>
                                                        <th className="pb-2 text-right">Old Budget</th>
                                                        <th className="pb-2 text-right">New Budget</th>
                                                        <th className="pb-2 text-right">Proj. Conv.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {optimizationResult.campaigns.map((c,i)=>(
                                                        <tr key={i} className="border-b border-gray-800/50">
                                                            <td className="py-2 text-blue-400">{c.campaign_id}</td>
                                                            <td className="py-2 text-right text-gray-400">${Number(c.original_budget).toFixed(0)}</td>
                                                            <td className="py-2 text-right font-bold text-emerald-400">${Number(c.optimized_budget).toFixed(0)}</td>
                                                            <td className="py-2 text-right text-purple-400">~{Number(c.predicted_conversions).toFixed(0)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )
                        )}

                        {/* Charts Tab */}
                        {tab === 'charts' && (
                            campaigns.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-gray-500 gap-3">
                                    <Icons.BarChart size={32}/>
                                    <p className="text-sm">No data to display. Import campaigns first.</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs text-gray-500 mb-3">
                                        {optimizationResult ? 'Showing: Budget vs Optimized Budget vs Predicted Conversions' : 'Showing: Budget vs Ad Spend — Run optimizer to see predictions.'}
                                    </p>
                                    <CampaignBarChart campaigns={campaigns} optimizationResult={optimizationResult}/>
                                </div>
                            )
                        )}

                    </div>
                </div>
            </main>

            {/* Modals */}
            {showSettings    && <SettingsModal   apiBase={apiBase} onSave={setApiBase} onClose={()=>setShowSettings(false)}/>}
            {showAddCampaign && <AddCampaignModal onAdd={handleAddCampaign}           onClose={()=>setShowAddCampaign(false)}/>}
            {showPredict     && <PredictModal     apiBase={apiBase} toast={toast}      onClose={()=>setShowPredict(false)}/>}

            <ToastContainer toasts={toasts}/>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
