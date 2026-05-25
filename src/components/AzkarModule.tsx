import React, { useState } from "react";
import { getExpandedAzkar } from "../data/azkarData";
import { Sparkles, Check, CheckSquare, RotateCcw, Volume2, Shield, Info, Download } from "lucide-react";

interface AzkarModuleProps {
  languageCode: string;
}

export default function AzkarModule({ languageCode }: AzkarModuleProps) {
  const azkarList = getExpandedAzkar(languageCode);
  const [selectedCategory, setSelectedCategory] = useState<"Morning" | "Evening">("Morning");

  // Track the current counts for each Azkar
  const [userCounts, setUserCounts] = useState<Record<string, number>>({});
  const filteredAzkar = azkarList.filter((item) => item.category === selectedCategory);

  const handleIncrement = (id: string, max: number) => {
    const current = userCounts[id] || 0;
    if (current < max) {
      setUserCounts((prev) => ({
        ...prev,
        [id]: current + 1
      }));
      
      // Play a quick subtle mechanical system tick if desired
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch tick
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05); // Very brief click
      } catch (e) {
        // Safe to ignore if blocked by browser autoplay rules
      }
    }
  };

  const handleReset = (id: string) => {
    setUserCounts((prev) => ({
      ...prev,
      [id]: 0
    }));
  };

  const handleResetAll = () => {
    setUserCounts({});
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is currently not supported in your browser.");
    }
  };

  // Simulated High-Quality Print PDF download action
  const triggerPdfDownload = () => {
    const azkarText = filteredAzkar.map(a => `${a.arabicText}\nTranslation: ${a.translations[languageCode] || ""}`).join("\n\n");
    const blob = new Blob([`=========================================\nMUSLIMIFY - AUTHENTIC MORNING & EVENING AZKAR\n${selectedCategory.toUpperCase()} SUPPLICATONS\n=========================================\n\n${azkarText}\n\nBuilt by Abdul Wahab | JazakAllah Khair.`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Muslimify_${selectedCategory}_Azkar_${languageCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-islamic-green tracking-tight font-amiri md:text-4xl text-center md:text-left">
            Daily Azkar & Adhkar (الأذكار)
          </h2>
          <p className="text-sm text-slate-600">
            Gain spiritual protection and tranquility with authentic Morning and Evening supplications.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            onClick={triggerPdfDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-islamic-gold" />
            Download PDF / Text Booklet
          </button>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-red-50 text-red-600 border border-red-100 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Counters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl w-full max-w-sm mx-auto md:mx-0 border border-slate-200">
        {(["Morning", "Evening"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${
              selectedCategory === cat
                ? "bg-islamic-green text-white shadow-md"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {cat} Remembrance
          </button>
        ))}
      </div>

      {/* Grid of Supplications */}
      <div className="space-y-4">
        {filteredAzkar.map((item) => {
          const currentCount = userCounts[item.id] || 0;
          const isCompleted = currentCount >= item.count;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all ${
                isCompleted
                  ? "bg-emerald-50/40 border-emerald-200 shadow-xs"
                  : "bg-white border-islamic-green/10 hover:border-islamic-green/20 shadow-md"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  {/* Arabic Text (Large Amiri font with direction rtl) */}
                  <div className="space-y-2">
                    <p className="text-right text-2xl font-bold leading-loose text-slate-800 font-amiri" dir="rtl">
                      {item.arabicText}
                    </p>
                    <div className="flex justify-end gap-2 pr-2">
                      <button
                        onClick={() => speakText(item.arabicText)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-islamic-green bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100"
                        title="Listen to recitation"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-islamic-gold" />
                        Listen Recitation
                      </button>
                    </div>
                  </div>

                  {/* Translation (Side by side or directly) */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="inline-block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Translation & Meaning
                    </span>
                    <p className="text-dark bg-slate-50 p-4 rounded-xl leading-relaxed text-sm">
                      {item.translations[languageCode] || item.translations["en"]}
                    </p>
                  </div>

                  {/* Virtue / Benefit */}
                  {item.benefits[languageCode] && (
                    <div className="flex items-start gap-2 text-xs bg-amber-50/50 text-amber-800 p-3 rounded-xl border border-amber-100">
                      <Shield className="w-4 h-4 text-islamic-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Virtue:</span> {item.benefits[languageCode]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Counter Control Panel */}
                <div className="flex flex-row md:flex-col items-center gap-4 shrink-0 justify-between md:justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-center md:space-y-1">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Target Frequency
                    </span>
                    <span className="text-xl font-bold text-slate-800">
                      {currentCount} / <span className="text-islamic-green font-extrabold">{item.count}</span>
                    </span>
                  </div>

                  {/* Tick Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIncrement(item.id, item.count)}
                      disabled={isCompleted}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-md active:scale-90 ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-none cursor-default"
                          : "bg-islamic-green hover:bg-islamic-green-hover text-white cursor-pointer"
                      }`}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : <CheckSquare className="w-5 h-5 text-islamic-gold" />}
                    </button>
                    
                    {currentCount > 0 && (
                      <button
                        onClick={() => handleReset(item.id)}
                        className="w-12 h-12 bg-white text-slate-400 hover:text-slate-600 border border-slate-200 rounded-full flex items-center justify-center transition-all shadow-xs"
                        title="Reset counter"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-emerald-800 to-islamic-green text-emerald-100 rounded-2xl shadow-md">
        <Info className="w-6 h-6 text-islamic-gold shrink-0" />
        <div className="space-y-1">
          <h5 className="font-semibold text-white">When should I recite morning & evening Remembrances?</h5>
          <p className="text-xs leading-relaxed text-emerald-200/90">
            For morning supplications: standard practice is between Dawn (Fajr) and Sunrise. 
            For evening supplications: standard practice is between Afternoon (Asr) and Sunset (Maghrib).
          </p>
        </div>
      </div>
    </div>
  );
}
