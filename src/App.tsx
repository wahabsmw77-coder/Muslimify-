import React, { useState, useEffect } from "react";
import LandingPageModule from "./components/LandingPageModule";
import QuranModule from "./components/QuranModule";
import HadithModule from "./components/HadithModule";
import LibraryModule from "./components/LibraryModule";
import AzkarModule from "./components/AzkarModule";
import PrayerTimeModule from "./components/PrayerTimeModule";
import SunnahGuidanceModule from "./components/SunnahGuidanceModule";
import ZakatUshrCalculator from "./components/ZakatUshrCalculator";
import QiblaModule from "./components/QiblaModule";
import KalimasModule from "./components/KalimasModule";
import IbadatModule from "./components/IbadatModule";
import ResourcesModule from "./components/ResourcesModule";
import ReviewsAndMission from "./components/ReviewsAndMission";
import ReportErrorDialog from "./components/ReportErrorDialog";
import MuslimifyLogo, { MosqueLogoSVG } from "./components/MuslimifyLogo";
import { getT } from "./translations";
import { LANGUAGES } from "./data/languages";
import { BookOpen, HelpCircle, Sun, Moon, Scroll, BookImage, Globe, MapPin, Feather, Phone, Github, ArrowUp, AlertTriangle, Clock, Compass, Coins, Menu, X, Home, Sparkles, Music } from "lucide-react";

type Section = "home" | "quran" | "hadith" | "library" | "azkar" | "prayers" | "guidance" | "zakat_ushr" | "qibla" | "kalimas" | "ibadat" | "resources";

