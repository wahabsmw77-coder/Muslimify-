import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, BarChart3, PieChart, Play, Pause, Volume2, Sparkles, Calendar } from "lucide-react";
import { IBADAT_DATA } from "../data/ibadatData";
import { getT } from "../translations";

interface IbadatModuleProps {
  languageCode: string;
  activeTopic: string | null;
  setActiveTopic: (topic: string | null) => void;
}

// Robust Gregorian to Hijri converter
function getHijriDate(date: Date) {
  let jd = 0;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  if (month < 3) {
    year -= 1;
    month += 12;
  }
  
  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  jd = c + day + e + f - 1524.5;
  
  const epoch = 1948439.5;
  const h_jd = jd - epoch;
  const cyc = Math.floor(h_jd / 10631);
  const rem = h_jd % 10631;
  const h_y_rem = Math.floor(rem / 354.366);
  let h_y = cyc * 30 + h_y_rem;
  let h_jd_calc = Math.floor(h_y_rem * 354.366) + cyc * 10631;
  
  let h_d = Math.floor(h_jd - h_jd_calc);
  if (h_d < 1) {
    h_y -= 1;
    const prev_h_y_rem = rem - 354.366;
    h_jd_calc = Math.floor(prev_h_y_rem);
    h_d = Math.floor(h_jd - h_jd_calc);
  }
  
  const islamicMonthsEn = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];
  
  const islamicMonthsUr = [
    "محرم الحرام", "صفر المظفر", "ربیع الاول", "ربیع الثانی",
    "جمادی الاول", "جمادی الثانی", "رجب المرجب", "شعبان المعظم",
    "رمضان المبارک", "شوال المکرم", "ذوالقعدہ", "ذوالحجہ"
  ];
  
  const daysInIslamicMonths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  let d_rem = h_d;
  let m_idx = 0;
  
  for (let i = 0; i < 12; i++) {
    const term = daysInIslamicMonths[i];
    if (d_rem <= term) {
      m_idx = i;
      break;
    }
    d_rem -= term;
    m_idx = i;
  }
  
  const toUrduDigits = (num: number) => {
    const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().split("").map(d => urduDigits[parseInt(d)] || d).join("");
  };

  return {
    day: d_rem === 0 ? 1 : d_rem,
    dayUr: toUrduDigits(d_rem === 0 ? 1 : d_rem),
    monthEn: islamicMonthsEn[m_idx],
    monthUr: islamicMonthsUr[m_idx],
    year: h_y,
    yearUr: toUrduDigits(h_y)
  };
}

