import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Globe,
  Copy,
  Download,
  Sparkles,
  Link as LinkIcon,
  Check,
  Zap,
  QrCode
} from 'lucide-react';

const SOURCES = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500', gradient: 'from-purple-500 to-pink-500', bg: 'bg-pink-500/20' },
  { id: 'tiktok', name: 'TikTok', icon: Zap, color: 'text-cyan-400', gradient: 'from-cyan-400 to-black', bg: 'bg-cyan-500/20' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-sky-400', gradient: 'from-sky-400 to-blue-500', bg: 'bg-sky-500/20' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500', gradient: 'from-red-500 to-orange-500', bg: 'bg-red-500/20' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', gradient: 'from-blue-600 to-cyan-600', bg: 'bg-blue-500/20' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500', gradient: 'from-blue-600 to-indigo-600', bg: 'bg-blue-500/20' },
  { id: 'other', name: 'Other', icon: Globe, color: 'text-emerald-400', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-500/20' },
];

const App = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [selectedSource, setSelectedSource] = useState(SOURCES[0]);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Live preview update
  useEffect(() => {
    if (!targetUrl) {
      setGeneratedLink('');
      return;
    }
    // Simulate short link generation logic for preview
    const baseUrl = 'link.magic';
    const cleanSource = selectedSource.id;
    const cleanCampaign = campaignName.trim().replace(/\s+/g, '-').toLowerCase() || 'general';
    const mockShortId = Math.random().toString(36).substring(2, 7);
    
    // In a real app, we might wait for the button press, but for "Live Preview" feel, we show what it *would* be
    // or we can construct a UTM url.
    // Let's make it look like a final shortened URL for the card.
    setGeneratedLink(`${baseUrl}/${cleanSource}/${cleanCampaign}`);
  }, [targetUrl, campaignName, selectedSource]);

  const handleGenerate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleCopy = () => {
    if (!generatedLink && !targetUrl) return;
    navigator.clipboard.writeText(generatedLink || 'https://link.magic/preview');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const currentSource = selectedSource;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 z-10">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <header className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles size={16} className="text-white" />
              </div>
              <h1 className="text-xl font-medium text-white tracking-tight">MagicLink Gen</h1>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Create beautiful, trackable short links for your campaigns in seconds.
            </p>
          </header>

          <div className="space-y-6">
            {/* Source Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Source</label>
              <div className="flex flex-wrap gap-2">
                {SOURCES.map((source) => {
                  const isActive = selectedSource.id === source.id;
                  const Icon = source.icon;
                  return (
                    <button
                      key={source.id}
                      onClick={() => setSelectedSource(source)}
                      className={`
                        group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border
                        ${isActive 
                          ? 'bg-slate-800 border-slate-600 text-white shadow-lg shadow-black/20' 
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-slate-700'}
                      `}
                    >
                      <Icon size={14} className={`transition-colors ${isActive ? source.color : 'text-slate-500 group-hover:text-slate-400'}`} />
                      <span>{source.name}</span>
                      {isActive && (
                        <span className={`absolute inset-0 rounded-lg bg-gradient-to-r ${source.gradient} opacity-10`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon size={14} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="https://your-website.com/product"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all hover:border-white/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Campaign Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Zap size={14} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Summer Sale 2024"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all hover:border-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleGenerate}
              className={`
                w-full relative overflow-hidden group bg-white text-black font-medium py-3.5 rounded-xl transition-all duration-200
                hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]
                ${isAnimating ? 'scale-[0.99] opacity-90' : 'hover:scale-[1.01]'}
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAnimating ? 'Generating...' : 'Generate Magic Link'}
                {!isAnimating && <Sparkles size={16} className="text-indigo-600" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CARD */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative w-full aspect-[1.58/1] perspective-1000 group">
             {/* Card Glow Background */}
             <div 
               className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br ${currentSource.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30`}
             />

             {/* The Card */}
             <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111114]">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 bg-slate-900">
                  <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${currentSource.gradient} opacity-20 blur-[100px] rounded-full mix-blend-screen transform translate-x-1/3 -translate-y-1/3 transition-all duration-700`} />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[80px] rounded-full mix-blend-screen transform -translate-x-1/3 translate-y-1/3" />
                </div>
                
                {/* Card Content Grid */}
                <div className="relative h-full z-10 grid grid-cols-12 p-8">
                  
                  {/* Left Side: QR & Branding */}
                  <div className="col-span-5 flex flex-col justify-between">
                     <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${currentSource.bg} border border-white/5 flex items-center justify-center`}>
                           <currentSource.icon size={16} className={currentSource.color} />
                        </div>
                        <span className="text-sm font-medium text-slate-300">{currentSource.name}</span>
                     </div>

                     <div className="space-y-2">
                       <div className="w-32 h-32 bg-white rounded-xl p-2 shadow-xl shadow-black/20">
                         {targetUrl ? (
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(targetUrl || 'https://google.com')}&color=000000&bgcolor=ffffff`}
                              alt="QR Code"
                              className="w-full h-full object-contain mix-blend-multiply opacity-90"
                            />
                         ) : (
                           <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
                              <QrCode className="text-slate-300" size={32} />
                           </div>
                         )}
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold pl-1">Scan to Visit</p>
                     </div>
                  </div>

                  {/* Right Side: Link Info */}
                  <div className="col-span-7 flex flex-col justify-between items-end text-right pl-4">
                     <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Campaign</div>
                        <div className="text-2xl font-semibold text-white tracking-tight break-all line-clamp-2">
                          {campaignName || <span className="text-slate-700">Untitled Campaign</span>}
                        </div>
                     </div>

                     <div className="w-full space-y-4">
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Short Link</div>
                          <div className="flex items-center justify-end gap-3 group/link">
                             <span className={`font-mono text-lg transition-colors ${targetUrl ? 'text-indigo-300' : 'text-slate-700'}`}>
                               {generatedLink || 'link.magic/waiting...'}
                             </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                           <button 
                             onClick={handleCopy}
                             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium text-slate-300 hover:text-white transition-all active:scale-95"
                           >
                              {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                              <span>{isCopied ? 'Copied' : 'Copy'}</span>
                           </button>
                           <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium text-slate-300 hover:text-white transition-all active:scale-95">
                              <Download size={14} />
                              <span>Save</span>
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-6 opacity-40">
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
               Live Preview
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
               Secure SSL
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
               Analytics Ready
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
