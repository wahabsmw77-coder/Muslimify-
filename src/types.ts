/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Makki" | "Madani";
  juz: number[];
}

export interface Ayah {
  numberInSurah: number;
  text: string;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  audio?: string;
  translations: Record<string, string>; // Language Code -> Translation String
}

export interface Hadith {
  id: string;
  book: string;
  hadithNumber: string;
  chapter: string;
  arabicText: string;
  translations: Record<string, string>; // Language Code -> Translation String
  grading: "Sahih" | "Hasan" | "Daif" | "Muttafaqun Alayh";
  gradingReason?: string;
  narrator: string;
  votesUp: number;
  votesDown: number;
}

export interface IslamicBook {
  id: string;
  title: string;
  author: string;
  category: "Tafseer" | "Hadith" | "Fiqh Hanafi" | "Fiqh Shafi'i" | "Fiqh Maliki" | "Fiqh Hanbali" | "General";
  languages: string[];
  description: string;
  downloadUrl: string;
  coverImage?: string;
  backupUrl?: string;
}

export interface AzkarItem {
  id: string;
  category: "Morning" | "Evening";
  arabicText: string;
  translations: Record<string, string>;
  benefits: Record<string, string>;
  count: number;
  audioUrl?: string;
}

export interface Qari {
  id: string;
  name: string;
  englishName: string;
  serverUrl: string; // Base URL of audio stream or reciter endpoint
}

export interface LangType {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
  timestamp: string;
}
