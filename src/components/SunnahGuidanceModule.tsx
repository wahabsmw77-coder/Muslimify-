import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  Flame, 
  ArrowRight, 
  Award, 
  Compass, 
  Check, 
  Info, 
  BookMarked,
  Copy,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Globe,
  Grid,
  TrendingUp,
  Activity
} from "lucide-react";
import { 
  HUNDRED_SUNNAHS, 
  COMBINED_DUAS, 
  FIQH_COMPARATIVE_DATA,
  SunnahHabit,
  DuaItem,
  FiqhDifference
} from "../data/propheticData";

interface Props {
  languageCode: string;
}

export default function SunnahGuidanceModule({ languageCode }: Props) {
  // Primary Tabs
  type Subtab = "sunnah" | "dua" | "namaz_firkas" | "darood";
  const [activeTab, setActiveTab] = useState<Subtab>("sunnah");

  // Sunnah Habit States
  const [selectedSunnahCategory, setSelectedSunnahCategory] = useState<string>("All");
  const [sunnahSearch, setSunnahSearch] = useState<string>("");
  const [completedSunnahs, setCompletedSunnahs] = useState<string[]>([]);

  // Dua Register States
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string>("All");
  const [duaSearch, setDuaSearch] = useState<string>("");
  const [expandedDua, setExpandedDua] = useState<string | null>(null);
  const [duaTasbihs, setDuaTasbihs] = useState<Record<string, number>>({});
  const [showCopiedId, setShowCopiedId] = useState<string | null>(null);

  // Namaz tamam firka ki States
  const [selectedMaslak, setSelectedMaslak] = useState<string>("Hanafi School");
  const [showComparativeGrid, setShowComparativeGrid] = useState<boolean>(false);

  // Darood Desk States
  const [daroodCount, setDaroodCount] = useState<number>(0);
  const [activeDaroodTheme, setActiveDaroodTheme] = useState<string>("ibrahim");

  // Safe Confirmation States for tracking reset buttons in an iFrame
  const [confirmResetDailyTracker, setConfirmResetDailyTracker] = useState<boolean>(false);
  const [confirmResetDarood, setConfirmResetDarood] = useState<boolean>(false);

  // Audio simulation tone (Web Audio API) for counting
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const playClickSound = (freq = 850) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      const audioCtx = audioCtxRef.current;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // safe fallback
    }
  };

  // Load completed sunnahs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("islamify_completed_sunnahs_new");
    if (saved) {
      try {
        setCompletedSunnahs(JSON.parse(saved));
      } catch (err) {}
    }
    
    const savedDuaCount = localStorage.getItem("islamify_dua_tasbihs");
    if (savedDuaCount) {
      try {
        setDuaTasbihs(JSON.parse(savedDuaCount));
      } catch (err) {}
    }

    const savedDarood = localStorage.getItem("islamify_darood_count");
    if (savedDarood) {
      setDaroodCount(Number(savedDarood) || 0);
    }
  }, []);

  const toggleSunnah = (id: string) => {
    playClickSound(950);
    let updated: string[];
    if (completedSunnahs.includes(id)) {
      updated = completedSunnahs.filter(item => item !== id);
    } else {
      updated = [...completedSunnahs, id];
    }
    setCompletedSunnahs(updated);
    localStorage.setItem("islamify_completed_sunnahs_new", JSON.stringify(updated));
  };

  const handleDuaTasbihClick = (duaId: string) => {
    playClickSound(760);
    const updatedCount = (duaTasbihs[duaId] || 0) + 1;
    const newTasbihs = { ...duaTasbihs, [duaId]: updatedCount };
    setDuaTasbihs(newTasbihs);
    localStorage.setItem("islamify_dua_tasbihs", JSON.stringify(newTasbihs));
  };

  const resetDuaTasbih = (duaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(400);
    const newTasbihs = { ...duaTasbihs, [duaId]: 0 };
    setDuaTasbihs(newTasbihs);
    localStorage.setItem("islamify_dua_tasbihs", JSON.stringify(newTasbihs));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopiedId(id);
    playClickSound(1100);
    setTimeout(() => {
      setShowCopiedId(null);
    }, 2000);
  };

  // Filter 100 Sunnahs
  const categoriesSunnah = ["All", "Morning/Evening", "Sleeping", "Eating/Drinking", "Social/Speech", "Hygiene/Dress", "Masjid/Salah", "Character/Home"];
  const filteredSunnahs = HUNDRED_SUNNAHS.filter((sunnah) => {
    const matchesCategory = selectedSunnahCategory === "All" || sunnah.category === selectedSunnahCategory;
    const matchesSearch = sunnah.title.toLowerCase().includes(sunnahSearch.toLowerCase()) || 
                          sunnah.urduTitle.includes(sunnahSearch) ||
                          sunnah.desc.toLowerCase().includes(sunnahSearch.toLowerCase()) ||
                          sunnah.reference.toLowerCase().includes(sunnahSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter 50 Duas
  const categoriesDua = ["All", "Morning & Evening", "Forgiveness & Mercy", "Protection & Safety", "Knowledge & Success", "Daily Routine", "Salah & Remembrance"];
  const filteredDuas = COMBINED_DUAS.filter((dua) => {
    const matchesCategory = selectedDuaCategory === "All" || dua.category === selectedDuaCategory;
    const matchesSearch = dua.title.toLowerCase().includes(duaSearch.toLowerCase()) || 
                          dua.urduTitle.includes(duaSearch) ||
                          dua.arabic.includes(duaSearch) ||
                          dua.english.toLowerCase().includes(duaSearch.toLowerCase()) ||
                          dua.transliteration.toLowerCase().includes(duaSearch.toLowerCase()) ||
                          dua.urdu.includes(duaSearch);
    return matchesCategory && matchesSearch;
  });

  // Calculate Sunnah Completion Stats
  const completionPercentage = Math.round((completedSunnahs.length / HUNDRED_SUNNAHS.length) * 100);

  return (
    <div id="prophetic-suite-root" className="space-y-6 animate-fade-in text-slate-800">
      
      {/* Dynamic Header Badge / Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border-b-4 border-amber-500 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_0px)] bg-[size:16px_16px] pointer-events-none"></div>
        
        <div className="space-y-4 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 rounded-full font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Islamic Hub Pro Suite</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Prophetic Studio & Salah Comparator <span className="block text-amber-400 text-lg sm:text-2xl mt-1 font-amiri font-normal">نماز تمام مکاتبِ فکر، 50 مسنون دعائیں اور 100 سنتیں</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Discover a comprehensive archive strictly designed according to authentic criteria. Compare Namaz postures, recitations, and references across all Fiqhs side-by-side. Complete the 100 daily Sunnahs tracker, memorize 50 core Duas with native Tasbih counters, and practice peace with spiritual Durood recitations.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-300">100 Sunnahs Tracked</div>
              <div className="text-xl font-bold text-amber-300">{completedSunnahs.length} / 100 <span className="text-xs text-slate-300">({completionPercentage}%)</span></div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-300">50 Authentic Duas</div>
              <div className="text-xl font-bold text-teal-300">50 Complete</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-300 font-amiri font-bold">تمام مکاتبِ فکر</div>
              <div className="text-xl font-bold text-emerald-300">5 Major Fiqhs</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-300">Total Durood Recitation</div>
              <div className="text-xl font-bold text-rose-300">{daroodCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Sub-tab Controls */}
      <div className="flex flex-wrap items-center justify-start gap-2 bg-slate-900/5 p-2 rounded-2xl border border-slate-900/10 shadow-inner">
        <button
          onClick={() => { playClickSound(800); setActiveTab("sunnah"); }}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "sunnah"
              ? "bg-emerald-800 text-white shadow-md transform -translate-y-0.5"
              : "text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-900"
          }`}
        >
          <Compass className="w-4 h-4 text-amber-500" />
          <span>100 Sunnats (سنتیں)</span>
        </button>

        <button
          onClick={() => { playClickSound(820); setActiveTab("dua"); }}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "dua"
              ? "bg-emerald-800 text-white shadow-md transform -translate-y-0.5"
              : "text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-900"
          }`}
        >
          <Award className="w-4 h-4 text-emerald-500" />
          <span>50 Duas (دعائیں)</span>
        </button>

        <button
          onClick={() => { playClickSound(840); setActiveTab("namaz_firkas"); }}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "namaz_firkas"
              ? "bg-emerald-800 text-white shadow-md transform -translate-y-0.5"
              : "text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-950"
          }`}
        >
          <BookMarked className="w-4 h-4 text-amber-500" />
          <span>تمام فرقوں کی نماز</span>
        </button>

        <button
          onClick={() => { playClickSound(860); setActiveTab("darood"); }}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "darood"
              ? "bg-emerald-800 text-white shadow-md transform -translate-y-0.5"
              : "text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-900"
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
          <span>Darood Desk (درود)</span>
        </button>
      </div>

      {/* ============================================================================
          TAB 1: 100 SUNNAH HABITS AND PROGRESS CHECKS
          ============================================================================ */}
      {activeTab === "sunnah" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              100 Prophetic Sunnah Deeds Tracker (100 مسنون سنتیں)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Incorporate elegant Sunnahs into your daily lifestyle. Check them off dynamically as you integrate them today to build high-vibrancy spiritual routines. Your data is stored locally.
            </p>

            {/* Completion Status Bar */}
            <div className="mt-5 p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">Your Current Progression Rate</span>
                <p className="text-sm font-semibold text-slate-700">
                  You successfully integrated <span className="text-emerald-800 font-extrabold font-mono">{completedSunnahs.length} out of 100</span> Sunnah habits today!
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-700 h-full transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-800">{completionPercentage}%</span>
              </div>

              {completedSunnahs.length > 0 && (
                <div className="flex items-center gap-2">
                  {confirmResetDailyTracker ? (
                    <>
                      <button
                        onClick={() => {
                          playClickSound(400);
                          setCompletedSunnahs([]);
                          localStorage.setItem("islamify_completed_sunnahs_new", JSON.stringify([]));
                          setConfirmResetDailyTracker(false);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                      >
                        Confirm Reset
                      </button>
                      <button
                        onClick={() => {
                          playClickSound(500);
                          setConfirmResetDailyTracker(false);
                        }}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        playClickSound(300);
                        setConfirmResetDailyTracker(true);
                      }}
                      className="px-3 py-1 bg-white hover:bg-rose-50 border border-red-200 hover:border-red-300 text-red-600 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Reset Daily Tracker
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Search and Category Filters */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search 100 Sunnahs by keyword, reference, title or Urdu..."
                    value={sunnahSearch}
                    onChange={(e) => setSunnahSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                  {sunnahSearch && (
                    <button 
                      onClick={() => setSunnahSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Categorization Quick Pills */}
              <div className="flex flex-wrap gap-1.5 pb-1 max-h-24 overflow-y-auto custom-scrollbar">
                {categoriesSunnah.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { playClickSound(900); setSelectedSunnahCategory(cat); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSunnahCategory === cat 
                        ? "bg-slate-900 text-white shadow" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout of Sunnahs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSunnahs.length > 0 ? (
              filteredSunnahs.map((sunnah) => {
                const isSelected = completedSunnahs.includes(sunnah.id);
                return (
                  <div 
                    key={sunnah.id}
                    onClick={() => toggleSunnah(sunnah.id)}
                    className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md select-none group relative overflow-hidden ${
                      isSelected 
                        ? "border-emerald-500 bg-emerald-50/25 ring-1 ring-emerald-500/30" 
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    {/* Visual checked indicator */}
                    <div className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-emerald-600 border-emerald-600 text-white" 
                          : "border-slate-300 group-hover:border-emerald-400"
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                      </div>
                    </div>

                    <div className="space-y-2.5 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                          {sunnah.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">#{sunnah.id}</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                        {sunnah.title}
                      </h4>

                      <div className="text-right py-1">
                        <span className="text-emerald-800 text-lg font-amiri font-bold font-normal block tracking-normal leading-normal" dir="rtl">
                          {sunnah.urduTitle}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sunnah.desc}
                      </p>

                      <p className="text-xs text-right text-slate-500 font-medium font-amiri italic block leading-relaxed" dir="rtl">
                        {sunnah.urduDesc}
                      </p>

                      <div className="pt-2 border-t border-dashed border-slate-100 flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                        <span>Authentic Proof:</span>
                        <span className="bg-emerald-50 text-emerald-950 px-2 py-0.5 rounded-md font-mono">{sunnah.reference}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
                <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-spin duration-[8s]" />
                <h4 className="text-base font-bold text-slate-700">No Sunnahs Found</h4>
                <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or selecting another category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================================
          TAB 2: 50 DUAS MASTER REGISTRY & TASBIH COUNTERS
          ============================================================================ */}
      {activeTab === "dua" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              50 Authentic Musnoon Duas Repository (50 مسنون دعائیں)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Unlock a complete list of 50 noble prayers compiled from Bukhari, Muslim, and Hadith books. Search seamlessly in English, Arabic, or Urdu, and tap each card to use the specific built-in Tasbih counter.
            </p>

            {/* Search and Category Filters */}
            <div className="mt-5 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search 50 Duas by keyword, Arabic, translation or category..."
                    value={duaSearch}
                    onChange={(e) => setDuaSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50"
                  />
                  {duaSearch && (
                    <button 
                      onClick={() => setDuaSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Categorization Quick Pills */}
              <div className="flex flex-wrap gap-1.5 pb-1 max-h-24 overflow-y-auto custom-scrollbar">
                {categoriesDua.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { playClickSound(900); setSelectedDuaCategory(cat); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedDuaCategory === cat 
                        ? "bg-teal-900 text-white shadow" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout of Duas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua) => {
                const isExpanded = expandedDua === dua.id;
                const counterValue = duaTasbihs[dua.id] || 0;
                return (
                  <div 
                    key={dua.id}
                    id={`dua-card-${dua.id}`}
                    onClick={() => {
                      playClickSound(910);
                      setExpandedDua(isExpanded ? null : dua.id);
                    }}
                    className={`bg-white rounded-2xl border transition-all cursor-pointer p-5 relative overflow-hidden flex flex-col justify-between ${
                      isExpanded 
                        ? "border-teal-500 ring-1 ring-teal-500/20 shadow-md transform scale-[1.01]" 
                        : "border-slate-200 hover:border-teal-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Meta Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-teal-50 text-teal-800 rounded uppercase tracking-wider">
                            {dua.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-bold">#{dua.id}</span>
                        </div>

                        {/* Quick Counter Badge */}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Recitals:</span>
                          <span className="px-2 py-0.5 bg-slate-900 text-amber-400 font-mono font-extrabold text-xs rounded-lg">
                            {counterValue}
                          </span>
                        </div>
                      </div>

                      {/* Titles */}
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {dua.title}
                        </h4>
                        <span className="text-right text-teal-800 font-amiri font-bold text-sm block tracking-wide" dir="rtl">
                          {dua.urduTitle}
                        </span>
                      </div>

                      {/* Pristine Arabic Text Component */}
                      <div className="p-4 bg-teal-50/40 rounded-xl border border-teal-100/50 my-2">
                        <p className="text-right text-base sm:text-xl text-slate-900 font-amiri font-bold leading-loose select-all" dir="rtl">
                          {dua.arabic}
                        </p>
                      </div>

                      {/* Detailed translation panels only shown on expanded states */}
                      {isExpanded ? (
                        <div className="space-y-3 pt-2 text-xs sm:text-sm animate-fade-in border-t border-slate-100">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">English Transliteration</span>
                            <p className="font-mono text-slate-600 leading-relaxed italic">{dua.transliteration}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">English Meaning</span>
                            <p className="text-slate-700 leading-relaxed font-semibold">{dua.english}</p>
                          </div>

                          <div className="space-y-1 text-right">
                            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">اردو ترجمہ</span>
                            <p className="text-slate-800 leading-loose font-amiri font-bold text-base" dir="rtl">{dua.urdu}</p>
                          </div>

                          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">Virtue / Significance:</span>
                            <p className="text-slate-700 font-medium leading-relaxed">{dua.virtue}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 text-center italic">Tap to expand and read full meanings, virtues & references</p>
                      )}
                    </div>

                    {/* Bottom Utility Controls */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex gap-2 text-[10px] text-slate-400 font-mono">
                        <span>Hadith:</span>
                        <span className="font-bold text-slate-600">{dua.source}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(`${dua.arabic}\n\n${dua.english}\n\n${dua.urdu}`, dua.id);
                          }}
                          className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 font-bold text-xs flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{showCopiedId === dua.id ? "Copied!" : "Copy"}</span>
                        </button>

                        {/* Interactive Digital Tasbih Ring */}
                        <div className="flex items-center bg-teal-800 text-white rounded-lg overflow-hidden border border-teal-700">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuaTasbihClick(dua.id);
                            }}
                            className="px-2.5 py-1.5 text-xs font-bold hover:bg-teal-900 active:scale-95 transition-all text-amber-300 uppercase tracking-wider"
                          >
                            +1 Tasbih
                          </button>
                          {counterValue > 0 && (
                            <button
                              onClick={(e) => resetDuaTasbih(dua.id, e)}
                              className="px-2 py-1.5 text-xs text-white bg-slate-800 hover:bg-slate-900 cursor-pointer border-l border-teal-700"
                              title="Reset counter"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-700">No Duas Found</h4>
                <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or selecting another category pill.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================================
          TAB 3: NAMAZ OF ALL SECS / FIRKAS COMPARATIVE
          ============================================================================ */}
      {activeTab === "namaz_firkas" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display flex items-center gap-1.5">
              <BookMarked className="w-5 h-5 text-amber-500" />
              Namaz According to All Sects & Fiqhs (نماز تمام مکاتبِ فکر کی)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Explore the beautiful and authentic diversity of prayer postures and recitations described by major Islamic legal traditions. We present Hanafi, Shafi&apos;i, Maliki, Hanbali, and Jafari (Shia) methodologies with maximum academic objectivity, showing unity through faithful practice.
            </p>

            {/* View Mode Select Buttons */}
            <div className="mt-5 flex items-center gap-2 border-t pt-4">
              <button
                onClick={() => { playClickSound(800); setShowComparativeGrid(false); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all ${
                  !showComparativeGrid
                    ? "bg-slate-900 text-white shadow"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Learn By Individual Fiqh (مسلک کے مطابق)</span>
              </button>

              <button
                onClick={() => { playClickSound(810); setShowComparativeGrid(true); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all ${
                  showComparativeGrid
                    ? "bg-slate-900 text-white shadow"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                <Grid className="w-4 h-4 text-emerald-400" />
                <span>Side-by-Side Comparison Grid (موازنہ بورڈ)</span>
              </button>
            </div>
          </div>

          {/* VIEW A: INDIVIDUAL FIQH VIEWER */}
          {!showComparativeGrid ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Maslak Selector Sidebar */}
              <div className="lg:col-span-1 space-y-2 bg-white p-4 rounded-3xl border border-slate-200">
                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Select Primary School of Thought:</span>
                {FIQH_COMPARATIVE_DATA.map((fiqh) => (
                  <button
                    key={fiqh.maslak}
                    onClick={() => { playClickSound(810); setSelectedMaslak(fiqh.maslak); }}
                    className={`w-full p-3 rounded-xl border text-left flex flex-col justify-start transition-all cursor-pointer ${
                      selectedMaslak === fiqh.maslak
                        ? "bg-amber-500/10 border-amber-500 text-slate-900 ring-1 ring-amber-500/20"
                        : "border-slate-100 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-extrabold">{fiqh.maslak}</span>
                    <span className="text-xs text-right text-amber-800 font-amiri font-bold ml-auto mt-0.5" dir="rtl">{fiqh.arabicName}</span>
                  </button>
                ))}

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-500 leading-relaxed font-semibold">
                  <span className="font-extrabold text-slate-700 block mb-1">💡 Scholar Consensus</span>
                  All four Sunni schools of thought and the Ja&apos;fari Shia school have authentic texts tracing their practices to noble companions and Prophet Muhammad (SAW). Divergences reflect legal derivation preferences.
                </div>
              </div>

              {/* Fiqh Interactive Details Board */}
              <div className="lg:col-span-3">
                {FIQH_COMPARATIVE_DATA.filter(f => f.maslak === selectedMaslak).map((fiqh) => (
                  <div key={fiqh.maslak} className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-6 animate-fade-in shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-4 border-b">
                      <div>
                        <span className="px-2.5 py-0.5 bg-slate-900 text-amber-400 font-mono text-[10px] uppercase tracking-wider rounded font-extrabold">Selected Fiqh Blueprint</span>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">{fiqh.maslak}</h3>
                        <p className="text-xs text-slate-500 italic mt-0.5 font-medium">Authentized Scholarly Traditons</p>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="block text-2xl font-bold text-amber-900 font-amiri tracking-normal py-1" dir="rtl">{fiqh.arabicName}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold font-mono text-[10px] rounded uppercase">Verified Data</span>
                      </div>
                    </div>

                    {/* Detailed Postural Breakdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* 1. Hand Placement Fold */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">1. Qiyam Hand Placement (ہاتھ باندھنا)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.handPlacement}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.handPlacementUrdu}</p>
                      </div>

                      {/* 2. Ameen Sayings */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">2. Ameen Pronouncement (آمین کی آواز)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.ameenAzaan}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.ameenAzaanUrdu}</p>
                      </div>

                      {/* 3. Rafa'ul Yadain */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">3. Raf-al-Yadain / Raising Hands (رفع الیدین)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.rafalYadain}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.rafalYadainUrdu}</p>
                      </div>

                      {/* 4. Reading Behind Imam */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">4. Quran Memorization Order (مقتدی کا قرات کرنا)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.recitationOrder}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.recitationOrderUrdu}</p>
                      </div>

                      {/* 5. Finger Tashahhud */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">5. Tashahhud Finger Point (اشارہ تشہد)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.tashahhudFinger}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.tashahhudFingerUrdu}</p>
                      </div>

                      {/* 6. Sujud Process */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">6. Sujud Posture (سجدہ کا طریقہ اورTurbah)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.sujudPosture}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.sujudPostureUrdu}</p>
                      </div>

                      {/* 7. Ending Taslim */}
                      <div className="p-4 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5 shadow-inner">
                        <span className="text-xs font-bold text-slate-900 block border-b pb-1 font-mono uppercase tracking-wide text-amber-800">7. Taslim Conclusion / Ending (سلام پھیرنا)</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{fiqh.taslimEnding}</p>
                        <p className="text-xs text-right font-amiri font-bold text-slate-800 block pt-1 leading-relaxed" dir="rtl">{fiqh.taslimEndingUrdu}</p>
                      </div>

                      {/* 8. Scholar Context */}
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
                        <span className="text-xs font-bold text-amber-950 block border-b pb-1 font-mono uppercase tracking-wide">8. Scholarly Origin & Line of Transmissions</span>
                        <p className="text-xs text-slate-800 leading-relaxed font-semibold italic">{fiqh.scholarlyNote}</p>
                        <p className="text-xs text-right font-amiri font-bold text-amber-900 block pt-1 leading-relaxed" dir="rtl">{fiqh.scholarlyNoteUrdu}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* VIEW B: SIDE-BY-SIDE COMPARATIVE GRID */
            <div className="bg-white rounded-3xl border border-amber-200 p-4 sm:p-6 overflow-x-auto shadow-md">
              <div className="pb-4 mb-4 border-b">
                <h4 className="text-base font-bold text-slate-900 font-display">Side-by-Side Comparison: Major Fiqh Schools of Thought (موازنہ بورڈ)</h4>
                <p className="text-xs text-slate-500">Scroll horizontally on mobile devices to compare rules consecutively.</p>
              </div>

              <table className="w-full text-left border-collapse text-xs min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-900 text-amber-300 text-[10px] uppercase font-bold tracking-wider">
                    <th className="p-3 border border-slate-700">Praying Aspect</th>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <th key={f.maslak} className="p-3 border border-slate-700 text-center">
                        <span className="block">{f.maslak}</span>
                        <span className="block font-amiri font-normal lowercase md:uppercase" dir="rtl">{f.arabicName}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {/* Aspect 1 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Qiyam Hand Fold / Position
                      <span className="block text-[10px] font-normal italic">ہاتھ باندھنے کا طریقہ</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-white leading-normal">
                        {f.handPlacement}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.handPlacementUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 2 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Ameen Reading Loud/Silent
                      <span className="block text-[10px] font-normal italic">آمین بلند پڑھنا یا آہستہ</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-slate-50/40 leading-normal">
                        {f.ameenAzaan}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.ameenAzaanUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 3 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Raf-al-Yadain (Rising hands)
                      <span className="block text-[10px] font-normal italic">رفع الیدین کرنا</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-white leading-normal">
                        {f.rafalYadain}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.rafalYadainUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 4 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Recitation Behind Imam
                      <span className="block text-[10px] font-normal italic">امام کے پیچھے قرات کرنا</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-slate-50/40 leading-normal">
                        {f.recitationOrder}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.recitationOrderUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 5 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Tashahhud Finger Point
                      <span className="block text-[10px] font-normal italic">اشارہ تشہد</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-white leading-normal">
                        {f.tashahhudFinger}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.tashahhudFingerUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 6 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Sujud Posture / Turbah
                      <span className="block text-[10px] font-normal italic">سجدہ کا طریقہ اورTurbah</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-slate-50/40 leading-normal">
                        {f.sujudPosture}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.sujudPostureUrdu}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Aspect 7 */}
                  <tr>
                    <td className="p-3 bg-slate-100 font-bold border border-slate-200 max-w-[200px]">
                      Ending Taslim
                      <span className="block text-[10px] font-normal italic">سلام کا پھیرنا</span>
                    </td>
                    {FIQH_COMPARATIVE_DATA.map(f => (
                      <td key={f.maslak} className="p-3 border border-slate-200 text-slate-700 bg-white leading-normal">
                        {f.taslimEnding}
                        <span className="block text-[10px] font-amiri font-bold text-emerald-800 mt-1" dir="rtl">{f.taslimEndingUrdu}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2.5 text-xs text-slate-500">
                <Info className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  <strong>Did you know?</strong> Islamic scholars unanimously establish that minor divergences are a sign of rich mercy (&apos;Rahmah&apos;) in implementation leeway, accommodating personal health and contextual ease without altering the spiritual core of Salah.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================================
          TAB 4: DAROOD RECITER DESK
          ============================================================================ */}
      {activeTab === "darood" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display flex items-center gap-1.5">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/10" />
              Sallallahu Alayhi Wa Sallam (درودِ پاک ڈیسک)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Consistently sending prayers upon Prophet Muhammad (SAW) resolves earthly difficulties and carries immense rewards. Choose a Durood Sharif below and use our digital counter to record your spiritual success.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t mt-4 flex-wrap">
              <button
                onClick={() => { playClickSound(800); setActiveDaroodTheme("ibrahim"); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer ${
                  activeDaroodTheme === "ibrahim"
                    ? "bg-rose-900 text-white shadow"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                Durood-e-Ibrahim (درودِ ابراہیمی)
              </button>

              <button
                onClick={() => { playClickSound(810); setActiveDaroodTheme("short"); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer ${
                  activeDaroodTheme === "short"
                    ? "bg-rose-900 text-white shadow"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                Short Salawat (درودِ پاک)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Display Renders */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 space-y-4 text-center">
                <span className="px-2 py-0.5 bg-rose-50 text-rose-800 text-[10px] font-bold rounded uppercase tracking-wider">
                  Active Recitation Text
                </span>

                {activeDaroodTheme === "ibrahim" ? (
                  <div className="space-y-4">
                    <p className="font-amiri font-bold text-base sm:text-xl text-slate-900 leading-loose" dir="rtl">
                      اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۞ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ
                    </p>
                    <p className="text-xs text-slate-500 font-mono italic">
                      Allāhumma ṣalli &apos;alā Muḥammadin wa &apos;alā āli Muḥammadin kamā ṣallayta &apos;alā Ibrāhīma wa &apos;alā āli Ibrāhīma innaka Ḥamīdun Majīd.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Majestic.
                    </p>
                    <p className="text-right text-sm sm:text-base font-amiri font-bold text-slate-800 leading-relaxed pt-2 border-t border-dashed" dir="rtl">
                      اے اللہ! حضرت محمد اور آلِ محمد پر اپنی رحمتیں نازل کر جس طرح تو نے حضرت ابراہیم اور ان کی آل پر رحمتیں نازل فرمائیں، بے شک تو قابلِ ستائش، بڑی عظمت والا ہے۔
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-amiri font-bold text-xl sm:text-3xl text-slate-900 leading-loose" dir="rtl">
                      صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِهٖ وَسَلَّمَ
                    </p>
                    <p className="text-xs text-slate-500 font-mono italic">
                      Sallallāhu &apos;Alayhi Wa Ālihi Wa Sallam.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      May Allan send blessings of peace upon Him and His Household.
                    </p>
                    <p className="text-right text-sm sm:text-base font-amiri font-bold text-slate-800 leading-relaxed pt-2 border-t border-dashed" dir="rtl">
                      اللہ پاک ان پر اور ان کی آل پر کمال درجے کی رحمتیں اور سلامتی نازل فرمائے۔
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-950 font-medium select-none">
                <Info className="w-5 h-5 text-rose-600 shrink-0" />
                <span>
                  <strong>Virtue:</strong> The Prophet (SAW) said: &ldquo;Whoever sends blessings upon me once, Allah will send blessings upon him ten times, erase ten sins, and elevate him ten ranks.&rdquo; (Sahih Muslim)
                </span>
              </div>
            </div>

            {/* Custom Tap/Click Controller Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between text-center relative overflow-hidden border-b-4 border-rose-500 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none"></div>

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] text-rose-300 uppercase tracking-widest font-extrabold block">Spiritual Tally Tracker</span>
                <span className="block text-5xl font-mono font-extrabold text-white tracking-widest mt-2">
                  {daroodCount}
                </span>
                <span className="text-xs text-slate-400 block font-medium">Times Recited</span>
              </div>

              {/* Major Tap Button */}
              <div className="my-8 relative z-10">
                <button
                  onClick={() => {
                    setDaroodCount((prev) => {
                      const newCount = prev + 1;
                      localStorage.setItem("islamify_darood_count", String(newCount));
                      return newCount;
                    });
                    playClickSound(1050);
                  }}
                  className="w-32 h-32 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 active:scale-95 transition-all outline-none border-4 border-white/20 hover:border-white/40 shadow-xl mx-auto flex flex-col items-center justify-center cursor-pointer group"
                >
                  <Heart className="w-8 h-8 text-white fill-white/10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-100 mt-2">TAP HERE</span>
                </button>
              </div>

              <div className="flex gap-2 relative z-10">
                {confirmResetDarood ? (
                  <>
                    <button
                      onClick={() => {
                        playClickSound(400);
                        setDaroodCount(0);
                        localStorage.setItem("islamify_darood_count", "0");
                        setConfirmResetDarood(false);
                      }}
                      className="flex-1 py-2 text-xs font-extrabold tracking-wider uppercase bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer transition-all border border-red-600 shadow-sm"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => {
                        playClickSound(500);
                        setConfirmResetDarood(false);
                      }}
                      className="px-3 py-2 text-xs font-extrabold tracking-wider uppercase border border-white/10 hover:bg-white/5 hover:border-white/20 rounded-xl cursor-pointer transition-all text-slate-300"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      playClickSound(400);
                      setConfirmResetDarood(true);
                    }}
                    className="flex-1 py-2 text-xs font-extrabold tracking-wider uppercase border border-white/10 hover:bg-white/5 hover:border-white/20 rounded-xl cursor-pointer transition-all"
                  >
                    Reset Count
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SINS, DEEDS AND AZAB WARNINGS FOOTER COMPONENT */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/25 via-slate-900 to-slate-900 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          <div className="space-y-2 col-span-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/40 text-xs text-red-400 rounded-full font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Azhab Warnings & Deeds Balance (خوفِ الٰہی)</span>
            </span>

            <h3 className="text-xl sm:text-2xl font-bold font-display">Are we safeguarding ourselves from grave sins?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Authentic hadiths sound strict statements (Azab Warnings) regarding usury/interest (Riba), backbiting (Gheebah), missing holy prayers purposefully, and pride. Utilize this platform to purify intent, adhere to authentic Fiqhs, and practice daily repentance (saying Sayyid-ul-Istighfar).
            </p>
          </div>

          <div className="flex justify-end">
            <div className="w-full md:w-auto p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 shadow-inner">
              <Activity className="w-10 h-10 text-rose-500 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Protect Your Faith</span>
                <span className="text-xs font-semibold text-slate-200">Guard daily prayers. Seek absolute forgiveness continuously.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