export default function App() {
  const [activeIbadatTopic, setActiveIbadatTopic] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [languageCode, setLanguageCode] = useState<string>(() => {
    try {
      return localStorage.getItem("muslimify_language") || "en";
    } catch {
      return "en";
    }
  });

  const t = getT(languageCode);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [globalReportOpen, setGlobalReportOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("muslimify_theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {}
    return "light";
  });

  useEffect(() => {
    try {
      localStorage.setItem("muslimify_language", languageCode);
    } catch {}
  }, [languageCode]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("muslimify_theme", theme);
    } catch {}
  }, [theme]);

  // Track active language structure
  const activeLanguage = LANGUAGES.find(l => l.code === languageCode) || LANGUAGES[0];

  useEffect(() => {
    // Synchronize HTML lang/dir attributes
    document.documentElement.lang = languageCode;
    document.documentElement.dir = activeLanguage.dir;
  }, [languageCode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Clear any stale browser hashes on initial load to force-launch on the home page
    if (window.location.hash) {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = "";
      }
    }
    setActiveSection("home");

    const handleHash = () => {
      const h = window.location.hash;
      if (h === "#ibadat") {
        setActiveSection("ibadat");
        setActiveIbadatTopic(null);
      } else if (h === "#salah") {
        setActiveSection("ibadat");
        setActiveIbadatTopic("salah");
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-islamic-cream">
      {/* Decorative Triple-Line Border at the Absolute Top */}
      <div className="w-full space-y-[2px] bg-slate-950 py-1 select-none">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-islamic-gold to-transparent opacity-80"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-50"></div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-islamic-gold to-transparent opacity-80"></div>
      </div>
      {/* 
        ====================================================================
        1. THE NAV BAR / APPLICATION HEADER
        ====================================================================
      */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-950 via-islamic-green to-emerald-900 text-white border-b-4 border-islamic-gold shadow-xl">
        {/* Subtle geometric overlay row */}
        <div className="h-1 bg-[linear-gradient(90deg,transparent_0%,#D4AF37_50%,transparent_100%)] opacity-75"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4 w-full">
            
            {/* Logo and Brand Title Header */}
            <div className="flex items-center gap-4 text-left cursor-pointer select-none group" onClick={() => setActiveSection("home")}>
              <MuslimifyLogo variant="header" className="h-10 sm:h-11" />

              {/* Outstanding Gilded Designer Badge for Laptops/Desktops */}
              <div className="hidden md:inline-flex items-center gap-2 bg-emerald-900/60 border border-islamic-gold/35 px-3 py-1.5 rounded-xl text-left shadow-md">
                <span className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse"></span>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-300 font-bold">Senior Artisan Desk</span>
                  <span className="text-xs text-islamic-gold font-bold">Built by Abdul Wahab</span>
                </div>
              </div>
            </div>

            {/* Menu Controls Container (Hamburger button at top corner) */}
            <div className="flex items-center gap-3">
              {/* Desktop Wide View: Hide on mobile/tablet (max-xl), show on desktop (xl) */}
              <div className="hidden xl:flex items-center gap-3">
                <nav className="flex items-center gap-1 bg-black/25 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setActiveSection("home")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "home"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{t.dashboard}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("quran")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "quran"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Scroll className="w-3.5 h-3.5 text-yellow-500" />
                    <span>{t.quran}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("hadith")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "hadith"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.hadith}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("library")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "library"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <BookImage className="w-3.5 h-3.5" />
                    <span>{t.library}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("azkar")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "azkar"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{t.azkar}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("guidance")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "guidance"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white/90"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{t.guidance}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("prayers")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "prayers"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.prayers}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("qibla")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "qibla"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t.qibla}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("zakat_ushr")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "zakat_ushr"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>{t.zakat}</span>
                  </button>
                   <button
                    onClick={() => setActiveSection("kalimas")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === "kalimas"
                        ? "bg-gradient-to-b from-yellow-300 to-islamic-gold text-slate-900 font-extrabold shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{t.kalimas}</span>
                  </button>
                </nav>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGlobalReportOpen(true)}
                    className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-800/40 px-3 py-2 rounded-xl text-xs font-bold text-red-100 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-islamic-gold" />
                    <span>{t.report}</span>
                  </button>
                </div>
              </div>

              {/* Universal Top-Corner Controls: Theme Switch and Language Selector */}
              <div className="flex items-center gap-2">
                {/* Theme Switcher Toggle */}
                <button
                  onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                  className="flex items-center justify-center bg-emerald-950/85 hover:bg-emerald-900 border border-white/10 text-islamic-gold w-9.5 h-9.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                  title={theme === "light" ? "Enable Night Mode" : "Enable Light Mode"}
                >
                  {theme === "light" ? (
                    <Moon className="w-4 h-4 text-islamic-gold fill-islamic-gold/10" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-300 fill-yellow-300/20" />
                  )}
                </button>

                {/* Compact Interactive Language Select */}
                <div className="flex items-center gap-1.5 bg-emerald-950/85 px-2.5 py-1.5 rounded-xl border border-white/10 h-9.5 shrink-0 shadow-inner">
                  <Globe className="w-3.5 h-3.5 text-islamic-gold" />
                  <select
                    value={languageCode}
                    onChange={(e) => setLanguageCode(e.target.value)}
                    className="bg-transparent text-white font-bold text-xs select-none focus:outline-none cursor-pointer pr-1"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code} className="text-slate-900 font-semibold bg-white">
                        {lang.code.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* UNIVERSAL HAMBURGER BUTTON: "3 lines" at top corner for mobile/tablet & compact screen sizes */}
              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center justify-center p-2.5 bg-emerald-900/60 hover:bg-emerald-950 border-2 border-islamic-gold/70 hover:border-islamic-gold rounded-xl hover:scale-105 active:scale-95 transition-all text-islamic-gold hover:text-white focus:outline-none relative shadow-md"
                aria-label="Open Navigation Directory"
              >
                <Menu className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
              </button>

              {/* Gilded Mosque Emblem added on the absolute Top-Right Corner */}
              <div 
                className="flex items-center justify-center p-1.5 bg-emerald-950/80 hover:bg-emerald-900 border-2 border-islamic-gold/50 rounded-xl transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
                onClick={() => setActiveSection("home")}
                title="Go to Home Dashboard"
              >
                <MosqueLogoSVG className="h-7.5 w-7.5" />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 
        ====================================================================
        2. HERO SECTION / WELCOME CARD (RE-STYLED WITH ISLAMIC PATTERN GEOMETRY)
        ====================================================================
      */}
      {activeSection === "home" && (
        <div className="islamic-pattern-banner shadow-2xl px-4 py-10 md:py-14 border-b-4 border-islamic-gold text-white relative overflow-hidden">
          {/* Absolute decorative star backdrops */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,var(--color-islamic-gold)_2px,transparent_3px)] bg-[size:16px_16px] pointer-events-none"></div>
          <div className="absolute left-6 -bottom-10 w-24 h-24 rounded-full bg-islamic-gold/10 blur-xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-islamic-gold/20 border border-islamic-gold/45 rounded-full text-xs text-islamic-gold font-bold">
                <span>Verified Divine Study Desk</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-amiri leading-tight">
                Assalamu Alaikum
                <span className="block text-2xl sm:text-3xl md:text-4xl text-islamic-gold font-serif font-semibold mt-1">السلام عليكم ورحمة الله وبركاته</span>
              </h2>
              
              <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-xl font-medium opacity-95">
                Welcome to the elite portal of **Muslimify**, custom-engineered to deliver authentic divine Quran transcripts, Sihah Sitta Prophetic Hadith validation, protective Morning/Evening Adhkar counters, and historic classical jurisprudence. 
              </p>

              {/* Built by signature embedded nicely in greeting */}
              <p className="text-xs text-islamic-gold font-semibold tracking-wider font-mono">
                ★ Devotedly Handcrafted for global Muslims by <span className="underline decoration-wavy underline-offset-4 decoration-yellow-400 font-extrabold text-white">Abdul Wahab</span>
              </p>
            </div>

            {/* Interactive Pro Metrics Showcase widget */}
            <div className="gilded-border-dark p-6 w-full max-w-sm rounded-2xl space-y-3.5 shadow-2xl relative">
              <div className="absolute -top-3 right-4 bg-islamic-gold text-slate-900 border border-yellow-200 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md font-extrabold font-mono">
                Live Verified
              </div>
              
              <span className="text-[10px] font-bold text-islamic-gold uppercase tracking-widest block font-mono">
                Integrated System Metrics
              </span>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-1.5 border-b border-white/10 pb-3">
                <div className="bg-white/5 py-2 px-1 rounded-xl border border-white/5">
                  <span className="block text-lg font-extrabold text-white drop-shadow-xs font-mono">6,236</span>
                  <span className="block text-[8px] text-slate-300 font-bold uppercase tracking-wider">Noble Ayat</span>
                </div>
                <div className="bg-white/5 py-2 px-1 rounded-xl border border-white/5">
                  <span className="block text-lg font-extrabold text-white drop-shadow-xs font-mono">114</span>
                  <span className="block text-[8px] text-slate-300 font-bold uppercase tracking-wider">All Surahs</span>
                </div>
                <div className="bg-white/5 py-2 px-1 rounded-xl border border-white/5">
                  <span className="block text-lg font-extrabold text-islamic-gold font-mono">100%</span>
                  <span className="block text-[8px] text-slate-300 font-bold uppercase tracking-wider">Authentic</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-white/90">
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span className="text-slate-300">Classrooms cataloged:</span>
                  <span className="font-bold text-white font-mono">Sihah Sitta (6 Books)</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span className="text-slate-300">Translations online:</span>
                  <span className="font-bold text-white font-mono">30+ Major Dialects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        3. DYNAMIC CONTENT MAIN VIEWS PANELS
        ====================================================================
      */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-300">
        
        {/* Mobile floating responsive credit bar to honor user request on any screen */}
        <div className="block sm:hidden mb-6 p-3 bg-gradient-to-r from-emerald-950 to-islamic-green text-center rounded-xl border border-islamic-gold/40 text-xs text-white">
          ✨ Crafted by <span className="font-bold text-islamic-gold">Abdul Wahab</span> • Suitable for all mobile & desktop screens
        </div>

        {activeSection === "home" && <LandingPageModule setActiveSection={setActiveSection} languageCode={languageCode} />}
        {activeSection === "quran" && <QuranModule languageCode={languageCode} />}
        {activeSection === "hadith" && <HadithModule languageCode={languageCode} />}
        {activeSection === "library" && (
          <LibraryModule 
            languageCode={languageCode} 
            setActiveSection={setActiveSection} 
            setActiveIbadatTopic={setActiveIbadatTopic} 
          />
        )}
        {activeSection === "azkar" && <AzkarModule languageCode={languageCode} />}
        {activeSection === "guidance" && <SunnahGuidanceModule languageCode={languageCode} />}
        {activeSection === "zakat_ushr" && <ZakatUshrCalculator languageCode={languageCode} />}
        {activeSection === "kalimas" && <KalimasModule languageCode={languageCode} />}
        {activeSection === "ibadat" && (
          <IbadatModule 
            languageCode={languageCode} 
            activeTopic={activeIbadatTopic} 
            setActiveTopic={setActiveIbadatTopic} 
          />
        )}
        {activeSection === "resources" && <ResourcesModule languageCode={languageCode} />}
        {activeSection === "prayers" && <PrayerTimeModule languageCode={languageCode} />}
        {activeSection === "qibla" && <QiblaModule languageCode={languageCode} />}

        {/* Global Mission & Live Audience Reviews Section */}
        <ReviewsAndMission languageCode={languageCode} />

      </main>

      {/* 
        ====================================================================
        4. APP FOOTER COMPONENT
        ====================================================================
      */}
      <footer className="bg-gradient-to-b from-slate-900 to-black border-t-2 border-islamic-gold py-10 text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="text-center md:text-left space-y-1.5 font-sans">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <p className="font-semibold text-white">۞ Muslimify Professional Digital Registry</p>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400 max-w-md">
              A comprehensive Islamic research library. All Arabic contents are sourced from licensed publishers & compiled using Tanzil database.
            </p>
          </div>

          {/* Luxury Signature Credit */}
          <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-islamic-gold/30 text-center space-y-1 shadow-lg max-w-xs w-full">
            <span className="block text-[8px] text-slate-400 uppercase tracking-widest">Architect & Creator</span>
            <p className="text-islamic-gold font-extrabold text-sm tracking-wider font-sans hover:scale-105 transform duration-200">
              Abdul Wahab
            </p>
            <span className="block text-[9px] text-emerald-300 font-medium">Devoted Developer & Designer</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5 font-mono text-[10px] text-center md:text-right">
            <span className="text-islamic-gold font-extrabold">★ Verified authentic Quranic & Hadith publications translation database</span>
            <span className="text-slate-300 font-semibold">★ High-performance lazy-loading scripts configured for instant Arabic-Urdu-English</span>
            <span className="text-slate-400">★ Developed with profound dedication to ease search and study for global researchers</span>
          </div>

        </div>

        {/* Decorative Triple-Line Border at the Absolute Bottom */}
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-1">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-islamic-gold to-transparent opacity-80"></div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-50"></div>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-islamic-gold to-transparent opacity-80"></div>
        </div>
      </footer>

      {/* Floating Arrow Back Button to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-gradient-to-r from-emerald-950 to-islamic-green text-islamic-gold hover:text-white rounded-full shadow-2xl border-2 border-islamic-gold active:scale-95 transition-all duration-300 cursor-pointer group flex items-center justify-center animate-fade-in"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      {/* Global Secure Error Reporting system modal */}
      <ReportErrorDialog isOpen={globalReportOpen} onClose={() => setGlobalReportOpen(false)} />

      {/* 
        ====================================================================
        SLIDE-OVER DRAWERS / HAMBURGER MENU DRAWER (3 lines overlay)
        ====================================================================
      */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="mobile-hamburger-drawer">
          {/* Backdrop blur overlay with custom fade-in */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sliding container panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-gradient-to-b from-emerald-950 via-islamic-green to-emerald-900 text-white shadow-2xl flex flex-col justify-between border-l-4 border-islamic-gold animate-slide-in-right">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 bg-black/20 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-emerald-900 border border-islamic-gold rounded-lg rotate-45 flex items-center justify-center">
                    <span className="-rotate-45 text-sm font-bold text-islamic-gold">۞</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight text-islamic-gold font-sans">
                      Muslimify Portal
                    </h3>
                    <p className="text-[10px] text-slate-350 uppercase font-mono tracking-widest font-bold">
                      Navigation Directory
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 bg-black/20 hover:bg-black/40 border border-white/10 rounded-xl text-white hover:text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable List of Navigation items */}
              <div className="p-6 flex-1 overflow-y-auto space-y-5">
                
                {/* Navigation Menus List inside Drawer */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-widest font-mono mb-1.5">
                    Divine Classrooms
                  </span>

                  <button
                    onClick={() => {
                      setActiveSection("home");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "home"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Home className="w-4 h-4 shrink-0 text-yellow-400" />
                    <span>3D Dashboard Hub</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("quran");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "quran"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Scroll className="w-4 h-4 shrink-0 text-yellow-300" />
                    <span>Noble Quran</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("hadith");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "hadith"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0 text-[#6EE7B7]" />
                    <span>Hadith Books</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("library");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "library"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <BookImage className="w-4 h-4 shrink-0" />
                    <span>Islamic Books Library</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("azkar");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "azkar"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Sun className="w-4 h-4 shrink-0 text-amber-300 animate-spin-slow" />
                    <span>Morning & Evening Adhkar</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("guidance");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border relative ${
                      activeSection === "guidance"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Compass className="w-4 h-4 shrink-0 text-yellow-300" />
                    <span>Prophetic Suite (Sunnah)</span>
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("prayers");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "prayers"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Clock className="w-4 h-4 shrink-0 text-sky-300" />
                    <span>Salah Times Desk</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("qibla");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "qibla"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Compass className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Qibla 3D Compass</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("zakat_ushr");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "zakat_ushr"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Coins className="w-4 h-4 shrink-0 text-yellow-400" />
                    <span>Zakat & Ushr Calculator</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("kalimas");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "kalimas"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0 text-yellow-300" />
                    <span>6 Kalimas & Denominations</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("ibadat");
                      setActiveIbadatTopic(null);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "ibadat"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <Feather className="w-4 h-4 shrink-0 text-emerald-300" />
                    <span>Ibadat & Guidance</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("resources");
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3.5 text-xs sm:text-sm font-bold rounded-2xl transition-all border ${
                      activeSection === "resources"
                        ? "bg-gradient-to-r from-yellow-300 to-islamic-gold text-slate-900 border-amber-600 shadow-md font-extrabold"
                        : "text-white/90 hover:bg-white/5 border-white/5"
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0 text-sky-305" />
                    <span>Educational Resources</span>
                  </button>

                </div>

                {/* Other Actions Group */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <span className="block text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-widest font-mono">
                    System Settings
                  </span>

                  {/* Language Selector Dropdown inside Drawer */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-slate-350 font-bold uppercase tracking-wider">
                      Interface Translation Language
                    </label>
                    <div className="flex items-center gap-2.5 bg-black/30 px-3.5 py-3 rounded-xl border border-white/10 shadow-inner">
                      <Globe className="w-4 h-4 text-islamic-gold shrink-0" />
                      <select
                        value={languageCode}
                        onChange={(e) => setLanguageCode(e.target.value)}
                        className="bg-transparent text-white font-bold text-xs select-none w-full focus:outline-none cursor-pointer"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code} className="text-slate-900 font-semibold bg-white">
                            {lang.name} — {lang.nativeName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Report Translation Error inside Drawer */}
                  <button
                    onClick={() => {
                      setGlobalReportOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex justify-center items-center gap-2 w-full bg-red-950/80 hover:bg-red-900/95 border border-red-500/30 py-3 rounded-xl text-xs font-bold text-red-100 transition-all shadow-md cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-islamic-gold fill-islamic-gold/10" />
                    <span>Report Translation Error</span>
                  </button>
                </div>

              </div>

              {/* Drawer Footer Status line */}
              <div className="p-6 border-t border-white/10 bg-black/30 text-center text-[10px] text-slate-400 font-mono space-y-1">
                <p>Muslimify Portal — Verified Divine Registry</p>
                <p className="text-[9px] text-[#D4AF37]">Premium Craftsmanship by Abdul Wahab</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