export default function IbadatModule({ languageCode, activeTopic, setActiveTopic }: IbadatModuleProps) {
  const lang = (languageCode === "ur" ? "ur" : "en") as "en" | "ur";
  const t = getT(languageCode);
  const prayersArr = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const [prayerHistory, setPrayerHistory] = useState<Record<string, Record<string, boolean>>>({});
  
  const today = new Date().toISOString().split("T")[0];

  // Salah Sect Audio Ref & state
  const [activeStepAudio, setActiveStepAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeSectTab, setActiveSectTab] = useState<"hanafi" | "shafii" | "shia">("hanafi");

  useEffect(() => {
    const saved = localStorage.getItem("muslimify_salah_history");
    if (saved) {
      setPrayerHistory(JSON.parse(saved));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Hash-routing is fully managed at the parent level in App.tsx

  const togglePrayer = (prayer: string) => {
    const todayStatus = prayerHistory[today] || {};
    const newStatus = { ...todayStatus, [prayer]: !todayStatus[prayer] };
    const newHistory = { ...prayerHistory, [today]: newStatus };
    setPrayerHistory(newHistory);
    localStorage.setItem("muslimify_salah_history", JSON.stringify(newHistory));
  };

  const playSalahAudio = (url: string, id: string) => {
    if (activeStepAudio === id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setActiveStepAudio(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setActiveStepAudio(id);
    audioRef.current = new Audio(url);
    audioRef.current.play()
      .then(() => {
        if (audioRef.current) {
          audioRef.current.onended = () => {
            setActiveStepAudio(null);
          };
        }
      })
      .catch(err => {
        console.warn("Audio play blocked or failed:", err);
        setActiveStepAudio(null);
      });
  };

  const calculateStats = (days: number) => {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayStatus = prayerHistory[dateStr] || {};
      const completed = Object.values(dayStatus).filter(Boolean).length;
      data.push({
        name: d.toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'short' }),
        completed,
      });
    }
    return data;
  };

  const renderReports = () => {
    const data = calculateStats(7);
    const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
    const maxCompletedPossible = data.length * 5;
    const completenessPercent = maxCompletedPossible > 0 ? Math.round((totalCompleted / maxCompletedPossible) * 100) : 0;

    return (
      <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <span className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-lg inline-flex">
                <BarChart3 className="w-5 h-5" />
              </span>
              {t.weeklyReport}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium pb-2">
              {lang === 'ur'
                ? "پچھلے 7 دنوں کے دوران اپنے نماز کے ریکارڈز کا جائزہ لیں۔"
                : "Analyze your prayer performance records for the past 7 days."}
            </p>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/10 px-4 py-2.5 rounded-2xl text-left shrink-0">
            <span className="block text-[8px] sm:text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold tracking-widest uppercase">
              {lang === 'ur' ? 'مجموعی کارکردگی' : 'TOTAL COMPLETENESS'}
            </span>
            <p className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-200">
              {totalCompleted} / {maxCompletedPossible}{" "}
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
                ({completenessPercent}%)
              </span>
            </p>
          </div>
        </div>

        {/* Custom Responsive & Animated Bar Chart Grid */}
        <div className="pt-8 pb-4">
          <div className="flex items-end justify-between h-48 gap-3 sm:gap-5 px-3 sm:px-6 border-b border-slate-100 dark:border-white/5 relative">
            {/* Background horizontal lines to mimic Recharts grids */}
            {[0, 1, 2, 3, 4, 5].map((y) => (
              <div 
                key={y} 
                className="absolute left-0 right-0 border-t border-slate-100 dark:border-white/5 pointer-events-none"
                style={{ bottom: `${(y / 5) * 100}%` }}
              >
                <span className="absolute left-0 -translate-y-1/2 text-[8px] font-mono text-slate-400 dark:text-slate-500 pr-1.5">
                  {y}
                </span>
              </div>
            ))}

            {/* Render Bars */}
            {data.map((item, idx) => {
              const heightPercent = (item.completed / 5) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full relative group z-10">
                  {/* Floating Tooltip design */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-1 rounded-lg pointer-events-none shadow-md z-30 whitespace-nowrap">
                    {item.completed} / 5 {lang === 'ur' ? 'نمازیں' : 'Prayers'}
                  </div>

                  {/* Columns */}
                  <div className="w-full max-w-[24px] sm:max-w-[40px] h-full flex items-end">
                    <div 
                      className={`w-full rounded-t-md relative transition-all duration-300 ${
                        item.completed === 5 
                          ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_4px_10px_rgba(16,185,129,0.15)]"
                          : item.completed > 0
                          ? "bg-gradient-to-t from-teal-700 to-teal-500"
                          : "bg-slate-100 dark:bg-slate-800/40"
                      }`}
                      style={{ height: item.completed > 0 ? `${heightPercent}%` : "8px" }}
                    >
                      {item.completed > 0 && (
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-white/20 rounded-t-md"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekday Labels under Bars */}
          <div className="flex justify-between px-3 sm:px-6 mt-3">
            {data.map((item, idx) => (
              <span key={idx} className="flex-1 text-center text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Divine Wisdom banner explaining Salah consistency */}
        <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-2xl border border-emerald-500/10 flex items-start gap-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/45 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-base shrink-0 self-center">
            ۞
          </div>
          <div className="space-y-0.5">
            <h5 className="text-[11px] font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
              {lang === 'ur' ? 'حدیث نبوی کی حکمت' : 'Prophetic Reminder of Consistency'}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">
              {lang === 'ur'
                ? "رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'اللہ کے نزدیک سب سے پسندیدہ عمل وہ ہے جو مستقل مزاجی کے ساتھ کیا جائے، اگرچہ وہ تھوڑا ہی کیوں نہ ہو۔' (صحیح البخاری)"
                : "The Messenger of Allah (ﷺ) said: 'The most beloved deeds to Allah are those done consistently, even if they are small.' (Sahih al-Bukhari). Continuous devotion is full of peace."}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTopic = () => {
    switch (activeTopic) {
      case "reports":
        return renderReports();
      case "salah": {
        const hijri = getHijriDate(new Date());
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Elegant Baked-In Date Dashboard Widget */}
            <div className="bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border border-emerald-500/10 dark:border-white/5 shadow-xs rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 transition hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-inner shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">
                    {lang === 'ur' ? 'آج کی تاریخ (گریگورین)' : 'CURRENT GREGORIAN DATE'}
                  </span>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100 font-sans">
                    {new Date().toLocaleDateString(languageCode === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Hijri Date Display */}
              <div className="w-full md:w-auto p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10 rounded-2xl border border-emerald-500/10 flex items-center justify-between md:justify-end gap-6 shrink-0 shadow-xs">
                <div className="text-left md:text-right">
                  <span className="block text-[8px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest md:text-right">
                    {lang === 'ur' ? 'اسلامی ہجری تاریخ' : 'DECREED HIJRI DATE'}
                  </span>
                  <p className="text-sm font-black text-emerald-800 dark:text-emerald-200 font-sans mt-0.5">
                    {lang === 'ur' 
                      ? `${hijri.dayUr} ${hijri.monthUr} ${hijri.yearUr} ھ` 
                      : `${hijri.day} ${hijri.monthEn} ${hijri.year} AH`}
                  </p>
                </div>
                <div className="w-7 h-7 bg-white dark:bg-slate-950 border border-emerald-500/15 text-emerald-600 rounded-full flex items-center justify-center font-semibold text-xs shadow-xs shrink-0 self-center">
                  ۞
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-900 to-green-950 p-6 rounded-3xl text-white shadow-xl space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6 pointer-events-none">
                <Sparkles className="w-64 h-64 text-white" />
              </div>
              <span className="bg-emerald-800 text-islamic-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-700/60 inline-block">
                {lang === 'ur' ? 'تقابلی فقہ گائیڈ' : 'Comparative Fiqh Guide'}
              </span>
              <h3 className="text-3xl font-extrabold font-amiri text-islamic-gold">
                {IBADAT_DATA.salahInfo.title[lang]}
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-2xl leading-relaxed">
                {lang === 'ur' 
                  ? 'مختلف فقہی مدارس (احناف، شافعیہ، اور اہل تشیع) کے مطابق نماز کی مرحلہ وار ادائیگی، دعائیں اور مسنون طریقے آڈیو تلاوت کی مدد سے سیکھیں۔' 
                  : 'Learn step-by-step prayer methods, posture variances, and Arabic Duas across different Fiqh schools (Hanafi, Shafi\'i, Shia) with streamable audio recitations.'}
              </p>
            </div>

            {/* SECT TABS SELECTOR */}
            <div className="flex flex-wrap gap-2.5 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/50">
              {(Object.entries(IBADAT_DATA.salahInfo.sects) as Array<[ "hanafi" | "shafii" | "shia", any ]>).map(([key, sect]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSectTab(key);
                    if (audioRef.current) {
                      audioRef.current.pause();
                    }
                    setActiveStepAudio(null);
                  }}
                  className={`flex-1 min-w-[120px] py-3.5 px-4 font-bold text-center text-xs sm:text-sm rounded-xl transition-all capitalize shadow-inner ${
                    activeSectTab === key
                      ? "bg-islamic-green text-white font-extrabold shadow-md transform scale-102"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-slate-800"
                  }`}
                >
                  {sect.title[lang]}
                </button>
              ))}
            </div>

            {/* SEGMENT CONTENTS */}
            <div className="w-full space-y-6">
              <div className="p-5 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-900 space-y-2.5">
                <div className="flex items-center gap-2 text-islamic-green">
                  <span className="w-2 h-2 rounded-full bg-islamic-gold animate-ping"></span>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                    {IBADAT_DATA.salahInfo.sects[activeSectTab].title[lang]}
                  </h4>
                </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {IBADAT_DATA.salahInfo.sects[activeSectTab].desc[lang]}
                  </p>
                </div>

                <div className="space-y-4">
                  {IBADAT_DATA.salahInfo.sects[activeSectTab].steps.map((step: any, i: number) => {
                    const stepId = `${activeSectTab}_step_${i}`;
                    const isPlaying = activeStepAudio === stepId;
                    return (
                      <div 
                        key={i} 
                        className={`p-6 bg-white dark:bg-slate-900 rounded-3xl border transition-all ${
                          isPlaying 
                            ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/20" 
                            : "border-slate-100 dark:border-slate-900/50 shadow-xs hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black">
                              {i + 1}
                            </span>
                            <h5 className="font-bold text-base text-slate-900 dark:text-slate-200">
                              {step.name[lang]}
                            </h5>
                          </div>

                          {step.audio && (
                            <button
                              onClick={() => playSalahAudio(step.audio, stepId)}
                              className={`p-3 rounded-2xl transition-all cursor-pointer ${
                                isPlaying 
                                  ? "bg-rose-500 text-white animate-pulse" 
                                  : "bg-emerald-50 dark:bg-emerald-950 text-islamic-green hover:bg-emerald-100 dark:hover:bg-emerald-900"
                              }`}
                              title={isPlaying ? "Pause Recitation" : "Listen Recitation"}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                          {step.desc[lang]}
                        </p>

                        <div className="mt-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100/30">
                          <p className="font-amiri text-right text-xl text-emerald-900 dark:text-emerald-200 mb-2 leading-loose" dir="rtl">
                            {step.dua.ar}
                          </p>
                          <div className="border-t border-emerald-100/40 pt-2.5 mt-2.5 space-y-1 text-slate-700 dark:text-slate-300">
                            <em className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 not-italic">
                              {lang === 'ur' ? 'ترجمہ' : 'Translation'}
                            </em>
                            <p className="text-xs leading-relaxed font-sans font-medium">
                              {step.dua[lang]}
                            </p>
                          </div>
                        </div>

                        {isPlaying && (
                          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                            <span>PLAYING STREAM FROM CDN RECITER SOURCE</span>
                            <span className="flex gap-0.5 items-end h-3">
                              <span className="w-0.5 h-1.5 bg-emerald-500 animate-[pulse_0.4s_infinite]"></span>
                              <span className="w-0.5 h-3 bg-emerald-500 animate-[pulse_0.6s_infinite]"></span>
                              <span className="w-0.5 h-2 bg-emerald-500 animate-[pulse_0.5s_infinite]"></span>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
      }
      case "fasting":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-islamic-green">{IBADAT_DATA.fasting.title[lang]}</h3>
            <div className="p-4 bg-slate-50 rounded-xl space-y-4">
              <h4 className="font-semibold">{lang === 'ur' ? 'سحری کی دعا' : 'Suhoor Dua'}</h4>
              <p className="font-amiri text-xl text-right" dir="rtl">{IBADAT_DATA.fasting.suhoorDua.ar}</p>
              <p className="text-sm text-slate-600">{IBADAT_DATA.fasting.suhoorDua[lang]}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl space-y-4">
              <h4 className="font-semibold">{lang === 'ur' ? 'افطار کی دعا' : 'Iftar Dua'}</h4>
              <p className="font-amiri text-xl text-right" dir="rtl">{IBADAT_DATA.fasting.iftarDua.ar}</p>
              <p className="text-sm text-slate-600">{IBADAT_DATA.fasting.iftarDua[lang]}</p>
            </div>
          </div>
        );
      case "hajj":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-islamic-green">{IBADAT_DATA.hajjUmrah.title[lang]}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <h4 className="font-semibold">{lang === 'ur' ? 'عمرہ کے مراحل' : 'Umrah Steps'}</h4>
                <ul className="list-decimal pl-5 text-sm space-y-1">
                  {IBADAT_DATA.hajjUmrah.umrahSteps[lang].map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <h4 className="font-semibold">{lang === 'ur' ? 'حج کے مراحل' : 'Hajj Steps'}</h4>
                <ul className="list-decimal pl-5 text-sm space-y-1">
                  {IBADAT_DATA.hajjUmrah.hajjSteps[lang].map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );
      case "janazah":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-islamic-green">{IBADAT_DATA.janazah.title[lang]}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <h4 className="font-semibold">{lang === 'ur' ? 'سنی (حنفی) طریقہ' : 'Sunni (Hanafi) Method'}</h4>
                <div className="space-y-3">
                  {IBADAT_DATA.janazah.steps.hani.map((item, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <p className="font-semibold text-sm">{item.step[lang]}</p>
                        {item.dua && (
                            <div className="mt-2 text-sm text-slate-800">
                                <p className="font-amiri text-right text-lg mb-1" dir="rtl">{item.dua.ar}</p>
                                <p className="text-slate-600">{item.dua[lang]}</p>
                            </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <h4 className="font-semibold">{lang === 'ur' ? 'شیعہ طریقہ' : 'Shia Method'}</h4>
                <div className="space-y-3">
                  {IBADAT_DATA.janazah.steps.shia.map((item, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <p className="font-semibold text-sm">{item.step[lang]}</p>
                        {item.dua && (
                            <div className="mt-2 text-sm text-slate-800">
                                <p className="font-amiri text-right text-lg mb-1" dir="rtl">{item.dua.ar}</p>
                                <p className="text-slate-600">{item.dua[lang]}</p>
                            </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => setActiveTopic("fasting")} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-left hover:bg-slate-50">
              <h3 className="text-xl font-semibold mb-3">{IBADAT_DATA.fasting.title[lang]}</h3>
              <p className="text-sm text-slate-600">{lang === 'ur' ? 'روزہ کے قواعد، نیت اور دعائیں' : 'Rules, Intentions, and Duas.'}</p>
            </button>
            <button onClick={() => setActiveTopic("hajj")} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-left hover:bg-slate-50">
              <h3 className="text-xl font-semibold mb-3">{IBADAT_DATA.hajjUmrah.title[lang]}</h3>
              <p className="text-sm text-slate-600">{lang === 'ur' ? 'مرحلہ وار گائیڈز' : 'Step-by-step guides.'}</p>
            </button>
            <button onClick={() => setActiveTopic("janazah")} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-left hover:bg-slate-50">
              <h3 className="text-xl font-semibold mb-3">{IBADAT_DATA.janazah.title[lang]}</h3>
              <p className="text-sm text-slate-600">{lang === 'ur' ? 'مختلف مسالک کے طریقے' : 'Methods for different sects.'}</p>
            </button>
            <button onClick={() => setActiveTopic("salah")} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-left hover:bg-slate-50">
              <h3 className="text-xl font-semibold mb-3">{IBADAT_DATA.salahInfo.title[lang]}</h3>
              <p className="text-sm text-slate-600">{lang === 'ur' ? 'مختلف مسالک کے مطابق نماز کا طریقہ' : 'Prayer methods according to different sects.'}</p>
            </button>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{t.salahTracker}</h3>
                <button onClick={() => setActiveTopic("reports")} className="p-2 text-islamic-green hover:bg-emerald-50 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
                <div className="space-y-2">
                {[
                    {en: 'Fajr', key: 'Fajr'},
                    {en: 'Dhuhr', key: 'Dhuhr'},
                    {en: 'Asr', key: 'Asr'},
                    {en: 'Maghrib', key: 'Maghrib'},
                    {en: 'Isha', key: 'Isha'}
                ].map((prayer) => (
                    <label key={prayer.en} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={!!(prayerHistory[today] && prayerHistory[today][prayer.key])}
                            onChange={() => togglePrayer(prayer.key)}
                            className="h-5 w-5 text-islamic-green focus:ring-islamic-green border-gray-300 rounded"
                        />
                        <span className="text-slate-700">{t[prayer.key.toLowerCase() as keyof typeof t]}</span>
                    </label>
                ))}
            </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {activeTopic && (
        <button onClick={() => setActiveTopic(null)} className="flex items-center gap-2 text-islamic-green hover:underline">
          <ArrowLeft className="w-4 h-4" /> {lang === 'ur' ? 'عبادات پر واپس جائیں' : 'Back to Ibadat'}
        </button>
      )}
      <h2 className="text-3xl font-bold text-islamic-green">{lang === 'ur' ? 'عبادات اور رہنمائی' : 'Ibadat & Guidance'}</h2>
      {renderTopic()}
    </div>
  );
}
