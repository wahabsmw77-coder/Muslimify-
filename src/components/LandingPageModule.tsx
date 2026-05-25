import React, { useState, useEffect, useMemo } from "react";
import { 
  Scroll, BookOpen, BookImage, Sun, Compass, Clock, Coins, 
  HelpCircle, ArrowRight, Sparkles, Star, Heart, Calendar, 
  ChevronRight, ArrowUpRight, CheckCircle2, Award, ShieldCheck, Feather
} from "lucide-react";

// Assuming some mock data or imports for the needed items
const DAILY_DATA = {
  ayats: [
    { en: "Verily, with hardship comes ease.", ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا" },
    { en: "Read in the name of your Lord.", ar: "اقْرَأْ بِاسْمِ رَبِّكَ" },
    { en: "And He is with you wherever you are.", ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ" }
  ],
  hadiths: [
    { en: "Actions are by intentions.", ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ" },
    { en: "The strong person is the one who controls his anger.", ar: "وَلَكِنَّ الشَّدِيدَ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ" },
    { en: "The best among you are those who learn the Quran...", ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" }
  ],
  events: [
    { en: "Upcoming: Hijri New Year", ar: "السنة الهجرية الجديدة" },
    { en: "Upcoming: Ramadan Preparations", ar: "استعدادات رمضان" },
    { en: "Upcoming: Eid-ul-Adha", ar: "عيد الأضحى" }
  ],
  words: [
    { en: "Sabr (Patience)", ar: "صَبْر" },
    { en: "Tawakkul (Trust)", ar: "تَوَكُّل" },
    { en: "Rahma (Mercy)", ar: "رَحْمَة" }
  ],
  duas: [
    { en: "O Allah, grant me guidance.", ar: "اللَّهُمَّ اهْدِنِي" },
    { en: "O Allah, forgive my sins.", ar: "اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي" },
    { en: "O Allah, give me beneficial knowledge.", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا" }
  ]
};

interface LandingPageProps {
  setActiveSection: (section: any) => void;
  languageCode: string;
}

export default function LandingPageModule({ setActiveSection, languageCode }: LandingPageProps) {
  const [timeState, setTimeState] = useState(new Date());
  const [dashboardData, setDashboardData] = useState({
    ayat: DAILY_DATA.ayats[0],
    hadith: DAILY_DATA.hadiths[0],
    event: DAILY_DATA.events[0],
    word: DAILY_DATA.words[0],
    dua: DAILY_DATA.duas[0],
  });

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeQuoteCode, setActiveQuoteCode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeState(new Date()), 1000);
    const dataTimer = setInterval(() => {
      setDashboardData({
        ayat: DAILY_DATA.ayats[Math.floor(Math.random() * DAILY_DATA.ayats.length)],
        hadith: DAILY_DATA.hadiths[Math.floor(Math.random() * DAILY_DATA.hadiths.length)],
        event: DAILY_DATA.events[Math.floor(Math.random() * DAILY_DATA.events.length)],
        word: DAILY_DATA.words[Math.floor(Math.random() * DAILY_DATA.words.length)],
        dua: DAILY_DATA.duas[Math.floor(Math.random() * DAILY_DATA.duas.length)],
      });
    }, 60000);
    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, []);

  const DAILY_WISDOM = useMemo(() => [
    { data: dashboardData.ayat, source: "Noble Quran", tag: "Ayat" },
    { data: dashboardData.hadith, source: "Prophetic Hadith", tag: "Hadith" },
    { data: dashboardData.word, source: "Quranic Word", tag: "Vocabulary" },
    { data: dashboardData.dua, source: "Supplication", tag: "Dua" }
  ], [dashboardData]);

  const BENTO_CARDS = [
    {
      id: "quran",
      title: "Noble Quran Classroom",
      nativeTitle: "القرآن الكريم",
      description: "Read, research classical commentary (Tafseer), listen to world-class recitations, and download custom-designed Surah PDFs instantly.",
      badge: "PDFs & Classical Tafseer",
      badgeColor: "bg-amber-400/25 text-amber-300 border-amber-500/30",
      icon: Scroll,
      stats: "114 Chapters • 6,236 Verses",
      gradient: "from-emerald-950 via-emerald-900 to-teal-950",
      accentIconColor: "text-amber-400"
    },
    {
      id: "hadith",
      title: "Sihah Sitta Hadith Suite",
      nativeTitle: "الحديث الشريف",
      description: "Verify, search, and parse valid prophetic records from Bukhari, Muslim, and modern scholars with comprehensive grading.",
      badge: "6 Canonical Books",
      badgeColor: "bg-emerald-400/25 text-emerald-300 border-emerald-500/30",
      icon: BookOpen,
      stats: "Complete Chain Verification",
      gradient: "from-teal-950 via-teal-900 to-green-950",
      accentIconColor: "text-emerald-300"
    },
    {
      id: "library",
      title: "Islamic Books & Reference Library",
      nativeTitle: "المكتبة الإسلامية",
      description: "Study profound publications on Aqeedah, Tazkiyah, Seerah, and Islamic history sourced directly from trusted consensus works.",
      badge: "Divine Jurisprudence",
      badgeColor: "bg-sky-400/25 text-sky-300 border-sky-500/30",
      icon: BookImage,
      stats: "20+ Reference Classics",
      gradient: "from-slate-950 via-slate-900 to-sky-950",
      accentIconColor: "text-sky-400"
    },
    {
      id: "guidance",
      title: "Prophetic Sunnah Suite",
      nativeTitle: "السنة النبوية",
      description: "Step-by-step illustrations of daily Prophetic guidance, hygienic practices, etiquettes, and righteous mannerisms.",
      badge: "Daily Lifestyle",
      badgeColor: "bg-purple-400/25 text-purple-305 border-purple-500/30",
      icon: Compass,
      stats: "Ethics & Mannerisms",
      gradient: "from-indigo-950 via-indigo-900 to-purple-950",
      accentIconColor: "text-purple-400"
    },
    {
      id: "prayers",
      title: "Salah Clock & Times Desk",
      nativeTitle: "مواقيت الصلاة",
      description: "Extremely accurate calculation of precise local and global prayer times matching national authorities with astronomical indicators.",
      badge: "Real-time Tracker",
      badgeColor: "bg-rose-400/25 text-rose-300 border-rose-500/30",
      icon: Clock,
      stats: "Wilt, Sunrise, Sunset timings",
      gradient: "from-rose-950 via-rose-900 to-amber-950",
      accentIconColor: "text-rose-400"
    },
    {
      id: "qibla",
      title: "3D Astronomical Qibla",
      nativeTitle: "بوصلة القبلة",
      description: "A gorgeous real-time 3D sensory tracking compass specifying exact geographical and geometric coordinates towards the Kaaba.",
      badge: "Interactive 3D Engine",
      badgeColor: "bg-yellow-400/25 text-yellow-300 border-yellow-500/30",
      icon: Compass,
      stats: "Degree & Kaaba Distance",
      gradient: "from-slate-900 via-amber-950 to-emerald-950",
      accentIconColor: "text-yellow-400"
    },
    {
      id: "azkar",
      title: "Eadhkars & Counters",
      nativeTitle: "الأذكار اليومية",
      description: "Keep track of Morning, Evening, and protective post-Salah remembrance supplications with active count state saves.",
      badge: "Active Remembrance",
      badgeColor: "bg-teal-400/25 text-teal-300 border-teal-500/30",
      icon: Sun,
      stats: "Saves count on restart",
      gradient: "from-yellow-950 via-emerald-800 to-teal-900",
      accentIconColor: "text-emerald-400"
    },
    {
      id: "zakat_ushr",
      title: "Zakat & Ushr Computer",
      nativeTitle: "حساب الزكاة",
      description: "Sophisticated modern financial calculator applying correct nisab thresholds for gold, silver, currencies, crops, and assets.",
      badge: "Precise Rulings",
      badgeColor: "bg-yellow-400/25 text-yellow-300 border-yellow-500/30",
      icon: Coins,
      stats: "Active Nisab synchronization",
      gradient: "from-amber-950 via-yellow-900 to-emerald-950",
      accentIconColor: "text-yellow-400"
    },
    {
      id: "kalimas",
      title: "Six Kalimas & Sects",
      nativeTitle: "الكلمات الست والفرق",
      description: "Discover and compare the six holy testimonies (Kalimas) across different denominations (Sunni, Shia) with dynamic recitations and explanations.",
      badge: "Multi-Sect Complete Guide",
      badgeColor: "bg-amber-400/25 text-amber-300 border-yellow-400/30",
      icon: Sparkles,
      stats: "Word-by-word Audio Simulator",
      gradient: "from-[#0d4e35] via-emerald-950 to-emerald-900",
      accentIconColor: "text-[#FFD700]"
    },
    {
        id: "ibadat",
        title: "Ibadat & Guidance",
        nativeTitle: "العبادات والتوجيه",
        description: "Step-by-step guides for fasting, Hajj, Umrah, Namaz Janaza and more.",
        badge: "Essential Practices",
        badgeColor: "bg-emerald-400/25 text-emerald-300 border-emerald-500/30",
        icon: Feather,
        stats: "Comprehensive Guides",
        gradient: "from-emerald-900 via-green-800 to-teal-900",
        accentIconColor: "text-emerald-300"
    },
    {
        id: "resources",
        title: "Educational Resources",
        nativeTitle: "الموارد التعليمية",
        description: "Names of Allah, Prophet's names, Shahadat, Tajweed rules and QAIDA.",
        badge: "Learning Tools",
        badgeColor: "bg-sky-400/25 text-sky-300 border-sky-500/30",
        icon: BookOpen,
        stats: "Foundational Learning",
        gradient: "from-sky-900 via-blue-800 to-slate-950",
        accentIconColor: "text-sky-300"
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
        
        {/* Beautiful Palestine Solidarity & Support Banner with Palestine Flag Background */}
        <div id="free-palestine-banner" className="relative w-full rounded-[30px] overflow-hidden border border-slate-900/10 dark:border-white/5 shadow-lg bg-slate-950 text-white select-none">
          {/* Detailed background representing the Palestine Flag */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            <div className="h-1/3 w-full bg-[#000000] opacity-80"></div>
            <div className="h-1/3 w-full bg-[#FFFFFF] opacity-90"></div>
            <div className="h-1/3 w-full bg-[#009736] opacity-80"></div>
          </div>

          {/* Red Triangle of the Flag */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[40%] md:w-[30%] lg:w-[22%] bg-[#E4312B] pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
          ></div>

          {/* Transparent Dark overlay to keep copy crisp and compliant on top of rich stripes */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/75 via-black/70 to-emerald-950/80 backdrop-blur-[0.5px] pointer-events-none"></div>

          {/* Sparkles shining backdrop */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial-gradient(circle_at_right,_rgba(255,255,255,0.08)_0px,_transparent_70%) pointer-events-none"></div>

          <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* Dynamic 3D Flag Emblem Badge */}
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/25 shadow-2xl flex flex-col overflow-hidden relative">
                <div className="h-1/3 bg-black"></div>
                <div className="h-1/3 bg-white"></div>
                <div className="h-1/3 bg-[#009736]"></div>
                <div 
                  className="absolute inset-y-0 left-0 w-[40%] bg-[#E4312B]" 
                  style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] animate-pulse-slow">
                  🇵🇸
                </div>
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase text-yellow-300">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                  <span>HUMANITARIAN SOLIDARITY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sans tracking-tight leading-tight flex items-center justify-center sm:justify-start gap-3">
                  <span>Free Palestine</span>
                  <span className="text-emerald-400 font-normal font-amiri text-2xl sm:text-3xl" dir="rtl">
                    الحرية لفلسطين
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed">
                  Praying for persistent justice, lasting peace, and divine safety of our brothers and sisters in the Holy Land. We stand in absolute solidarity with humanity and advocate for ultimate liberty.
                </p>
              </div>
            </div>

            {/* Quick Dua Callout Card */}
            <div className="shrink-0 w-full lg:w-auto">
              <div className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xs transition-all text-xs text-white/90 text-center lg:text-right font-medium leading-normal max-w-full lg:max-w-[280px] mx-auto">
                <span className="block text-[9px] font-bold text-red-400 font-mono tracking-widest uppercase mb-1">Supplication of Peace</span>
                "O Allah, protect the people of Palestine, heal their wounded, and grant them ultimate victory, security, and peace."
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-950 rounded-2xl text-white shadow-lg border border-islamic-gold">
                <h3 className="text-islamic-gold text-sm font-bold uppercase tracking-widest mb-2">Daily Ayat</h3>
                <p className="text-slate-200 text-lg font-amiri" dir="rtl">{dashboardData.ayat.ar}</p>
                <p className="text-slate-400 text-xs mt-1">{dashboardData.ayat.en}</p>
            </div>
            <div className="p-6 bg-emerald-950 rounded-2xl text-white shadow-lg border border-islamic-gold">
                <h3 className="text-islamic-gold text-sm font-bold uppercase tracking-widest mb-2">Daily Hadith</h3>
                <p className="text-slate-200 text-lg font-amiri" dir="rtl">{dashboardData.hadith.ar}</p>
                <p className="text-slate-400 text-xs mt-1">{dashboardData.hadith.en}</p>
            </div>
            <div className="p-6 bg-emerald-950 rounded-2xl text-white shadow-lg border border-islamic-gold">
                <h3 className="text-islamic-gold text-sm font-bold uppercase tracking-widest mb-2">Islamic Calendar & Events</h3>
                <p className="text-slate-200">{dashboardData.event.en}</p>
            </div>
            <div className="p-6 bg-emerald-950 rounded-2xl text-white shadow-lg border border-islamic-gold">
                <h3 className="text-islamic-gold text-sm font-bold uppercase tracking-widest mb-2">Quranic Word</h3>
                <p className="text-slate-200 text-2xl font-amiri" dir="rtl">{dashboardData.word.ar}</p>
                <p className="text-slate-400 text-xs mt-1">{dashboardData.word.en}</p>
            </div>
            <div className="p-6 bg-emerald-950 rounded-2xl text-white shadow-lg border border-islamic-gold">
                <h3 className="text-islamic-gold text-sm font-bold uppercase tracking-widest mb-2">Daily Dua</h3>
                <p className="text-slate-200 text-lg font-amiri" dir="rtl">{dashboardData.dua.ar}</p>
                <p className="text-slate-400 text-xs mt-1">{dashboardData.dua.en}</p>
            </div>
        </div>

      {/* 
        ====================================================================
        3D CELESTIAL CLOCK & LUXURY BANNER PART
        ====================================================================
      */}
      <div className="relative rounded-[36px] bg-gradient-to-br from-slate-950 via-emerald-955 to-slate-900 text-white p-6 sm:p-10 border-2 border-islamic-gold/40 shadow-[0_25px_60px_-15px_rgba(11,46,17,0.7)] overflow-hidden">
        
        {/* Glowing floating light bubbles representing divine celestial rays */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 w-48 h-48 rounded-full bg-islamic-gold/5 blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent) pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Main welcome titles with luxury 3D texts */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-islamic-gold/15 border border-islamic-gold/30 rounded-xl text-xs text-islamic-gold hover:scale-105 duration-200 transition-transform">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
              <span className="font-extrabold uppercase tracking-widest font-mono">The Ultimate Unified Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-amiri tracking-tight text-white leading-tight">
              Embark on a Divine Pathway of <span className="text-islamic-gold block sm:inline">Scholarly Wisdom</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl opacity-90">
              Welcome to the premium interactive digital suite of <strong className="text-islamic-gold font-bold">Muslimify</strong>—engineered 
              with multi-layered 3D visuals, live local time indicators, and immediate access to authenticated consensus scriptures. 
              Rest your mind on validated works of prophetic tradition and classical exegesis.
            </p>

            {/* Quick stats board - 3D visual look */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-islamic-gold border border-amber-500/20">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold font-mono">FAITH PILLARS</span>
                  <span className="block text-xs font-black text-white">Full Guides Included</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 text-[#6EE7B7] border border-teal-500/20">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold font-mono">AUTHENTICITY</span>
                  <span className="block text-xs font-black text-white">No Hallucinations</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3 justify-center sm:justify-start">
                <div className="p-2 rounded-xl bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold font-mono">AUTHORIZATION</span>
                  <span className="block text-xs font-black text-white">Consensus Scholars</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D CELESTIAL CLOCK WIDGET (LUXURY INTERACTIVE COMPONENT) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-emerald-900 to-[#0e3b15] rounded-full border-4 border-islamic-gold shadow-[0_15px_40px_-5px_rgba(212,175,55,0.4)] hover:scale-105 duration-350 transition-transform cursor-help">
              
              {/* Spinning astronomical calibration ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-islamic-gold/40 animate-compass-rotate opacity-60"></div>
              
              {/* Outer compass degree markers */}
              <div className="absolute inset-4 rounded-full border border-islamic-gold/20 flex items-center justify-center">
                <div className="absolute top-1 text-[8px] font-bold text-islamic-gold font-mono tracking-widest">N 360°</div>
                <div className="absolute right-1 text-[8px] font-bold text-islamic-gold font-mono tracking-widest">E 90°</div>
                <div className="absolute bottom-1 text-[8px] font-bold text-islamic-gold font-mono tracking-widest">S 180°</div>
                <div className="absolute left-1 text-[8px] font-bold text-islamic-gold font-mono tracking-widest">W 270°</div>
              </div>

              {/* Kaaba Directional Ray indicator */}
              <div className="absolute w-[2px] h-24 bg-gradient-to-t from-transparent via-yellow-300 to-islamic-gold rounded-full rotate-[118deg] transform origin-bottom -translate-y-[24px]">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-black absolute -top-1 left-1/2 -translate-x-1/2 animate-ping"></div>
              </div>

              <div className="relative z-10 text-center space-y-2">
                <div className="p-2 bg-slate-950/50 rounded-2xl inline-block border border-white/5 shadow-inner">
                  <Clock className="w-6 h-6 text-islamic-gold mx-auto" />
                </div>
                
                <h4 className="text-2xl font-black font-mono tracking-wider drop-shadow-md text-white select-none">
                  {timeState.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </h4>

                <div className="space-y-0.5">
                  <span className="block text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold font-mono">
                    Gregorian Calendar
                  </span>
                  <span className="block text-xs font-bold text-slate-100 font-mono">
                    {timeState.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-islamic-gold/40 rounded-full text-[10px] text-islamic-gold font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Kaaba Angle: 118.4° E
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 
        ====================================================================
        WISE SCRIPTURAL DAILY INSPIRATION CARDO (3D SHADOWED SCROLL)
        ====================================================================
      */}
      <div className="relative p-6 sm:p-8 rounded-[30px] bg-white border border-islamic-green/10 shadow-[0_15px_40px_-15px_rgba(27,94,32,0.12)] islamic-fine-mesh-bg overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-50 text-islamic-green text-[10px] font-extrabold uppercase tracking-widest rounded-md border border-emerald-100">
              Daily Divine Wisdom
            </span>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase tracking-widest rounded-md border border-amber-100">
              {DAILY_WISDOM[activeQuoteCode].tag}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-850 font-medium font-serif italic leading-relaxed text-slate-900">
            "{DAILY_WISDOM[activeQuoteCode].data.en}"
            <span className="block mt-1 text-right font-amiri" dir="rtl">{DAILY_WISDOM[activeQuoteCode].data.ar}</span>
          </p>
          <p className="text-xs text-slate-500 font-bold font-mono">
            — {DAILY_WISDOM[activeQuoteCode].source}
          </p>
        </div>

        <button
          onClick={() => setActiveQuoteCode((prev) => (prev + 1) % DAILY_WISDOM.length)}
          className="shrink-0 px-4 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-200 shadow-md flex items-center gap-2 self-stretch md:self-auto justify-center"
        >
          <span>Refresh Wisdom</span>
          <ChevronRight className="w-4 h-4 text-islamic-gold" />
        </button>

      </div>

      {/* 
        ====================================================================
        BENTO INTERACTIVE 3D DIRECTORY (THE USER REQUESTED UNIQUE PAGES)
        ====================================================================
      */}
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Unified Divine Directory
          </h3>
          <p className="text-xs text-slate-505 font-bold font-mono tracking-widest uppercase text-slate-600 mt-1">
            Browse beautiful, dedicated portals for each theological subject
          </p>
        </div>

        {/* Bento structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {BENTO_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveSection(card.id as any)}
                className={`group card-3d-gilded rounded-[28px] bg-gradient-to-br ${card.gradient} text-white p-6 border-2 border-white/5 relative flex flex-col justify-between h-[250px] cursor-pointer select-none overflow-hidden`}
              >
                {/* Visual glass layer shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none transform translate-x-6 translate-y-6 group-hover:scale-110 transition-transform duration-300"></div>

                <div>
                  
                  {/* Card Header stats */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className={`px-2.5 py-0.5 rounded-md border text-[9px] uppercase font-mono tracking-widest font-black ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-350 font-mono tracking-wider">
                      {card.stats}
                    </span>
                  </div>

                  {/* Icon & Arabic Title cluster */}
                  <div className="flex items-center gap-3.5 pt-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 duration-250 transition-transform flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${card.accentIconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base leading-tight font-sans text-white group-hover:text-islamic-gold transition-colors">
                        {card.title}
                      </h4>
                      <span className="text-xs text-islamic-gold font-bold font-amiri block mt-0.5">
                        {card.nativeTitle}
                      </span>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p className="text-xs text-slate-250 leading-relaxed font-normal pt-3.5 opacity-85 group-hover:opacity-100 transition-opacity">
                    {card.description}
                  </p>

                </div>

                {/* Interactive Bottom action bar */}
                <div className="flex items-center justify-end pt-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-200 group-hover:text-islamic-gold transition-colors flex items-center gap-1 bg-black/3 w-full justify-between pt-2 border-t border-white/5">
                    <span className="opacity-60 group-hover:opacity-100">Click to Open Portal</span>
                    <div className="flex items-center gap-1 text-islamic-gold">
                      <span>OPEN</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* 
        ====================================================================
        VIRTUE ROW PRO DECORATIONS
        ====================================================================
      */}
      <div className="bg-gradient-to-br from-slate-900 to-black p-8 rounded-[36px] border-2 border-islamic-gold/30 text-center space-y-4">
        <h4 className="text-sm font-extrabold tracking-widest uppercase font-mono text-[#D4AF37]">
          Verified System Security & Authenticity
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tanzil.net Database Integration</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Graded Sihah Sitta Chains Only</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Classical Jurisprudence & Consensus Works</span>
          </div>
        </div>
      </div>

    </div>
  );
}
