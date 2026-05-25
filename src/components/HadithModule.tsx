import React, { useState, useEffect } from "react";
import { STATIC_HADITHS, HADITH_BOOKS } from "../data/hadithData";
import { Hadith } from "../types";
import { 
  Search, ThumbsUp, ThumbsDown, Download, AlertOctagon, 
  Book, CheckCircle, Info, Sparkles, BookOpen, 
  ChevronRight, Clipboard, FileText, Check, ArrowRight
} from "lucide-react";
import ReportErrorDialog from "./ReportErrorDialog";

interface HadithModuleProps {
  languageCode: string;
}

export default function HadithModule({ languageCode }: HadithModuleProps) {
  // Navigation & Tabs (Forced to Static Browse)
  const [activeTab] = useState<"browse">("browse");

  // Browse Tab States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<string>("All");
  const [selectedSect, setSelectedSect] = useState<string>("All Sects");
  const [hadiths, setHadiths] = useState<Hadith[]>(STATIC_HADITHS);
  const [votedRegistry, setVotedRegistry] = useState<Record<string, "up" | "down">>({});
  
  // Reporting modals
  const [reportOpen, setReportOpen] = useState(false);
  const [reportRef, setReportRef] = useState("");

  useEffect(() => {
    // Load voted registry from local cache
    try {
      const stored = localStorage.getItem("islamify_hadith_votes");
      if (stored) {
        setVotedRegistry(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Storage access not allowed to retrieve votes.", e);
    }
  }, []);

  // Quick Action triggers for classic Muslimify lookups
  const handleQuickLookup = (book: string, num: string) => {
    setSelectedBook(book);
    setSearchQuery(num);
  };

  const handleVote = (id: string, dir: "up" | "down") => {
    const existing = votedRegistry[id];
    if (existing === dir) return; 

    const updatedRegistry = { ...votedRegistry, [id]: dir };
    setVotedRegistry(updatedRegistry);

    try {
      localStorage.setItem("islamify_hadith_votes", JSON.stringify(updatedRegistry));
    } catch (e) {
      console.warn("Storage access not allowed to cache votes.", e);
    }

    setHadiths((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        
        let newUp = h.votesUp;
        let newDown = h.votesDown;

        if (dir === "up") {
          newUp += 1;
          if (existing === "down") newDown -= 1;
        } else {
          newDown += 1;
          if (existing === "up") newUp -= 1;
        }

        return {
          ...h,
          votesUp: newUp,
          votesDown: newDown
        };
      })
    );
  };

  const triggerExportPdf = (hadith: any) => {
    const textBlob = `=========================================\nMUSLIMIFY DIGITAL ARCHIVE - COMPLIANT HADITH EXPORT\n=========================================\nSource Book: ${hadith.book}\nHadith Reference Number: ${hadith.hadithNumber}\nNarrated by: ${hadith.narrator}\nGrading: ${hadith.grading} (${hadith.gradingReason || "Authenticated consensus"})\n\n[Arabic Text]\n${hadith.arabicText}\n\n[Translation (${languageCode.toUpperCase()})]\n${hadith.translations[languageCode] || hadith.translations["en"]}\n\n=========================================\nBuilt securely by Muslimify.`;
    
    const blob = new Blob([textBlob], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Muslimify_Hadith_${hadith.book.replace(/\s+/g, "_")}_${hadith.hadithNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerReport = (hadithBook: string, number: string) => {
    setReportRef(`${hadithBook} (Hadith #${number})`);
    setReportOpen(true);
  };

  const getGradingStyle = (grading: string) => {
    switch (grading?.trim()) {
      case "Sahih":
      case "Muttafaqun Alayh":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Hasan":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Daif":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-50 text-slate-800 border-slate-200";
    }
  };

  // Filter & Search Logic for browse tab
  const filteredHadiths = hadiths.filter((h) => {
    const matchesBook = selectedBook === "All" || h.book === selectedBook;
    const transText = h.translations[languageCode] || h.translations["en"] || "";
    
    const matchesQuery = 
      h.hadithNumber.includes(searchQuery) ||
      h.arabicText.includes(searchQuery) ||
      h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transText.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBook && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner & App Identity similar to Muslimify */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 text-xs text-islamic-green font-bold">
          <Book className="w-4 h-4 text-islamic-gold fill-islamic-gold/10" />
          <span>Integrated Sihah Sitta Portal</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-amiri md:text-4xl">
          Muslimify Hadith Suite
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Verify and search across canonical and authentic compilations including Sahih al-Bukhari, Sahih Muslim, and other consensus compilations with comprehensive grading indicators.
        </p>
        <a 
          href="https://sunnah.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:border-islamic-green hover:text-islamic-green transition-all"
        >
          <Book className="w-4 h-4" />
          <span>Read More at Sunnah.com</span>
        </a>
      </div>

      {/* QUICK SUGGESTIONS CARDS GRID */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-4 rounded-3xl text-white border border-emerald-800/20 shadow-lg space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-islamic-gold animate-pulse"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-islamic-gold">Quick Authentic Reference Cards</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button 
            onClick={() => handleQuickLookup("Sahih al-Bukhari", "1")}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-islamic-gold/40 rounded-xl transition-all text-left text-xs cursor-pointer"
          >
            <p className="font-bold text-white">Bukhari Hadith 1</p>
            <p className="text-[9px] text-slate-300 mt-0.5 line-clamp-1">Actions & Intentions (الاعمال بالنيات)</p>
          </button>
          <button 
            onClick={() => handleQuickLookup("Sahih al-Bukhari", "9")}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-islamic-gold/40 rounded-xl transition-all text-left text-xs cursor-pointer"
          >
            <p className="font-bold text-white">Bukhari Hadith 9</p>
            <p className="text-[9px] text-slate-300 mt-0.5 line-clamp-1">Branches of Belief (الإيمان)</p>
          </button>
          <button 
            onClick={() => handleQuickLookup("Sahih Muslim", "223")}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-islamic-gold/40 rounded-xl transition-all text-left text-xs cursor-pointer"
          >
            <p className="font-bold text-white">Muslim Hadith 223</p>
            <p className="text-[9px] text-slate-300 mt-0.5 line-clamp-1">Purity & Cleanliness (الطهور شطر الايمان)</p>
          </button>
          <button 
            onClick={() => handleQuickLookup("Sunan al-Tirmidhi", "2516")}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-islamic-gold/40 rounded-xl transition-all text-left text-xs cursor-pointer"
          >
            <p className="font-bold text-white">Tirmidhi Hadith 2516</p>
            <p className="text-[9px] text-slate-300 mt-0.5 line-clamp-1">Excellence of Character (حسن الخلق)</p>
          </button>
          <button 
            onClick={() => handleQuickLookup("Muwatta Malik", "1617")}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-islamic-gold/40 rounded-xl transition-all text-left text-xs cursor-pointer"
          >
            <p className="font-bold text-white">Muwatta Hadith 1617</p>
            <p className="text-[9px] text-slate-300 mt-0.5 line-clamp-1">Completing Noble Morals</p>
          </button>
        </div>
      </div>

      {/* ELEGANT SEARCH & FILTERS HEADER */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-5 h-5 text-islamic-green" />
          <h3 className="text-base sm:text-lg font-bold text-slate-850 dark:text-slate-150 font-sans">
            Search & Filter Canonical Records
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
          Apply contextual filters based on historical transmission lines and book compilations, or input keywords to search across narratives.
        </p>
      </div>

      <div className="space-y-6">
          
          {/* Sect filter buttons */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">
              Filter by Sect (Firqah)
            </span>
            <div className="flex flex-wrap gap-2">
              {["All Sects", "Sunni", "Shia", "Ibadi"].map((sect) => (
                <button
                  key={sect}
                  onClick={() => {
                    setSelectedSect(sect);
                    setSelectedBook("All");
                  }}
                  className={`px-4 py-2 text-xs font-bold border rounded-xl transition-all select-none cursor-pointer ${
                    selectedSect === sect
                      ? "bg-islamic-green text-white border-islamic-green shadow-sm active:scale-95"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900"
                  }`}
                >
                  {sect === "All Sects" ? "All Firqah (مذاہب)" : `${sect} Sect`}
                </button>
              ))}
            </div>
          </div>

          {/* Books Selector List */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1 font-sans">
              Select Book Compilation ({selectedSect})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              <button
                onClick={() => setSelectedBook("All")}
                className={`px-3 py-2.5 text-xs font-bold border rounded-xl transition-all select-none cursor-pointer ${
                  selectedBook === "All"
                    ? "bg-islamic-green text-white border-islamic-green shadow-md active:scale-95"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900"
                }`}
              >
                All Selected Books
              </button>
              {HADITH_BOOKS.filter((book) => selectedSect === "All Sects" || book.sect === selectedSect).map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.name)}
                  className={`px-3 py-2.5 text-xs border rounded-xl transition-all flex flex-col items-center justify-center text-center leading-tight select-none cursor-pointer ${
                    selectedBook === book.name
                      ? "bg-islamic-green text-white border-islamic-green shadow-md active:scale-95"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900"
                  }`}
                >
                  <span className="font-bold">{book.name}</span>
                  <span className="text-[9px] opacity-75 mt-1">{book.sect} • {book.total} Hadith</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Input bar */}
          <div className="bg-white p-4 rounded-2xl border border-islamic-green/10 shadow-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search within static narratives by narrator, keyword translation, or reference number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Result Counts banner information */}
          <div className="flex justify-between items-center text-xs text-slate-500 px-2 font-mono">
            <span>Displaying <span className="font-bold text-slate-800">{filteredHadiths.length}</span> verified narratives</span>
            <span>Includes authentic credibility voting indicators</span>
          </div>

          {/* Dynamic Map lists */}
          {filteredHadiths.length > 0 ? (
            <div className="space-y-6">
              {filteredHadiths.map((h) => {
                const upVoted = votedRegistry[h.id] === "up";
                const downVoted = votedRegistry[h.id] === "down";

                return (
                  <div
                    key={h.id}
                    className="bg-white p-6 rounded-2xl border border-islamic-green/10 shadow-md hover:shadow-lg transition-all space-y-4"
                  >
                    {/* Book & reference detail banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-50 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-emerald-50 text-islamic-green rounded-lg">
                          <Book className="w-4 h-4 text-islamic-gold" />
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{h.book}</h4>
                          <p className="text-[10px] text-slate-400 font-mono">Hadith Number: {h.hadithNumber}</p>
                        </div>
                      </div>

                      {/* Grading details */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-xs font-bold border rounded-md uppercase tracking-wider ${getGradingStyle(h.grading)}`}>
                          Grading: {h.grading}
                        </span>
                        {h.grading === "Sahih" && (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>

                    {/* Chapter title context */}
                    {h.chapter && (
                      <div className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-3 py-2 rounded-lg">
                        Chapter Context: {h.chapter}
                      </div>
                    )}

                    {/* Arabic Text rendered beautiful */}
                    <p className="text-right text-2xl font-bold leading-loose text-slate-800 font-amiri tracking-wide py-4" dir="rtl">
                      {h.arabicText}
                    </p>

                    {/* Narrators */}
                    <div className="text-xs font-bold text-slate-700">
                      Narrator Chain: <span className="text-islamic-green">{h.narrator}</span>
                    </div>

                    {/* Current Translation according to lang context */}
                    <div className="space-y-1 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Translation</span>
                      <p className="text-slate-800 text-xs leading-relaxed font-sans">
                        {h.translations[languageCode] || h.translations["en"] || "Translation coming soon"}
                      </p>
                    </div>

                    {/* Authenticity votes section & quick downloads */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
                      
                      <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
                          Credibility:
                        </span>
                        <button
                          onClick={() => handleVote(h.id, "up")}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all select-none ${
                            upVoted
                              ? "bg-emerald-600 text-white"
                              : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title="Verify narrative as Authentic"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{h.votesUp}</span>
                        </button>
                        <button
                          onClick={() => handleVote(h.id, "down")}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all select-none ${
                            downVoted
                              ? "bg-rose-600 text-white"
                              : "text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                          }`}
                          title="Flag narrative layout"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>{h.votesDown}</span>
                        </button>
                      </div>

                      {/* Export / Report button chains */}
                      <div className="flex items-center gap-2 select-none">
                        <button
                          onClick={() => triggerExportPdf(h)}
                          className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl font-bold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-islamic-gold" />
                          Export Text
                        </button>
                        <button
                          onClick={() => triggerReport(h.book, h.hadithNumber)}
                          className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100/50 rounded-xl font-bold transition-colors"
                        >
                          <AlertOctagon className="w-3.5 h-3.5" />
                          Report Error
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 space-y-4">
              <AlertOctagon className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1 text-slate-600">
                <h5 className="font-bold">No static parameters matching your keywords</h5>
                <p className="text-xs text-slate-500">Simplify your keyword query or select a different author tag above.</p>
              </div>
            </div>
          )}
        </div>

      {/* Global Guidance disclaimer card */}
      <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800">
        <Info className="w-5 h-5 shrink-0 text-islamic-gold" />
        <div className="space-y-1 text-xs leading-relaxed">
          <p className="font-bold text-slate-800">Islamic Reference Policy</p>
          <p>
            All gradings (Muwatta, Sahih al-Bukhari, Sahih Muslim) of prophets transcripts shown are obtained from historic references. 
            If you suspect any formatting issues inside our dual language databases, kindly file a report below immediately.
          </p>
        </div>
      </div>

      {/* Flag dialog */}
      <ReportErrorDialog
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        defaultType="Hadith"
        defaultReference={reportRef}
      />
    </div>
  );
}
