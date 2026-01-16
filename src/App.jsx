< !DOCTYPE html >
    <html lang="zh-TW">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cli AI 專案管理系統</title>
                    <!-- 外部資源：Tailwind CSS, Google Fonts, Lucide Icons, Locomotive Scroll -->
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Lexend:wght@100;200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=Noto+Sans+TC:wght@100;300;400;500;700&display=swap');

                            :root {
                                --font - display: 'Plus Jakarta Sans', sans-serif;
                            --font-ui: 'Lexend', 'Noto Sans TC', sans-serif;
                            --font-logo: 'Montserrat', sans-serif;
        }

                            body {
                                font - family: var(--font-ui);
                            background-color: #0a0c10;
                            color: #e2e8f0;
                            overflow: hidden;
        }

                            .font-display {font - family: var(--font-display); }
                            .font-logo {font - family: var(--font-logo); font-weight: 300; }

                            /* 自定義滾動條 */
                            .custom-scrollbar::-webkit-scrollbar {width: 4px; }
                            .custom-scrollbar::-webkit-scrollbar-track {background: transparent; }
                            .custom-scrollbar::-webkit-scrollbar-thumb {background: #1e293b; border-radius: 10px; }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {background: #334155; }

                            /* 彈窗動畫 */
                            @keyframes customFadeIn {from {opacity: 0; } to {opacity: 1; } }
                            @keyframes customZoomIn {from {opacity: 0; transform: scale(0.95); } to {opacity: 1; transform: scale(1); } }

                            .animate-custom-fade-in {animation: customFadeIn 0.3s ease-out forwards; }
                            .animate-custom-zoom-in {animation: customZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

                            /* Locomotive Scroll 必備樣式 */
                            html.has-scroll-smooth {overflow: hidden; }
                            .has-scroll-smooth body {overflow: hidden; }
                        </style>
                    </head>
                    <body>
                        <div id="root"></div>

                        <!-- 核心腳本載入 -->
                        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
                        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
                        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                        <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>
                        <!-- Lucide 圖示 (CDN 模式下需特別處理) -->
                        <script src="https://unpkg.com/lucide@latest"></script>

                        <script type="text/babel">
                            const {useState, useEffect, useRef} = React;

                            // 封裝 Lucide Icon 元件以便在 React CDN 環境使用
                            const Icon = ({name, size = 24, className = "", fill = "none"}) => {
            const iconRef = useRef(null);
            useEffect(() => {
                if (iconRef.current) {
                    const iconName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                            if (window.lucide.icons[iconName]) {
                        const svg = window.lucide.createIcons({
                                icons: {[iconName]: window.lucide.icons[iconName] },
                            attrs: {strokeWidth: 2, width: size, height: size, class: className, fill: fill }
                        });
                    }
                }
            }, [name, size, className, fill]);
                            return <i ref={iconRef} data-lucide={name} className={className}></i>;
        };

        const App = () => {
            const [view, setView] = useState('dashboard');
                            const [selectedProject, setSelectedProject] = useState(null);
                            const [projects, setProjects] = useState([
                            {id: 1, user: 'System Admin', projectName: '核心動畫引擎', type: 'Adobe Animate', date: '2024-05-20 14:30', params: {fps: 60, mode: 'Vector' } },
                            {id: 2, user: 'Designer_01', projectName: '登陸頁視覺', type: '視差卷軸', date: '2024-05-21 09:15', params: {layers: 8, scrollSpeed: 1.5 } },
                            {id: 3, user: 'Art_Lead', projectName: '專案編輯', type: 'Adobe Animate', date: '2024-05-21 16:45', params: {quality: 'Retina' } },
                            {id: 4, user: 'Dev_King', projectName: '深度感官導覽介面', type: '視差卷軸', date: '2024-05-22 10:20', params: {direction: 'vertical' } },
                            {id: 5, user: 'UI_Explorer', projectName: '向量粒子實驗', type: 'Adobe Animate', date: '2024-05-22 13:05', params: {particles: 500 } },
                            {id: 6, user: 'Motion_Pro', projectName: '沉浸式背景層', type: '視差卷軸', date: '2024-05-23 11:00', params: {depth: 'Ultra' } },
                            {id: 7, user: 'Studio_X', projectName: '遊戲化引導系統', type: 'Adobe Animate', date: '2024-05-23 15:30', params: {interactive: true } },
                            {id: 8, user: 'Lab_Member', projectName: '三維視覺導覽', type: '視差卷軸', date: '2024-05-24 09:45', params: {parallax: 2.4 } },
                            {id: 9, user: 'Brand_Team', projectName: '品牌動態標誌', type: 'Adobe Animate', date: '2024-05-24 14:20', params: {loop: 'infinite' } },
                            {id: 10, user: 'GIS_Specialist', projectName: '全球導覽地圖', type: '視差卷軸', date: '2024-05-25 10:10', params: {scale: 'Global' } },
                            {id: 11, user: 'Data_Viz', projectName: '數據可視化組件', type: 'Adobe Animate', date: '2024-05-25 16:00', params: {refresh: '1s' } },
                            {id: 12, user: 'FX_Artist', projectName: '運動模糊背景', type: '視差卷軸', date: '2024-05-26 08:30', params: {blurAmount: '12px' } }
                            ]);

                            const [formData, setFormData] = useState({user: '', projectName: '', type: 'Adobe Animate' });
                            const [chatMessages, setChatMessages] = useState([]);
                            const [chatInput, setChatInput] = useState('');
                            const [uploadedImages, setUploadedImages] = useState([]);
                            const [previewImage, setPreviewImage] = useState(null);
                            const [isJournalOpen, setIsJournalOpen] = useState(false);
                            const [expandedSection, setExpandedSection] = useState('notes');

                            const textareaRef = useRef(null);
                            const scrollInstance = useRef(null);

            // 初始化 Locomotive Scroll
            useEffect(() => {
                                setTimeout(() => {
                                    const scrollContainer = document.querySelector('[data-scroll-container]');
                                    if (scrollContainer) {
                                        scrollInstance.current = new LocomotiveScroll({
                                            el: scrollContainer,
                                            smooth: true,
                                            multiplier: 0.8,
                                            lerp: 0.05
                                        });
                                    }
                                }, 600);
                return () => { if (scrollInstance.current) scrollInstance.current.destroy(); };
            }, [view]);

            const handleSendMessage = (e) => {
                if (e) e.preventDefault();
                            const text = chatInput.trim();
                            if (!text) return;
                            setChatInput('');
                            if (textareaRef.current) textareaRef.current.value = '';
                setChatMessages(prev => [...prev, {role: 'user', content: text }]);
                setTimeout(() => {
                                setChatMessages(prev => [...prev, { role: 'ai', content: "指令分析完成。正在針對專案優化運算管線。" }]);
                }, 600);
            };

            const processFiles = (files) => {
                const validImages = Array.from(files).filter(f => f.type.startsWith('image/'));
                validImages.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                                setUploadedImages(prev => [
                                    ...prev,
                                    { id: Math.random(), name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', preview: e.target.result }
                                ]);
                    };
                            reader.readAsDataURL(file);
                });
            };

            const renderDashboard = () => (
                            <div className="flex h-screen animate-in fade-in duration-500 overflow-hidden">
                                <div className="w-[35%] border-r border-slate-800 bg-[#0d1117] p-10 flex flex-col shadow-2xl z-20 overflow-hidden">
                                    <div className="flex items-center gap-4 mb-6 shrink-0">
                                        <h1 className="text-5xl font-light tracking-tighter text-white font-logo">Cli AI</h1>
                                        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center space-y-10">
                                        <div className="space-y-3">
                                            <label className="text-xs text-slate-400 font-bold tracking-widest uppercase font-mono">使用者名稱</label>
                                            <input className="w-full bg-[#161b22] border border-slate-700 rounded-xl p-5 text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" placeholder="您的名稱..." value={formData.user} onChange={e => setFormData({ ...formData, user: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs text-slate-400 font-bold tracking-widest uppercase font-mono">專案名稱</label>
                                            <input className="w-full bg-[#161b22] border border-slate-700 rounded-xl p-5 text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" placeholder="專案標題..." value={formData.projectName} onChange={e => setFormData({ ...formData, projectName: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs text-slate-400 font-bold tracking-widest uppercase font-mono">渲染引擎類型</label>
                                            <select className="w-full bg-[#161b22] border border-slate-700 rounded-xl p-5 text-white outline-none appearance-none cursor-pointer" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                                <option>Adobe Animate</option>
                                                <option>視差卷軸</option>
                                            </select>
                                        </div>
                                        <button onClick={() => { setView('editor'); setSelectedProject({ ...formData, date: '2025.01.16' }); }} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg transition-all active:scale-95 flex items-center justify-center gap-3">
                                            <Icon name="zap" size={18} fill="currentColor" /> 建立專案
                                        </button>
                                    </div>
                                    <button onClick={() => setIsJournalOpen(true)} className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-slate-800/20 border border-slate-700/50 hover:bg-blue-500/10 transition-all text-left group">
                                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"><Icon name="book-open" size={20} /></div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-200 uppercase">開發者日誌</p>
                                            <p className="text-[11px] text-slate-500 uppercase font-mono">更新於2025.01.15</p>
                                        </div>
                                    </button>
                                </div>
                                <div className="flex-1 flex flex-col bg-[#0a0c10] overflow-hidden relative">
                                    <header className="h-16 border-b border-slate-800 px-10 flex items-center justify-between bg-[#0d1117]/80 backdrop-blur-xl shrink-0 z-10 font-mono">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div> DASHBOARD_LIVE
                                        </div>
                                        <div className="text-[9px] text-slate-600 bg-slate-800/30 px-4 py-1.5 rounded-full border border-slate-700/50 uppercase font-black">Secured Env</div>
                                    </header>
                                    <main data-scroll-container className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                                        <div data-scroll-section className="max-w-6xl mx-auto pb-32">
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20"><Icon name="layers" size={20} className="text-blue-500" /></div>
                                                <h2 className="text-2xl font-black text-white tracking-tight">專案資料庫</h2>
                                            </div>
                                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                                {projects.map(p => (
                                                    <div key={p.id} onClick={() => { setSelectedProject(p); setView('editor'); }} className="group bg-[#0d1117] border border-slate-800 p-8 rounded-2xl relative shadow-2xl transition-all cursor-pointer hover:border-blue-500/50">
                                                        <div className="flex justify-between items-start mb-5 font-mono">
                                                            <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border bg-purple-500/10 text-purple-400 border-purple-500/20">{p.type}</span>
                                                            <span className="text-[11px] text-slate-700 font-bold">{p.date}</span>
                                                        </div>
                                                        <h3 className="text-lg font-black text-white mb-2">{p.projectName}</h3>
                                                        <div className="text-[12px] text-slate-500 mb-8 flex items-center gap-2">
                                                            <Icon name="user" size={13} className="text-blue-500/50" />
                                                            <span className="text-slate-400 font-black tracking-wide">{p.user}</span>
                                                        </div>
                                                        <div className="p-5 rounded-2xl bg-black/40 border border-slate-800/50 font-mono text-[11px] flex justify-between items-center text-blue-400/80">
                                                            {JSON.stringify(p.params).replace(/[{}]/g, '').replace(/"/g, '')}
                                                            <Icon name="copy" size={16} className="text-slate-600" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </div>
                            );

            const renderEditor = () => (
                            <div className="flex h-screen animate-in slide-in-from-right duration-500 bg-[#0a0c10]">
                                <div className="flex-1 flex flex-col border-r border-slate-800 bg-[#0d1117] overflow-hidden">
                                    <header className="h-24 border-b border-slate-800 px-8 flex items-center justify-between bg-black/20 shrink-0 text-white shadow-2xl z-10">
                                        <div className="flex items-center gap-6">
                                            <button onClick={() => setView('dashboard')} className="p-2 text-slate-500 hover:text-white transition-all active:scale-90"><Icon name="arrow-left" size={24} /></button>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h2 className="text-2xl font-black tracking-tight">專案編輯</h2>
                                                    <div className="px-3 py-1 rounded-lg border bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] font-black uppercase font-mono">{selectedProject?.type}</div>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-bold opacity-60 font-mono uppercase tracking-tight flex items-center gap-3 mt-1">
                                                    <Icon name="user" size={12} className="text-blue-500/50" /> {selectedProject?.user} / <Icon name="calendar" size={12} className="text-blue-500/50" /> {selectedProject?.date}
                                                </p>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="p-10 pb-0 shrink-0 z-20">
                                        <div className="w-full h-48 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center bg-slate-900/30 hover:border-slate-700 cursor-pointer gap-5 transition-all" onClick={() => document.getElementById('fileInput').click()}>
                                            <input type="file" id="fileInput" multiple hidden onChange={(e) => processFiles(e.target.files)} />
                                            <div className="p-5 bg-slate-800 rounded-xl text-slate-500"><Icon name="upload-cloud" size={36} /></div>
                                            <div className="text-center">
                                                <h3 className="text-lg font-black text-white tracking-tight">圖片上傳</h3>
                                                <p className="text-sm text-slate-600 mt-2">點擊或拖移圖片至此</p>
                                            </div>
                                        </div>
                                    </div>
                                    <main className="flex-1 p-10 pt-8 overflow-y-auto custom-scrollbar text-slate-200">
                                        <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider font-mono flex items-center gap-4 mb-8">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>MANIFEST ({uploadedImages.length})
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                            {uploadedImages.map(img => (
                                                <div key={img.id} className="group bg-[#161b22] border border-slate-800 rounded-2xl p-2.5 relative shadow-2xl overflow-hidden cursor-pointer" onClick={() => setPreviewImage(img)}>
                                                    <div className="aspect-square bg-black rounded-xl overflow-hidden flex items-center justify-center">
                                                        <img src={img.preview} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Icon name="eye" size={28} className="text-white/80" /></div>
                                                    </div>
                                                    <div className="px-1 mt-3">
                                                        <p className="text-[12px] font-black text-slate-400 truncate uppercase font-mono">{img.name}</p>
                                                        <p className="text-[10px] font-medium text-slate-600 font-mono">{img.size}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </main>
                                    <footer className="p-10 pt-0 border-t border-slate-800/50 flex justify-center gap-10 pb-12 mt-4">
                                        <button className="flex-1 max-w-[280px] py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all text-[16px] flex items-center justify-center gap-3">
                                            <Icon name="external-link" size={20} /> Live Preview
                                        </button>
                                        <button className="flex-1 max-w-[280px] py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all text-[16px] flex items-center justify-center gap-3">
                                            <Icon name="download" size={20} /> Download Package
                                        </button>
                                    </footer>
                                </div>
                                <div className="flex-1 flex flex-col bg-[#0a0c10] h-full overflow-hidden">
                                    <header className="h-16 border-b border-slate-800 px-8 flex items-center gap-3 bg-[#0d1117]/30 text-white shadow-lg z-10">
                                        <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20"><Icon name="zap" size={22} className="text-blue-500" /></div>
                                        <div><p className="text-sm font-black tracking-tight">Assistant Engine</p><p className="text-[9px] text-green-500 font-black uppercase tracking-[0.2em] animate-pulse">Core Online</p></div>
                                    </header>
                                    <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                        {chatMessages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                                                <div className={`max-w-[85%] rounded-2xl p-6 text-sm leading-relaxed shadow-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#161b22] border border-slate-800 text-slate-300 rounded-bl-none'}`}>{msg.content}</div>
                                            </div>
                                        ))}
                                        <div ref={chatEndRef}></div>
                                    </div>
                                    <div className="p-8 bg-[#0d1117] border-t border-slate-800">
                                        <form onSubmit={handleSendMessage} className="relative">
                                            <textarea ref={textareaRef} rows="3" className="w-full bg-[#0a0c10] border border-slate-800 focus:border-blue-600 rounded-2xl p-6 pr-20 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700 resize-none shadow-inner" placeholder="傳送指令..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage(e)} />
                                            <button type="submit" className="absolute right-5 bottom-5 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-2xl transition-all active:scale-90"><Icon name="send" size={20} /></button>
                                        </form>
                                    </div>
                                </div>

                                {/* 預覽彈窗 */}
                                {previewImage && (
                                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-12">
                                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer animate-custom-fade-in" onClick={() => setPreviewImage(null)}></div>
                                        <div className="relative animate-custom-zoom-in">
                                            <button onClick={() => setPreviewImage(null)} className="absolute -top-10 -right-10 p-3 text-slate-400 hover:text-white transition-all active:scale-90 z-[130]"><Icon name="x" size={40} /></button>
                                            <div className="bg-[#0d1117] border border-slate-700 rounded-3xl p-8 shadow-[0_60px_250px_rgba(0,0,0,1)] flex flex-col items-center max-w-[85vw] max-h-[85vh]">
                                                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black/40 aspect-video w-full max-w-4xl">
                                                    <img src={previewImage.preview} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="mt-8 flex items-center gap-10 text-white w-full px-2">
                                                    <div className="flex items-center gap-4 mr-auto"><Icon name="sparkles" size={20} className="text-blue-400" /><span className="text-base font-normal">{previewImage.name}</span></div>
                                                    <div className="text-[11px] text-slate-500 font-black uppercase font-mono tracking-[0.2em]">{previewImage.size} | CORE_PREVIEW</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 開發者日誌彈窗 */}
                                {isJournalOpen && (
                                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer animate-custom-fade-in" onClick={() => setIsJournalOpen(false)}></div>
                                        <div className="relative animate-custom-zoom-in">
                                            <button onClick={() => setIsJournalOpen(false)} className="absolute -top-10 -right-10 p-3 text-slate-400 hover:text-white transition-all active:scale-90 z-[130]"><Icon name="x" size={40} /></button>
                                            <div className="w-full max-w-2xl bg-[#0d1117] border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[65vh] overflow-hidden text-white font-bold">
                                                <header className="px-10 py-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/20 font-display">
                                                    <div className="flex items-center gap-4 font-medium text-[15px] opacity-90 text-blue-400"><Icon name="book-open" size={22} /> 開發者日誌</div>
                                                </header>
                                                <div className="flex-1 overflow-y-auto p-10 space-y-4 custom-scrollbar">
                                                    <div className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden shadow-2xl">
                                                        <button onClick={() => setExpandedSection(expandedSection === 'notes' ? null : 'notes')} className="w-full px-8 py-5 flex items-center justify-between font-normal text-slate-200">
                                                            <div className="flex items-center gap-4"><Icon name="info" size={20} className="text-slate-500" />使用注意事項</div>
                                                            <Icon name={expandedSection === 'notes' ? "chevron-up" : "chevron-down"} size={22} />
                                                        </button>
                                                        {expandedSection === 'notes' && <div className="px-8 pb-6 text-[13px] text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4 font-normal">彈窗關閉按鈕已統一拉出方框外側，優化大圖預覽時的操作體驗。</div>}
                                                    </div>
                                                    <div className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden shadow-2xl">
                                                        <button onClick={() => setExpandedSection(expandedSection === 'update' ? null : 'update')} className="w-full px-8 py-5 flex items-center justify-between font-normal text-slate-200">
                                                            <div className="flex items-center gap-4"><Icon name="history" size={20} className="text-slate-500" />開發者更新 (V1.5.6)</div>
                                                            <Icon name={expandedSection === 'update' ? "chevron-up" : "chevron-down"} size={22} />
                                                        </button>
                                                        {expandedSection === 'update' && <div className="px-8 pb-6 text-[13px] text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4 font-normal">優化 Logo 視覺比例與字距；強化對話框同步清空邏輯。</div>}
                                                    </div>
                                                </div>
                                                <footer className="px-12 py-6 bg-[#161b22] flex justify-center border-t border-slate-800 text-[11px] text-slate-700 font-mono italic uppercase tracking-widest">更新於2025.01.15</footer>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            );

                            return <div className="w-full h-screen selection:bg-blue-500/30">{view === 'dashboard' ? renderDashboard() : renderEditor()}</div>;
        };

                            const root = ReactDOM.createRoot(document.getElementById('root'));
                            root.render(<App />);
                        </script>
                    </body>
                </html>
