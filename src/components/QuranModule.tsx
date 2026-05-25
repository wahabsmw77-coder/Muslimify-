import React, { useState, useEffect, useRef } from "react";
import { SURAHS, QARIS } from "../data/quranMetadata";
import { fetchSurahWithTranslation, TRANSLATION_EDITIONS } from "../data/quranService";
import { Ayah, Surah, Bookmark } from "../types";
import { 
  Play, Pause, Download, AlertOctagon, HelpCircle, 
  ChevronRight, ChevronLeft, Volume2, Search, BookOpen, 
  CheckCircle, Info, Bookmark as BookmarkIcon, Trash2, ArrowLeft,
  Settings, Sliders, Sparkles, X, ExternalLink, Clipboard, Check, BookImage, Globe
} from "lucide-react";
import { LANGUAGES } from "../data/languages";
import ReportErrorDialog from "./ReportErrorDialog";

interface QuranModuleProps {
  languageCode: string;
}

export default function QuranModule({ languageCode }: QuranModuleProps) {
  // Navigation View modes: "list" (catalog) vs "reader" (focused reading app page)
  const [viewMode, setViewMode] = useState<"list" | "reader">("list");
  
  // Surah navigation states
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [translationSource, setTranslationSource] = useState("");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [surahSearchText, setSurahSearchText] = useState("");

  // Layout presentation controls
  const [viewStyle, setViewStyle] = useState<"side-by-side" | "line-by-line">("line-by-line");
  const [fontSize, setFontSize] = useState<"text-lg" | "text-xl" | "text-3xl">("text-xl");

  // Reciter & Audio state engine
  const [selectedQari, setSelectedQari] = useState(QARIS[0].id);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio References
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Error Report dialog modal
  const [reportOpen, setReportOpen] = useState(false);
  const [reportRefText, setReportRefText] = useState("");



  // Track currently loaded Surah metadata
  const currentSurah = SURAHS.find(s => s.number === selectedSurahNumber) || SURAHS[0];

  // Load and store bookmarks locally
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem("islamify_quran_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [pendingScrollAyah, setPendingScrollAyah] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("islamify_quran_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.warn("Storage write blocked", e);
    }
  }, [bookmarks]);

  // Synchronous jump-scroll effect inside reader
  useEffect(() => {
    if (!isLoading && pendingScrollAyah !== null && ayahs.length > 0) {
      const ayahIdx = ayahs.findIndex(a => a.numberInSurah === pendingScrollAyah);
      if (ayahIdx !== -1) {
        setTimeout(() => {
          const element = document.getElementById(`ayah-card-${pendingScrollAyah}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 400);
        setActiveAyahIndex(ayahIdx);
      }
      setPendingScrollAyah(null);
    }
  }, [isLoading, ayahs, pendingScrollAyah, viewMode]);

  const toggleBookmark = (ayah: Ayah) => {
    const isBookmarked = bookmarks.some(
      (b) => b.surahNumber === selectedSurahNumber && b.ayahNumber === ayah.numberInSurah
    );

    if (isBookmarked) {
      setBookmarks((prev) =>
        prev.filter(
          (b) => !(b.surahNumber === selectedSurahNumber && b.ayahNumber === ayah.numberInSurah)
        )
      );
    } else {
      const newBookmark: Bookmark = {
        surahNumber: selectedSurahNumber,
        surahName: currentSurah.englishName,
        ayahNumber: ayah.numberInSurah,
        arabicText: ayah.text,
        translationText: ayah.translations[languageCode] || ayah.translations["en"] || "",
        timestamp: new Date().toISOString(),
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
    }
  };



  // Fetch surah verses dynamically
  useEffect(() => {
    let active = true;
    const loadSurah = async () => {
      setIsLoading(true);
      setActiveAyahIndex(null);
      setIsPlaying(false);
      try {
        const { ayahs: loadedAyahs, source, isOffline } = await fetchSurahWithTranslation(selectedSurahNumber, languageCode);
        if (active) {
          setAyahs(loadedAyahs);
          setTranslationSource(source);
          setIsOfflineMode(isOffline);
        }
      } catch (err) {
        console.error("Critical loader failure", err);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    loadSurah();

    return () => {
      active = false;
    };
  }, [selectedSurahNumber, languageCode]);

  // Sync reciter audio execution
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selectedSurahNumber, selectedQari]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Helper calculation for global/absolute Ayah index (required for accurate CDN fetch)
  const getAbsoluteAyahNumber = (surahNum: number, numberInSurah: number) => {
    let absoluteNum = 0;
    for (let i = 0; i < surahNum - 1; i++) {
      absoluteNum += SURAHS[i].numberOfAyahs;
    }
    return absoluteNum + numberInSurah;
  };

  // Robust three-layered fallback URL list generator
  const getAudioUrlStack = (qariId: string, surahNum: number, numberInSurah: number) => {
    const absNum = getAbsoluteAyahNumber(surahNum, numberInSurah);
    const surahPadd = String(surahNum).padStart(3, "0");
    const ayahPadd = String(numberInSurah).padStart(3, "0");

    // Standard mappings to prevent broken Alquran/Islamic network keys
    const MAP_IDS: Record<string, string> = {
      "ar.alafasy": "ar.alafasy",
      "ar.abdulbasit": "ar.abdulbasitmurattal",
      "ar.sudais": "ar.abdurrahmaansudais",
      "ar.minshawi": "ar.minshawimurattal",
      "ar.shuraim": "ar.saoodshuraym",
      "ar.maher": "ar.mahermuaiqly",
      "ar.ghamadi": "ar.saadalgamdi",
      "ar.rifai": "ar.hanirifai",
      "ar.ayyoub": "ar.muhammadayyoob",
      "ar.tablawi": "ar.mohammadaltablawi",
    };

    const targetId = MAP_IDS[qariId] || qariId;

    return [
      `https://cdn.islamic.network/quran/audio/128/${targetId}/${absNum}.mp3`,
      `https://everyayah.com/data/${qariId}/${surahPadd}${ayahPadd}.mp3`,
      `https://everyayah.com/data/ar.alafasy/${surahPadd}${ayahPadd}.mp3` // Global fallback
    ];
  };

  // Play Recitation from specific Ayah index with automated fallback layers
  const playAyahRecitation = (index: number) => {
    if (index < 0 || index >= ayahs.length) {
      setIsPlaying(false);
      setActiveAyahIndex(null);
      return;
    }

    setActiveAyahIndex(index);
    setIsPlaying(true);

    const qariMeta = QARIS.find(q => q.id === selectedQari) || QARIS[0];
    const surahNum = selectedSurahNumber;
    const numberInSurah = ayahs[index].numberInSurah;

    const urls = getAudioUrlStack(qariMeta.id, surahNum, numberInSurah);
    let attemptIdx = 0;

    const executePlayStream = () => {
      if (attemptIdx >= urls.length) {
        console.warn("All audio CDN streaming platforms exhausted for this verse. Skipping...");
        playAyahRecitation(index + 1); // Auto fallback skip
        return;
      }

      const activeUrl = urls[attemptIdx];
      
      if (audioRef.current) {
        audioRef.current.src = activeUrl;
      } else {
        audioRef.current = new Audio(activeUrl);
      }

      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          if (audioRef.current) {
            audioRef.current.onended = () => {
              playAyahRecitation(index + 1);
            };
          }
        })
        .catch((err) => {
          console.warn(`Streaming connection bottleneck on try #${attemptIdx} for url: ${activeUrl}. Shifting to fallback stream.`, err);
          attemptIdx++;
          executePlayStream(); // Instant retry with fallback
        });
    };

    executePlayStream();
  };

  const toggleContinuousPlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      const idx = activeAyahIndex !== null ? activeAyahIndex : 0;
      playAyahRecitation(idx);
    }
  };

  const printSurahBooklet = (format: "arabic" | "trans" | "both") => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to save/print the premium PDF booklet!");
      return;
    }

    const title = `Surah ${currentSurah.englishName} (${currentSurah.name}) - Muslimify Premium PDF`;
    
    let versesHTML = "";
    ayahs.forEach((a) => {
      versesHTML += `
        <div class="verse-container">
          ${(format === "arabic" || format === "both") ? `
            <div class="arabic-text" dir="rtl">
              ${a.text} <span class="verse-star">۞ ${a.numberInSurah}</span>
            </div>
          ` : ""}
          ${(format === "trans" || format === "both") ? `
            <div class="translation-text">
              <span class="verse-num">${a.numberInSurah}.</span> ${a.translations[languageCode] || a.translations["en"] || ""}
            </div>
          ` : ""}
        </div>
      `;
    });

    const bismillahHeader = (selectedSurahNumber !== 1 && selectedSurahNumber !== 9) 
      ? `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>` 
      : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,450;0,700;1,450;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: 'Inter', sans-serif;
            color: #1a202c;
            background-color: #ffffff;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .manuscript {
            border: 4px double #D4AF37;
            padding: 30px;
            border-radius: 12px;
            background-color: #fafaf7;
            box-shadow: 0 0 10px rgba(0,0,0,0.02);
            position: relative;
          }
          .manuscript::before {
            content: "";
            position: absolute;
            top: 4px; left: 4px; right: 4px; bottom: 4px;
            border: 1.5px solid #1B5E20;
            border-radius: 8px;
            pointer-events: none;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 15px;
            margin-bottom: 25px;
          }
          .brand-watermark {
            font-size: 9px;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 2px;
            color: #1B5E20;
            font-family: monospace;
          }
          .surah-title {
            font-family: 'Amiri', serif;
            font-size: 28px;
            color: #1B5E20;
            margin: 8px 0 2px 0;
            font-weight: 700;
          }
          .surah-subtitle {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: #718096;
            letter-spacing: 1px;
          }
          .surah-meta {
            font-size: 11px;
            color: #4a5568;
            margin-top: 5px;
            font-family: monospace;
          }
          .bismillah {
            font-family: 'Amiri', serif;
            font-size: 24px;
            text-align: center;
            color: #1B5E20;
            margin: 25px 0 35px 0;
          }
          .verse-container {
            border-bottom: 1px dashed #e2e8f0;
            padding: 15px 0;
            page-break-inside: avoid;
          }
          .arabic-text {
            font-family: 'Amiri', serif;
            font-size: 26px;
            color: #1a202c;
            line-height: 2.1;
            text-align: right;
            margin-bottom: 10px;
            word-spacing: 2px;
          }
          .verse-star {
            color: #D4AF37;
            font-size: 20px;
            display: inline-block;
            margin-right: 5px;
            font-family: 'Amiri', serif;
            font-weight: bold;
          }
          .translation-text {
            font-size: 12.5px;
            color: #2d3748;
            text-align: left;
            margin-top: 4px;
          }
          .verse-num {
            font-weight: bold;
            color: #1B5E20;
            margin-right: 4px;
          }
          .footer {
            margin-top: 35px;
            text-align: center;
            font-size: 10px;
            color: #718096;
            font-family: monospace;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
          }
          @media print {
            body {
              background-color: #ffffff;
            }
            .manuscript {
              border: 4px double #D4AF37 !important;
              box-shadow: none !important;
              background-color: #ffffff !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="manuscript">
          <div class="header">
            <div class="brand-watermark">۞ Muslimify Professional Digital Registry ۞</div>
            <div class="surah-title">سُورَةُ ${currentSurah.name}</div>
            <div class="surah-subtitle">Surah ${currentSurah.englishName} (${currentSurah.englishNameTranslation})</div>
            <div class="surah-meta">
              Chapter: ${currentSurah.number} | Revelation: ${currentSurah.revelationType} | Verses: ${currentSurah.numberOfAyahs}
            </div>
          </div>
          
          ${bismillahHeader}
          
          <div class="verses-list">
            ${versesHTML}
          </div>

          <div class="footer">
            Handcrafted & Verified by Muslimify • Created for learning & research purposes.
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadSurahPdf = (format: "arabic" | "trans" | "both") => {
    let outText = `===========================================================\n`;
    outText += `MUSLIMIFY DIGITAL REPOSITORY - NOBLE QURAN PRINTABLE BOOKLET\n`;
    outText += `Surah Number: ${currentSurah.number} | Name: ${currentSurah.name} (${currentSurah.englishName})\n`;
    outText += `Origin: ${currentSurah.revelationType} | Total Verses: ${currentSurah.numberOfAyahs}\n`;
    outText += `===========================================================\n\n`;

    ayahs.forEach((a) => {
      if (format === "arabic" || format === "both") {
        outText += `(${a.numberInSurah})  ${a.text}\n`;
      }
      if (format === "trans" || format === "both") {
        outText += `[Translation (${languageCode.toUpperCase()})] ${a.translations[languageCode] || a.translations["en"] || ""}\n`;
      }
      outText += `\n`;
    });

    outText += `\n===========================================================\n`;
    outText += `Verified reference script — Gilded & Compiled by Muslimify.`;

    const blob = new Blob([outText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `Muslimify_Surah_${currentSurah.englishName}_${format}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const triggerReportErr = (ayahIndex: number) => {
    setReportRefText(`Surah ${currentSurah.englishName} (Ayah #${ayahs[ayahIndex].numberInSurah})`);
    setReportOpen(true);
  };

  // Filter Surahs via text input
  const filteredSurahsList = SURAHS.filter(s =>
    s.englishName.toLowerCase().includes(surahSearchText.toLowerCase()) ||
    s.name.includes(surahSearchText) ||
    s.number.toString().includes(surahSearchText) ||
    s.englishNameTranslation.toLowerCase().includes(surahSearchText.toLowerCase())
  );

  const handleCardClick = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setViewMode("reader");
  };

  const handleBookmarkClick = (b: Bookmark) => {
    setSelectedSurahNumber(b.surahNumber);
    setPendingScrollAyah(b.ayahNumber);
    setViewMode("reader");
  };

  const navigatePrevSurah = () => {
    if (selectedSurahNumber > 1) {
      setSelectedSurahNumber(prev => prev - 1);
    }
  };

  const navigateNextSurah = () => {
    if (selectedSurahNumber < 114) {
      setSelectedSurahNumber(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      
      {viewMode === "list" ? (
        /* ==================== 1. CATALOGUE VIEW MODE (PORTAL GRID) ==================== */
        <div className="space-y-6">
          
          {/* Saved Progress Quick Resume Ribbon */}
          {bookmarks.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 rounded-3xl text-white border border-emerald-800/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-islamic-gold">
                  <BookmarkIcon className="w-5 h-5 fill-islamic-gold" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-islamic-gold font-mono block">Bookmark Hub</span>
                  <p className="text-xs text-slate-200 mt-1">
                    Continue reciting: <span className="font-extrabold text-white">Surah {bookmarks[0].surahName} (Ayah {bookmarks[0].ayahNumber})</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleBookmarkClick(bookmarks[0])}
                className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-islamic-gold text-slate-950 rounded-xl font-bold text-xs select-none shadow-md hover:brightness-110 transition-all cursor-pointer h-10 flex items-center shrink-0"
              >
                Resume Progress
              </button>
            </div>
          )}

          {/* Search Header Banner */}
          <div className="text-center space-y-3 py-4">
            <h2 className="text-3xl font-extrabold text-slate-900 font-amiri tracking-tight md:text-4xl">
              The Noble Quran (القرآن الكريم)
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Choose one of the 114 chapters. Tap a card to invoke translation adjustments, bookmarks, and continuous verified recitations.
            </p>

            <div className="max-w-md mx-auto pt-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter surah name, translation, or number..."
                  value={surahSearchText}
                  onChange={(e) => setSurahSearchText(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-emerald-800/10 focus:outline-[#1B5E20] focus:ring-1 focus:ring-islamic-green rounded-2xl text-xs font-semibold shadow-md inline-block"
                />
              </div>
            </div>
          </div>

          {/* TWO LAYOUT SECTIONS: Bookmarks & All Surahs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* BOOKMARKS LEFT COLUMN (if present) */}
            <div className={`space-y-4 ${bookmarks.length > 0 ? "lg:col-span-1" : "hidden"}`}>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
                  <BookmarkIcon className="w-4 h-4 text-islamic-gold fill-islamic-gold/10" />
                  <span>Your Bookmarks ({bookmarks.length})</span>
                </h4>

                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {bookmarks.map((b) => (
                    <div
                      key={`${b.surahNumber}-${b.ayahNumber}`}
                      onClick={() => handleBookmarkClick(b)}
                      className="group p-3 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 hover:border-islamic-green/30 rounded-xl transition-all cursor-pointer relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookmarks((prev) =>
                            prev.filter(
                              (item) => !(item.surahNumber === b.surahNumber && item.ayahNumber === b.ayahNumber)
                            )
                          );
                        }}
                        className="absolute top-2.5 right-2 text-slate-300 hover:text-red-500 rounded p-1 transition-colors"
                        title="Delete bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <p className="text-[10px] font-extrabold text-islamic-green pr-6">
                        Surah {b.surahName} • Ayah {b.ayahNumber}
                      </p>
                      
                      <p className="text-right text-[11px] font-amiri text-slate-800 truncate leading-relaxed pt-1" dir="rtl">
                        {b.arabicText}
                      </p>
                      <p className="text-[9px] text-slate-500 line-clamp-1 italic mt-0.5">
                        "{b.translationText}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN CATALOG SURAHS GRID */}
            <div className={`${bookmarks.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahsList.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => handleCardClick(surah.number)}
                    className="group bg-white p-5 rounded-2xl border border-islamic-green/10 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 relative overflow-hidden flex items-center justify-between"
                  >
                    {/* Decorative Background Accent */}
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-islamic-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center gap-4">
                      {/* Rub El Hizb Star Numeric Box */}
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-emerald-50 border border-slate-100 group-hover:border-emerald-200 flex items-center justify-center font-bold text-xs text-slate-600 group-hover:text-islamic-green transition-colors">
                        {surah.number}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-islamic-green transition-colors">
                          {surah.englishName}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {surah.englishNameTranslation}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded uppercase ${
                            surah.revelationType === "Makki" 
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          }`}>
                            {surah.revelationType}
                          </span>
                          <span className="text-[10px] text-slate-400">{surah.numberOfAyahs} Ayat</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right pr-2">
                      <span className="block text-base font-bold text-slate-900 font-amiri">
                        {surah.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSurahsList.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                  <AlertOctagon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">No chapters found for "{surahSearchText}"</p>
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* ==================== 2. DETAILED READER VIEW MODE (BOOK CHAMBER) ==================== */
        <div className="space-y-6">
          
          {/* Top navigation Back Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Back Button */}
            <button
              onClick={() => {
                setViewMode("list");
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 select-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Catalog Page</span>
            </button>

            {/* Middle navigation title buttons */}
            <div className="flex items-center gap-1">
              <button
                disabled={selectedSurahNumber <= 1}
                onClick={navigatePrevSurah}
                className="p-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:bg-transparent transition-colors"
                title="Previous Surah"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 py-1 bg-emerald-50 text-islamic-green font-extrabold text-xs rounded-lg border border-emerald-100">
                Chapter {selectedSurahNumber} of 114
              </span>

              <button
                disabled={selectedSurahNumber >= 114}
                onClick={navigateNextSurah}
                className="p-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:bg-transparent transition-colors"
                title="Next Surah"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Downloader toolbar */}
            <div className="flex flex-wrap items-center gap-2 select-none justify-end">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono hidden md:inline">Export Formats:</span>
              
              <button
                onClick={() => printSurahBooklet("both")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-yellow-400 to-islamic-gold text-slate-950 hover:brightness-110 rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Print Surah as elegant vector PDF"
              >
                <Download className="w-3.5 h-3.5 text-slate-950" />
                <span>Download Surah PDF</span>
              </button>

              <button
                onClick={() => handleDownloadSurahPdf("both")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Download text file with translations"
              >
                <span>Save Text File</span>
              </button>
            </div>

          </div>

          {/* Luxury Banner Details */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-3xl text-white border border-emerald-800/10 shadow-lg text-center space-y-3 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/4 opacity-15 bg-[radial-gradient(circle_at_center,var(--color-islamic-gold)_1px,transparent_2px)] bg-[size:10px_10px] pointer-events-none"></div>
            
            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-islamic-gold font-mono inline-block">
              {currentSurah.revelationType} Revelations • {currentSurah.numberOfAyahs} Versus
            </span>
            <h3 className="text-3xl font-extrabold font-amiri tracking-tight">
              Surah {currentSurah.englishName}
              <span className="text-xl text-islamic-gold font-normal block mt-1.5">({currentSurah.englishNameTranslation} — {currentSurah.name})</span>
            </h3>
            
            {/* Elegant Al-Fatihah/general Bismillah header */}
            {selectedSurahNumber !== 1 && selectedSurahNumber !== 9 && (
              <p className="text-2xl font-bold font-amiri text-slate-200 pt-4 tracking-wide text-center" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            )}
          </div>

          {/* Reciter continuous play control widget */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-md space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Select Qari */}
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1 pl-1">Qari Selection</label>
                <select
                  value={selectedQari}
                  onChange={(e) => setSelectedQari(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-islamic-green font-bold"
                >
                  {QARIS.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.englishName}
                    </option>
                  ))}
                </select>
              </div>

              {/* View layout */}
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1 pl-1">Dynamic Layout</label>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewStyle("line-by-line")}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold transition-all ${
                      viewStyle === "line-by-line" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    Column
                  </button>
                  <button
                    onClick={() => setViewStyle("side-by-side")}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold transition-all ${
                      viewStyle === "side-by-side" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    Dual Grid
                  </button>
                </div>
              </div>

              {/* Text Size slider */}
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1 pl-1">Arabic Font Scale</label>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setFontSize("text-lg")}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold transition-all ${
                      fontSize === "text-lg" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setFontSize("text-xl")}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold transition-all ${
                      fontSize === "text-xl" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    Regular
                  </button>
                  <button
                    onClick={() => setFontSize("text-3xl")}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold transition-all ${
                      fontSize === "text-3xl" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>

              {/* Audio controller core */}
              <div className="pt-3.5 md:pt-0">
                <button
                  onClick={toggleContinuousPlay}
                  className="w-full h-11 bg-islamic-green hover:bg-islamic-green-hover text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 select-none cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 text-white" />
                      <span>Pause Recitation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-islamic-gold fill-islamic-gold" />
                      <span>Play Continuous Audio</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Play bar active state */}
            {activeAyahIndex !== null && (
              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>Currently reciting Ayah {ayahs[activeAyahIndex]?.numberInSurah} of {ayahs.length}</span>
                </span>
                <span className="text-slate-400 font-mono">Qari: {QARIS.find(q => q.id === selectedQari)?.englishName}</span>
              </div>
            )}

          </div>

          {/* Dynamic source details */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-2 select-none">
            <span>Translation Database: {translationSource}</span>
            {isOfflineMode && <span className="text-amber-600">Locally Cached</span>}
          </div>

          {/* Verses viewport rendering */}
          {isLoading ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3">
              <Volume2 className="w-10 h-10 text-islamic-green animate-bounce" />
              <span className="text-xs text-slate-500 font-bold font-mono">Loading noble translation files...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {ayahs.map((ayah, idx) => {
                const matchesActive = activeAyahIndex === idx;

                return (
                  <div
                    key={idx}
                    id={`ayah-card-${ayah.numberInSurah}`}
                    className={`p-6 rounded-3xl border transition-all ${
                      matchesActive
                        ? "bg-slate-50 border-emerald-500 outline outline-emerald-500/10 shadow-lg"
                        : "bg-white border-islamic-green/10 hover:border-islamic-green/20 shadow-sm"
                    }`}
                  >
                    
                    <div className={`flex flex-col gap-6 ${
                      viewStyle === "side-by-side" ? "md:grid md:grid-cols-2" : "space-y-4"
                    }`}>
                      
                      {/* Arabic script Column */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4 select-none">
                          <span className="w-7 h-7 rounded-lg bg-emerald-50 text-slate-500 text-[10px] font-bold flex items-center justify-center border border-emerald-100/50 shadow-xs">
                            {ayah.numberInSurah}
                          </span>

                          {/* Quick Toolbar */}
                          <div className="flex items-center gap-1.5">
                            {/* Instant Play toggle */}
                            <button
                              onClick={() => playAyahRecitation(idx)}
                              className={`p-2 rounded-xl transition-all border ${
                                matchesActive
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-slate-50 hover:bg-emerald-50 text-slate-600 border-slate-200/60"
                              }`}
                              title="Recite this verse"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>

                            {/* Bookmark controller */}
                            <button
                              onClick={() => toggleBookmark(ayah)}
                              className={`p-2 rounded-xl transition-all border ${
                                bookmarks.some(b => b.surahNumber === selectedSurahNumber && b.ayahNumber === ayah.numberInSurah)
                                  ? "bg-amber-500 text-white border-amber-500"
                                  : "bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 border-slate-200/60"
                              }`}
                              title="Bookmark progression"
                            >
                              <BookmarkIcon className={`w-3.5 h-3.5 ${
                                bookmarks.some(b => b.surahNumber === selectedSurahNumber && b.ayahNumber === ayah.numberInSurah)
                                  ? "fill-white text-white"
                                  : ""
                              }`} />
                            </button>

                            {/* Report errors */}
                            <button
                              onClick={() => triggerReportErr(idx)}
                              className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200/60 rounded-xl transition-colors"
                              title="Flag typo"
                            >
                              <AlertOctagon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Actual arabic scripture */}
                        <p className={`text-right font-bold leading-loose text-slate-950 font-amiri tracking-wide pt-2 ${fontSize}`} dir="rtl">
                          {ayah.text}
                        </p>
                      </div>

                      {/* Translation Column */}
                      <div className="space-y-4 pt-4 md:pt-0 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block font-mono">Translation</span>
                          <p className="text-slate-800 text-xs md:text-sm leading-relaxed font-sans">
                            {ayah.translations[languageCode] || ayah.translations["en"] || "Translation coming soon"}
                          </p>
                        </div>

                        {/* Tafseer Link Toolbar */}
                        <div className="pt-2 flex flex-wrap gap-2 items-center">
                          <a
                            href={`https://www.islamicstudies.info/tafheem.php?sura=${selectedSurahNumber}&ayan=${ayah.numberInSurah}`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-50 hover:from-emerald-200 hover:to-teal-100 text-emerald-900 border border-emerald-300 rounded-xl text-[10px] sm:text-xs font-black tracking-wide uppercase shadow-xs transition-colors duration-200"
                            title="Tafheem-ul-Quran Online"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{languageCode === "ur" ? "تفہیم القرآن تفسیر پڑھیں" : "Read Tafheem Tafseer"}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-65 ml-0.5" />
                          </a>

                          <a
                            href={`https://quranenc.com/`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold uppercase transition-colors duration-200"
                            title="QuranEnc Canonical Encyclopedias"
                          >
                            <Globe className="w-3 h-3 text-slate-400" />
                            <span>QuranEnc Backup</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50 ml-0.5" />
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Global disclaimer modal */}
      <ReportErrorDialog
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        defaultType="Quran"
        defaultReference={reportRefText}
      />



    </div>
  );
}
