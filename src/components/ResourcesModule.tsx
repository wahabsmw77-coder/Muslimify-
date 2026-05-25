import React, { useState } from "react";
import { ArrowLeft, Search, Sparkles, Star, BookOpen, Heart, Info } from "lucide-react";
import { RESOURCES_DATA } from "../data/resourcesData";
import { NAMES_OF_ALLAH, NAMES_OF_PROPHET, BeautifulName } from "../data/ninetyNineNames";

interface ResourcesModuleProps {
  languageCode: string;
}

export default function ResourcesModule({ languageCode }: ResourcesModuleProps) {
  const lang = (languageCode === "ur" ? "ur" : "en") as "en" | "ur";
  const data = RESOURCES_DATA;
  const [activeResource, setActiveResource] = useState<keyof typeof data | null>(null);

  // States for the beautiful names module
  const [namesSubTab, setNamesSubTab] = useState<"allah" | "prophet">("allah");
  const [namesSearch, setNamesSearch] = useState<string>("");
  const [selectedNameDetail, setSelectedNameDetail] = useState<BeautifulName | null>(null);

  if (activeResource) {
    if (activeResource === "names") {
      const activeList = namesSubTab === "allah" ? NAMES_OF_ALLAH : NAMES_OF_PROPHET;
      const filteredNames = activeList.filter(item => 
        item.transliteration.toLowerCase().includes(namesSearch.toLowerCase()) ||
        item.arabic.includes(namesSearch) ||
        item.meaningEn.toLowerCase().includes(namesSearch.toLowerCase()) ||
        item.meaningUr.includes(namesSearch)
      );

      return (
        <div className="space-y-8 animate-fade-in select-text">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-950 p-6 rounded-[24px] border border-slate-200/40 dark:border-white/5 shadow-xs">
            <div className="space-y-1">
              <button
                onClick={() => { setActiveResource(null); setSelectedNameDetail(null); }}
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline mb-2 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4 animate-pulse" />
                <span>{lang === "ur" ? "وسائل کی فہرست پر واپس جائیں" : "Back to Resources"}</span>
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
                <span>{lang === "ur" ? "اللہ تعالیٰ اور نبی کریمؐ کے مبارک نام" : "Beautiful Names & Attributes"}</span>
                <Sparkles className="w-5 h-5 text-islamic-gold fill-islamic-gold/20 animate-spin-slow" />
              </h2>
              <p className="text-xs text-slate-500 max-w-xl">
                {lang === "ur" ? "اسماء الحسنیٰ اور اسماء النبیؐ کے روحانی بھید اور ترجمے" : "Explore the sacred 99 names of Allah Almighty and the noble title attributes of Prophet Muhammad ﷺ."}
              </p>
            </div>

            {/* Catalog search bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder={lang === "ur" ? "تلاش کریں (مثال: الرحمن، Rahim)..." : "Search Names & Meanings..."}
                value={namesSearch}
                onChange={(e) => setNamesSearch(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Tab selectors for Allah vs Prophet Muhammad (PBUH) */}
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl w-full max-w-2xl mx-auto border border-slate-200/50 dark:border-white/5 shadow-inner">
            <button
              onClick={() => { setNamesSubTab("allah"); setSelectedNameDetail(null); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                namesSubTab === "allah"
                  ? "bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-md transform scale-102"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Star className="w-4 h-4 text-islamic-gold fill-islamic-gold/20" />
              <span>{lang === "ur" ? "اللہ تعالیٰ کے ۹۹ نام (اسماء الحسنیٰ)" : "99 Beautiful Names of Allah"}</span>
            </button>
            <button
              onClick={() => { setNamesSubTab("prophet"); setSelectedNameDetail(null); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                namesSubTab === "prophet"
                  ? "bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-md transform scale-102"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
              <span>{lang === "ur" ? "رسول اللہ ﷺ کے ۹۹ نام (اسماء النبیؐ)" : "99 Names of Prophet Muhammad ﷺ"}</span>
            </button>
          </div>

          {/* Interactive Names Grid (Gilded Classic Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredNames.map((item) => {
              const isSelected = selectedNameDetail?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedNameDetail(isSelected ? null : item)}
                  className={`group relative p-6 bg-white dark:bg-slate-950 rounded-3xl border transition-all duration-300 transform cursor-pointer select-none flex flex-col justify-between min-h-[160px] ${
                    isSelected 
                      ? "ring-2 ring-emerald-500/80 shadow-xl border-emerald-500/50 -translate-y-1.5" 
                      : "border-slate-200/50 dark:border-white/5 hover:border-emerald-500/30 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {/* Serial badge */}
                  <div className="absolute top-4 left-4 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                    #{String(item.id).padStart(2, '0')}
                  </div>

                  {/* Inner Content Grid */}
                  <div className="flex justify-between items-start gap-4">
                    {/* Arabic scripture in circular gilded emblem */}
                    <div className="shrink-0 w-12 h-12 rounded-full border border-islamic-gold/40 flex items-center justify-center bg-slate-55 dark:bg-slate-900 group-hover:scale-110 transition-transform">
                      <span className="text-xl font-bold font-amiri text-emerald-800 dark:text-emerald-300 leading-none">
                        {item.arabic}
                      </span>
                    </div>

                    {/* Transliteration & English spelling */}
                    <div className="text-right min-w-0">
                      <h4 className="font-extrabold text-[#0d4e35] dark:text-emerald-400 text-base tracking-tight font-display">
                        {item.transliteration}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                        {namesSubTab === "allah" ? "Divine Attribute" : "Noble Title"}
                      </p>
                    </div>
                  </div>

                  {/* Translations & Meanings */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 space-y-1 text-xs">
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      <strong className="text-emerald-700 dark:text-emerald-400">EN:</strong> {item.meaningEn}
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium font-amiri text-right text-sm leading-normal">
                      <strong className="text-emerald-700 dark:text-emerald-400 font-sans text-xs">UR:</strong> {item.meaningUr}
                    </p>
                  </div>

                  {/* Expanded Detailed view block directly inline */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-dashed border-emerald-500/20 bg-emerald-500/5 -mx-6 -mb-6 p-4 rounded-b-3xl text-xs text-slate-550 dark:text-slate-300 animate-slide-in-up space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Sacred Application & Spiritual Merit</span>
                      </div>
                      <p className="leading-relaxed font-sans">
                        {namesSubTab === "allah" 
                          ? `Reciting 'Ya ${item.transliteration}' abundantly cultivates spiritual sakinah (peace), attracts divine barakah, and helps align the soul with the pure attribute of ${item.meaningEn}.`
                          : `Stating and meditating on the noble crown name '${item.transliteration}' builds intense cosmic love and sends spiritual salutations to our Holy Guide Muhammad (ﷺ), who is indeed ${item.meaningEn}.`
                        }
                      </p>
                      <p className="leading-relaxed font-amiri text-right text-[13px] text-slate-600 dark:text-slate-400 leading-loose" dir="rtl">
                        {namesSubTab === "allah"
                          ? `روزانہ کثرت سے "یا ${item.arabic}" کا ورد کرنا قلبی سکون، روحانی بلندی اور صفاتی الہی خصوصیات سے برکات کے حصول کا بہترین ذریعہ ہے۔`
                          : `رسول کریم صلی اللہ علیہ وسلم کے اسمِ گرامی "${item.arabic}" پر درود و سلام بھیجنا اور ان کے اوصافِ حمیدہ پر عمل کرنا دونوں جہانوں کی سرخروئی کی چابی ہے۔`
                        }
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredNames.length === 0 && (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/40 dark:border-white/5 font-mono text-xs shadow-xs">
              {lang === "ur" ? "کوئی نام تلاش کے معیار پر پورا نہیں اترا۔ دوبارہ کوشش کریں۔" : "No matching names found. Please check your query."}
            </div>
          )}
        </div>
      );
    }

    const resource = data[activeResource][lang];
    return (
      <div className="space-y-6 animate-fade-in">
        <button
          onClick={() => setActiveResource(null)}
          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "ur" ? "واپس" : "Back"}
        </button>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-display">{resource.title}</h2>
        <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-200/40 dark:border-white/5">
          <p className="whitespace-pre-wrap leading-relaxed">{resource.content}</p>
          {(resource as any).list && (
            <div className="mt-6 space-y-3">
              {(resource as any).list.map((item: { name: string, meaning: string }, idx: number) => (
                <div key={idx} className="border-b dark:border-white/5 last:border-0 pb-2 flex justify-between items-center text-slate-800 dark:text-slate-200">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.name}:</span>
                  <span>{item.meaning}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-display">
        {lang === 'ur' ? 'اسلامی وسائل' : 'Islamic Resources'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(data) as Array<keyof typeof data>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveResource(key)}
            className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-left hover:border-islamic-green/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-3">{data[key][lang].title}</h3>
            <p>{data[key][lang].desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
