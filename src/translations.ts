export const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    quran: "Quran",
    hadith: "Hadith",
    library: "Islamic Books",
    azkar: "Adhkar",
    guidance: "Sunnah",
    prayers: "Salah",
    qibla: "Qibla",
    zakat: "Zakat",
    kalimas: "6 Kalimas",
    ask: "Alim AI",
    report: "Report",
    nightMode: "Enable Night Mode",
    lightMode: "Enable Light Mode",
    // New additions for LandingPage/Other
    dailyAyat: "Daily Ayat",
    dailyHadith: "Daily Hadith",
    dailyDua: "Daily Dua",
    welcome: "Assalamu Alaikum",
    scholarAssistant: "Scholar AI Assistant",
    salahTracker: "Salah Tracker",
    weeklyReport: "Weekly Report",
    monthlyReport: "Monthly Report",
    yearlyReport: "Yearly Report",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha"
  },
  ur: {
    dashboard: "ڈیش بورڈ",
    quran: "قرآن",
    hadith: "حدیث",
    library: "اسلامی کتابیں",
    azkar: "اذکار",
    guidance: "سنت",
    prayers: "نماز",
    qibla: "قبلہ",
    zakat: "زکوٰۃ",
    kalimas: "6 کلمے",
    ask: "عالم اے آئی",
    report: "رپورٹ",
    nightMode: "نائٹ موڈ آن کریں",
    lightMode: "لائٹ موڈ آن کریں",
    // New additions
    dailyAyat: "روزانہ کی آیت",
    dailyHadith: "روزانہ کی حدیث",
    dailyDua: "روزانہ کی دعا",
    welcome: "السلام علیکم",
    scholarAssistant: "عالم اے آئی",
    salahTracker: "نماز ٹریکر",
    weeklyReport: "ہفتہ وار رپورٹ",
    monthlyReport: "ماہانہ رپورٹ",
    yearlyReport: "سالانہ رپورٹ",
    fajr: "فجر",
    dhuhr: "ظہر",
    asr: "عصر",
    maghrib: "مغرب",
    isha: "عشاء"
  }
};

export const getT = (code: string) => {
  return (code === 'ur' ? TRANSLATIONS.ur : TRANSLATIONS.en);
};
