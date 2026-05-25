import React, { useState } from "react";
import { getExpandedIslamicBooks } from "../data/booksData";
import { 
  BookOpen, Search, Download, ExternalLink, ShieldAlert, 
  Sparkles, Filter, Check, ChevronDown, BookMarked, Globe, Lightbulb, Compass
} from "lucide-react";

interface LibraryModuleProps {
  languageCode: string;
  setActiveSection?: (section: any) => void;
  setActiveIbadatTopic?: (topic: string | null) => void;
}

export default function LibraryModule({ languageCode, setActiveSection, setActiveIbadatTopic }: LibraryModuleProps) {
  const lang = (languageCode === "ur" ? "ur" : "en") as "en" | "ur";
  const books = getExpandedIslamicBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeMirrorBook, setActiveMirrorBook] = useState<string | null>(null);

  const categories = lang === "ur" 
    ? ["سب", "تفسیر", "حدیث", "فقہ حنفی", "فقہ شافعی", "فقہ مالکی", "فقہ حنبلی", "عام"]
    : ["All", "Tafseer", "Hadith", "Fiqh Hanafi", "Fiqh Shafi'i", "Fiqh Maliki", "Fiqh Hanbali", "General"];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Helper to resolve multiple reliable network mirrors to bypass archive.org blocks
  function getBookMirrors(bookUrl: string, title: string, author: string, category: string, backupUrl?: string) {
    const isArchive = bookUrl.includes("archive.org");
    const searchMirror = `https://www.google.com/search?q=${encodeURIComponent(title + " " + author + " filetype:pdf direct download")}`;

    // Alternative reliable Islamic library query generator (Sunni vs Shia/Ibadi sources)
    let alternateLibraryMirror = "";
    const lowerTitle = title.toLowerCase();
    const lowerCategory = category ? category.toLowerCase() : "";
    if (lowerCategory.includes("shia") || lowerTitle.includes("kafi") || lowerTitle.includes("balagha") || lowerTitle.includes("sajjadiyya")) {
      alternateLibraryMirror = `https://www.al-islam.org/search/share/${encodeURIComponent(title)}`;
    } else {
      alternateLibraryMirror = `https://www.google.com/search?q=${encodeURIComponent(title + " site:islamicbulletin.org OR site:kalamullah.com OR site:islampdf.net filetype:pdf")}`;
    }

    if (!isArchive) {
      return {
        directPdf: bookUrl,
        webReader: backupUrl || bookUrl,
        directNodePdf: backupUrl || bookUrl,
        searchMirror,
        alternateLibraryMirror,
        isArchive: false
      };
    }

    let identifier = "";
    if (bookUrl.includes("/download/")) {
      const parts = bookUrl.split("/download/");
      if (parts[1]) {
        identifier = parts[1].split("/")[0];
      }
    } else if (bookUrl.includes("/details/")) {
      const parts = bookUrl.split("/details/");
      if (parts[1]) {
        identifier = parts[1].split("/")[0];
      }
    } else if (bookUrl.includes("/search.php?query=")) {
      return {
        directPdf: bookUrl,
        webReader: backupUrl || bookUrl,
        directNodePdf: backupUrl || bookUrl,
        searchMirror,
        alternateLibraryMirror,
        isArchive: false
      };
    }

    const cleanIdentifier = decodeURIComponent(identifier);
    const webReader = backupUrl || (cleanIdentifier 
      ? `https://archive.org/details/${cleanIdentifier}` 
      : bookUrl);

    const directPdf = bookUrl;
    
    // Convert archive.org direct download links to raw high-speed direct node delivery endpoints
    // (e.g. ia801600.us.archive.org/items/) which are rarely blocked by regional authorities
    const directNodePdf = backupUrl || bookUrl.replace("https://archive.org/download/", "https://ia801600.us.archive.org/items/");

    return { directPdf, webReader, directNodePdf, searchMirror, alternateLibraryMirror, isArchive };
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-islamic-green tracking-tight font-sans md:text-4xl dark:text-emerald-400">
          {lang === 'ur' ? 'دیوائن کلاس رومز لائبریری' : 'Divine Classrooms Library'} (المكتبة الإسلامية)
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto dark:text-slate-300 leading-relaxed">
          {lang === 'ur' 
            ? 'کلاسیکی متون، فقہ کے قانونی کتابچے، اور سنی، شیعہ اور عبادی حدیث کی کتابیں مخصوص نیٹ ورک رکاوٹوں کو دور کرنے کے لیے ریڈنڈنٹ مرر چینلز کے ساتھ ترتیب دی گئی ہیں۔'
            : 'Stated classical texts, Fiqh legal manuals, and newly compiled Sunni, Shia, and Ibadi Hadith books configured with redundant mirror channels to bypass regional network blocks.'}
        </p>
      </div>

      {/* Salah By Sect Portal */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg border border-emerald-100 dark:border-emerald-900/50 shrink-0">
          <Compass className="w-8 h-8 text-islamic-green" />
        </div>
        <div className="flex-1 space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
            {lang === 'ur' ? 'نماز کے طریقہ کار (تمام مسالک)' : 'Salah Methodologies by Sect'}
          </h3>
          <p className="text-xs text-emerald-800 dark:text-emerald-200/70 leading-relaxed max-w-2xl">
            {lang === 'ur' 
                ? 'مختلف فقہی مسالک (حنفی، شافعی، شیعہ) کے مطابق نماز کی ادائیگی کے تفصیلی طریقہ کار، رکوع و سجود میں فرق، اور مسنون دعائیں ایک ہی جگہ ملاحظہ کریں۔' 
                : 'Access detailed prayer methodologies according to different Fiqh schools (Hanafi, Shafi\'i, Shia), highlighting procedural differences in posture, recitation, and Sunnah practices.'}
          </p>
        </div>
        <button
          onClick={() => {
            if (setActiveSection) {
              setActiveSection("ibadat");
            }
            if (setActiveIbadatTopic) {
              setActiveIbadatTopic("salah");
            }
            window.location.hash = "#salah";
          }}
          className="px-5 py-2.5 bg-islamic-green text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition shadow-lg shrink-0"
        >
          {lang === 'ur' ? 'تفصیل دیکھیں' : 'View Details'}
        </button>
      </div>

      {/* Network Multi-Path Warning Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 border-l-4 border-amber-500 p-4 rounded-xl flex items-start gap-3.5 shadow-xs">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <p className="font-extrabold">🌐 Recovering from Network Barriers (Censorship Bypass):</p>
          <p className="leading-relaxed">
            Direct download servers (Archive.org) may experience localized blockades in certain jurisdictions (including Pakistan/Middle East). We have integrated an interactive **Dual Mirror + Google Index Portal** for every single text. If the standard PDF fails, open the **Web Reader Details page** or click the **Direct Search Index** to bypass instantly!
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-900 dark:border-white/10 p-6 rounded-2xl shadow-md border border-islamic-green/10 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={lang === "ur" ? "کلاسیکی کتابوں کو عنوان، مصنف، یا مکتب فکر کے لحاظ سے تلاش کریں..." : "Search classical books by title, author, or school..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent rounded-xl text-sm dark:bg-slate-950 dark:border-white/10 dark:text-white"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1 select-none">
            <Filter className="w-3.5 h-3.5" />
            {lang === "ur" ? "قانونی مکتب فکر / زمرہ:" : "Legal School / Category:"}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer select-none ${
                selectedCategory === cat
                  ? "bg-islamic-green text-white border-islamic-green shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-950 dark:border-white/5 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Bar */}
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-2 font-mono">
        <span>{lang === "ur" ? "ملی" : "Found"} <span className="font-bold text-slate-800 dark:text-slate-200">{filteredBooks.length}</span> {lang === "ur" ? "مستند کتابیں" : "authentic items"}</span>
        <span>{lang === "ur" ? "ریڈنڈنٹ CDN سسٹم فعال ہے" : "Redundant CDN preservation system active"}</span>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const mirrors = getBookMirrors(book.downloadUrl, book.title, book.author, book.category, book.backupUrl);
            const isOpen = activeMirrorBook === book.id;

            return (
              <div
                key={book.id}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-islamic-green/5 dark:border-white/5 shadow-md flex flex-col justify-between hover:border-islamic-green/20 dark:hover:border-emerald-500/30 transition-all hover:shadow-lg relative"
              >
                <div className="space-y-4">
                  {/* Book cover header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="bg-emerald-50 dark:bg-emerald-950/50 text-islamic-green dark:text-emerald-400 p-3 rounded-xl border border-emerald-100/30 dark:border-emerald-900/40 group-hover:bg-islamic-green group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-slate-950 transition-colors duration-300">
                      <BookOpen className="w-5 h-5 text-islamic-gold" />
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold text-emerald-850 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100/50 dark:border-emerald-900/35 rounded-md">
                      {book.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-850 dark:text-slate-100 text-sm group-hover:text-islamic-green dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic">By {book.author}</p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Languages supported & Mirrored Buttons block */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {book.languages.map((l) => (
                        <span
                          key={l}
                          className="px-2 py-0.5 text-[9px] font-extrabold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-md"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400">PDF • ePub • Web</span>
                  </div>

                  {/* Multi-Mirror Select Segment */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMirrorBook(isOpen ? null : book.id)}
                      className="w-full flex items-center justify-between gap-1.5 px-3.5 py-2.5 text-xs font-bold bg-emerald-950/90 text-islamic-gold hover:bg-emerald-900 rounded-xl shadow-xs transition-colors cursor-pointer select-none border border-white/5"
                    >
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" />
                        Retrieve Classical Text
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Popover Mirror Options list */}
                    {isOpen && (
                      <div className="absolute bottom-11 left-0 right-0 z-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 space-y-1 text-slate-700 dark:text-slate-300 animate-slide-in-up font-sans">
                        <a
                          href={mirrors.webReader}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          onClick={() => setActiveMirrorBook(null)}
                          className="flex items-center justify-between p-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-emerald-700 dark:text-emerald-400"
                        >
                          <span className="flex items-center gap-2">
                            <BookMarked className="w-3.5 h-3.5" />
                            📖 Mirror 1: Direct Web Reader / PDF ({mirrors.webReader.includes("islamicbulletin.org") ? "IslamicBulletin Link" : mirrors.webReader.includes("kalamullah.com") ? "Kalamullah Link" : "Online Web"})
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>

                        {mirrors.directNodePdf && mirrors.directNodePdf !== mirrors.directPdf && (
                          <a
                            href={mirrors.directNodePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            onClick={() => setActiveMirrorBook(null)}
                            className="flex items-center justify-between p-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-emerald-800 dark:text-emerald-400"
                          >
                            <span className="flex items-center gap-2">
                              <Globe className="w-3.5 h-3.5" />
                              ⚡ Mirror 2: High-Speed Web Mirror ({mirrors.directNodePdf.includes("kalamullah") ? "Kalamullah Server" : mirrors.directNodePdf.includes("islamicbulletin") ? "IslamicBulletin Server" : "CDN Bypass"})
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </a>
                        )}

                        <a
                          href={mirrors.alternateLibraryMirror}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          onClick={() => setActiveMirrorBook(null)}
                          className="flex items-center justify-between p-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-amber-700 dark:text-amber-400"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                            📚 Mirror 3: Islamic Library Index
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>

                        <a
                          href={mirrors.searchMirror}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          onClick={() => setActiveMirrorBook(null)}
                          className="flex items-center justify-between p-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400"
                        >
                          <span className="flex items-center gap-2">
                            <Search className="w-3.5 h-3.5" />
                            🔍 Mirror 4: Google Direct PDF Index
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>

                        <div className="h-[1px] bg-slate-100 dark:bg-white/5 my-1"></div>

                        <a
                          href={mirrors.directPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          onClick={() => setActiveMirrorBook(null)}
                          className="flex items-center justify-between p-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-slate-500 dark:text-slate-400"
                        >
                          <span className="flex items-center gap-2">
                            <Download className="w-3.5 h-3.5" />
                            📥 Mirror 5: Direct Primary Download ({mirrors.directPdf.includes("islamicbulletin") ? "IslamicBulletin" : mirrors.directPdf.includes("kalamullah") ? "Kalamullah" : "Archive.org Backup"})
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-65" />
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="space-y-1 text-slate-600 dark:text-slate-400">
            <h5 className="font-bold">No Islamic texts match your parameters</h5>
            <p className="text-xs text-slate-500 dark:text-slate-500">Try modifying search phrases or choose another category filter</p>
          </div>
        </div>
      )}
    </div>
  );
}
