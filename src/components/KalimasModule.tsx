import React, { useState, useEffect } from "react";
import { Search, Volume2, Copy, BookOpen, Scale, Landmark, Sparkles, Heart, Check, RefreshCw, FileText } from "lucide-react";

interface Kalima {
  id: number;
  name: string;
  nativeName: string;
  arabic: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  theologicalContext: string;
  quranicReference?: string;
}

export default function KalimasModule({ languageCode }: { languageCode?: string }) {
  const [activeTab, setActiveTab] = useState<"sunni" | "shia" | "scholarship">("sunni");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState<"en" | "ur">("en");
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isCopiedSummary, setIsCopiedSummary] = useState(false);

  // Sunni Six Kalimas
  const sunniKalimas: Kalima[] = [
    {
      id: 1,
      name: "1st Kalima: Tayyibah (Purity)",
      nativeName: "الكَلِمَةُ الطَّيِّبَة",
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَّسُولُ ٱللَّٰهِ",
      transliteration: "Lā ilāha illallāhu Muḥammadur rasūlullāh",
      translationEn: "There is no deity but Allah, and Muhammad is the messenger of Allah.",
      translationUr: "اللہ کے سوا کوئی معبود نہیں اور محمد (صلی اللہ علیہ وسلم) اللہ کے رسول ہیں۔",
      theologicalContext: "This is the root foundation of Islamic monotheism. Highly acknowledged across all schools of thought. Barelvi, Deobandi, and Ahl-e-Hadith schools hold complete consensus on this identical formulation as the entry into Islam.",
      quranicReference: "Surah Muhammad [47:19] & Surah Al-Fath [48:29]"
    },
    {
      id: 2,
      name: "2nd Kalima: Shahadah (Testimony)",
      nativeName: "كَلِمَةُ الشَّهَادَة",
      arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      transliteration: "Ashhadu al-lā ilāha illallāhu waḥdahu lā sharīka lahu wa ashhadu anna Muḥammadan 'abduhu wa rasūluhu",
      translationEn: "I bear witness that there is no deity but Allah, He is alone and has no partners, and I bear witness that Muhammad is His servant and His messenger.",
      translationUr: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں اور میں گواہی دیتا ہوں کہ محمد (صلی اللہ علیہ وسلم) اللہ کے بندے اور رسول ہیں۔",
      theologicalContext: "The declaration of faith sworn directly in daily prayers (Tashahhud). Proclaims complete divine unity (Tawheed) and the messenger-status of the Holy Prophet.",
      quranicReference: "Surah Al-Imran [3:18]"
    },
    {
      id: 3,
      name: "3rd Kalima: Tamjeed (Glorification)",
      nativeName: "كَلِمَةُ التَّمْجِيد",
      arabic: "سُبْحَانَ ٱللَّٰهِ وَٱلْحَمْدُ لِلَّٰهِ وَلَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَٱللَّٰهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ ٱلْعَلِيِّ ٱلْعَظِيمِ",
      transliteration: "Subḥānallāhi walḥamdulillāhi wa lā ilāha illallāhu wallāhu akbar, wa lā ḥawla walā quwwata illā billāhil 'alīyil 'aẓīm",
      translationEn: "Exalted is Allah, and praise be to Allah, and there is no deity but Allah, and Allah is the Greatest. And there is no power nor strength except in Allah, the Most High, the Most Great.",
      translationUr: "پاک ہے اللہ اور تمام تعریفیں اللہ ہی کے لیے ہیں اور اللہ کے سوا کوئی معبود نہیں اور اللہ سب سے بڑا ہے اور گناہوں سے بچنے کی طاقت اور نیک کام کرنے کی قوت نہیں مگر اللہ کی طرف سے جو عالی شان اور بڑا مرتبہ والا ہے۔",
      theologicalContext: "A composite form of 'Tasbih' (declaring purity), 'Tahmeed' (gratitude), 'Tahlil' (oneness), and 'Takbeer' (greatness), universally valued for post-salat meditations.",
      quranicReference: "Tasbih of Prophet Ibrahim (A.S.) traditions"
    },
    {
      id: 4,
      name: "4th Kalima: Tawheed (Uniqueness)",
      nativeName: "كَلِمَةُ التَّوْحِيد",
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَیٌّ لَّا يَمُوتُ أَبَدًا أَبَدًا، ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ، بِيَدِهِ ٱلْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lahu, lahul-mulku wa lahul-ḥamdu, yuḥyī wa yumītu, wa huwa ḥayyun lā yamūtu abadan abadā, dhul-jalāli wal-ikrām, biyadihil-khayr, wa huwa 'alā kulli shay'in qadīr",
      translationEn: "There is no deity but Allah, He is alone and has no partners. For Him is the Kingdom and for Him is all praise. He gives life and causes death, and He is Alive, who never dies, ever and ever. Owner of Majesty and Honor. In His hand is all goodness, and He has power over all things.",
      translationUr: "اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، وہی زندہ کرتا ہے اور وہی مارتا ہے اور وہ ہمیشہ زندہ ہے اسے کبھی موت نہیں آئے گی، وہ عظمت اور بزرگی والا ہے، اسی کے ہاتھ میں بھلائی ہے اور وہ ہر چیز پر قادر ہے۔",
      theologicalContext: "Expounds God's absolute eternity and sovereign authority over creation. A central piece recited across diverse Sufi brotherhoods (Qadiriyyah, Naqshbandiyyah).",
      quranicReference: "Surah Al-Hadid [57:2]"
    },
    {
      id: 5,
      name: "5th Kalima: Astaghfar (Repentance)",
      nativeName: "كَلِمَةُ الإسْتِغْفَار",
      arabic: "أَسْتَغْفِرُ ٱللَّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ ٱلذَّنْبِ ٱلَّذِي أَعْلَمُ وَمِنَ ٱلذَّنْبِ ٱلَّذِي لَا أَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ ٱلْغُيُوبِ وَسَتَّارُ ٱلْعُيُوبِ وَغَفَّارُ ٱلذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ ٱلْعَلِيِّ ٱلْعَظِيمِ",
      transliteration: "Astaghfirullāha rabbī min kulli dhanbin adnabtuhu 'amadan aw khaṭa'an sirran aw 'alāniyatan wa atūbu ilayhi minadh-dhanbillaḏī a'lamu wa minadh-dhanbillaḏī lā a'lamu, innaka anta 'allāmul-ghuyūbi wa sattārul-'uyūbi wa ghaffārudh-dhunūbi walā ḥawla walā quwwata illā billāhil 'alīyil 'aẓīm",
      translationEn: "I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or unknowingly, secretly or openly, and I turn to Him in repentance from the sin that I know and from the sin that I do not know. Indeed You, and only You, are the Knower of the unseen, the Coverer of faults, and the Forgiver of sins. And there is no power nor strength except in Allah, the Most High, the Most Great.",
      translationUr: "میں اپنے پروردگار اللہ سے اپنے ہر گناہ کی معافی مانگتا ہوں جو میں نے جان بوجھ کر کیا یا بھول کر، چھپ کر کیا یا ظاہر ہو کر، اور میں اس کی بارگاہ میں توبہ کرتا ہوں اس گناہ سے جسے میں جانتا ہوں اور اس گناہ سے بھی جسے میں نہیں جانتا، بے شک تو غیبوں کا جاننے والا، عیبوں کا چھپانے والا اور گناہوں کا بخشنے والا ہے اور گناہ سے بچنے اور نیکی کرنے کی طاقت نہیں مگر اللہ کی مدد سے جو بہت بلند اور عظیم ہے۔",
      theologicalContext: "Represents the ongoing spiritual state of 'Tawbah' (turning back to God). Re-anchors human vulnerability and Allah's vast mercy.",
      quranicReference: "Surah Nuh [71:10] & Surah Al-Anfal [8:33]"
    },
    {
      id: 6,
      name: "6th Kalima: Rad-de-Kufr (Rejection of Disbelief)",
      nativeName: "كَلِمَةُ رَدِّ الكُفْر",
      arabic: "ٱللَّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ ٱلْكُفْرِ وَٱلشِّرْكِ وَٱلْكِذْبِ وَٱلْغِيبَةِ وَٱلْبِدْعَةِ وَٱلنَّمِيمَةِ وَٱلْفَوَاحِشِ وَٱلْبُهْتَانِ وَٱلْمَعَاصِي كُلِّهَا وَأَسْلَمْتُ وَأَقُولُ لَا إِلَهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَسُولُ ٱللَّهِ",
      transliteration: "Allāhumma innī a'ūḏu bika min an ushrika bika shay'an wa-ana a'lamu bihi wa-astaghfiruka limā lā a'lamu bihi tubtu 'anhu wa-tabarra'tu minal-kufri wash-shirki wal-kiḏbi wal-ghībati wal-bid'ati wan-namīmati wal-fawāḥishi wal-buhtāni wal-ma'āṣī kullihā wa-aslamtu wa-aqūlu lā ilāha illallāhu Muḥammadur rasūlullāh",
      translationEn: "O Allah! I seek protection in You from associating partners with You knowingly, and I seek Your forgiveness for that which I do not know. I repent from it and free myself from disbelief, polytheism, lying, backbiting, innovation, slander, lewdness, false accusation, and all other sins. I submit to Your will and I declare: There is no deity but Allah, and Muhammad is the messenger of Allah.",
      translationUr: "اے اللہ! بے شک میں تیری پناہ مانگتا ہوں اس بات سے کہ میں کسی چیز کو تیرا شریک بناؤں جان بوجھ کر، اور میں معافی مانگتا ہوں تجھ سے اس کی جسے میں نہیں جانتا، میں نے اس سے توبہ کی اور الگ ہوا کفر، شرک، جھوٹ، غیبت، بدعت، چغلی، بے حیائی، بہتان، اور ہر طرح کے گناہوں سے، اور میں اسلام لایا اور کہتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد (صلی اللہ علیہ وسلم) اللہ کے رسول ہیں۔",
      theologicalContext: "An active, explicit rejection of modern and ancient forms of polytheism and negative social sins like slander, backbiting, and harmful innovations (Bid'at) that fracture communities.",
      quranicReference: "Surah Al-Fath [48:4]"
    }
  ];


  // Shia (Fiqh-e-Ja'fariyah) Kalimas & Declarations of Faith
  // As practiced in Shia Ithna Ashari (Imami) tradition, integrating the 3rd Testimony of Imamah/Wilayah.
  const shiaKalimas: Kalima[] = [
    {
      id: 11,
      name: "1st Kalima: Tayyibah (With Wilayah of Ali)",
      nativeName: "كلمة الطيبة (الولاية)",
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَّسُولُ ٱللَّٰهِ عَلِيٌّ وَلِيُّ ٱللَّٰهِ وَصِيُّ رَسُولِ ٱللَّٰهِ وَخَلِيفَتُهُ بِلَا فَصْلٍ",
      transliteration: "Lā ilāha illallāhu Muḥammadur rasūlullāhi 'Alīyun walīyullāhi waṣīyu rasūlillāhi wa khalīfatuhu bilā faṣl",
      translationEn: "There is no deity but Allah, Muhammad is the messenger of Allah, Ali is the beloved/friend of Allah, the trustee of the Messenger of Allah, and his immediate successor.",
      translationUr: "اللہ کے سوا کوئی معبود نہیں، محمد (صلی اللہ علیہ وسلم) اللہ کے رسول ہیں، اور علیؑ اللہ کے ولی، رسول اللہ کے وصی، اور ان کے بلا فصل (فوری) خلیفہ ہیں۔",
      theologicalContext: "This is the core declaration of faith in Fiqh-e-Ja'fariyah (Shia Islam). It adds the third testimony, highlighting the divine guardianship (Wilayah) of Imam Ali (A.S.) succeeding the Holy Prophet directly.",
      quranicReference: "Surah Al-Ma'idah [5:55] (Ayat al-Wilayah)"
    },
    {
      id: 12,
      name: "2nd Kalima: Shahadah (Testimony of Succession)",
      nativeName: "شهادة الإمامة و الولاية",
      arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، وَأَشْهَدُ أَنَّ عَلِيًّا وَلِيُّ ٱللَّٰهِ وَصِيُّ رَسُولِ ٱللَّٰهِ وَخَلِيفَتُهُ بِلَا فَصْلٍ",
      transliteration: "Ashhadu al-lā ilāha illallāhu waḥdahu lā sharīka lahu, wa ashhadu anna Muḥammadan 'abduhu wa rasūluhu, wa ashhadu anna 'Alīyan walīyullāhi waṣīyu rasūlillāhi wa khalīfatuhu bilā faṣl",
      translationEn: "I bear witness that there is no deity but Allah, He is alone having no partners, and I bear witness that Muhammad is His servant and His messenger, and I bear witness that Ali is the friend of Allah, the trustee of the Messenger of Allah, and his immediate successor.",
      translationUr: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں اور میں گواہی دیتا ہوں کہ محمد (صلی اللہ علیہ وسلم) اللہ کے بندے اور رسول ہیں اور میں گواہی دیتا ہوں کہ علیؑ اللہ کے ولی، رسول اللہ کے وصی اور ان کے بلا فصل خلیفہ ہیں۔",
      theologicalContext: "Recited during Shia Adhan (call to prayer) and Iqamah, confirming that divine guardianship flows after Prophethood through the Ahl al-Bayt.",
      quranicReference: "Surah Al-Ma'idah [5:67] (Ayat al-Tabligh)"
    },
    {
      id: 13,
      name: "3rd Kalima: Tamjeed (With Al-Yaseen / Salat)",
      nativeName: "كلمة التمجيد المباركة",
      arabic: "سُبْحَانَ ٱللَّٰهِ وَٱلْحَمْدُ لِلَّٰهِ وَلَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَٱللَّٰهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ ٱلْعَلِيِّ ٱلْعَظِيمِ، اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ ٱلطَّيِّبِينَ ٱلطَّاهِرِينَ",
      transliteration: "Subḥānallāhi walḥamdulillāhi wa lā ilāha illallāhu wallāhu akbar, walā ḥawla walā quwwata illā billāhil 'alīyil 'aẓīm, Allāhumma ṣalli 'alā Muḥammadin wa Āli Muḥammadin aṭ-ṭayyibīn aṭ-ṭāhirīn",
      translationEn: "Glorified is Allah, all praise is due to Allah, there is no deity but Allah, and Allah is the Greatest. There is no power nor strength except in Allah, the Most High, the Most Great. O Allah, send blessings upon Muhammad and the Pure, Immaculate Family of Muhammad.",
      translationUr: "اللہ پاک ہے، اور تمام تعریفیں اللہ کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے، اور گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت نہیں مگر اللہ کی مدد سے جو بلند مرتبت اور عظیم ہے۔ اے اللہ! رحمت نازل فرما محمد اور محمد کی پاک و پاکیزہ آل پر۔",
      theologicalContext: "Composed of universal praises of God, paired with the mandatory 'Salawat' (invoking blessings upon Muhammad and his pure Ahl al-Bayt), which is crucial for spiritual elevation in Shiah tradition.",
      quranicReference: "Surah Al-Ahzab [33:56] (Ayat al-Salawat)"
    },
    {
      id: 14,
      name: "4th Kalima: Tawheed (Pure Oneness)",
      nativeName: "كلمة التوحيد الخالص",
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ لَا شَرِيكَ لَهُ، أَحَدًا صَمَدًا لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "Lā ilāha illallāhu lā sharīka lahu, aḥadan ṣamadan lam yalid wa lam yūlad wa lam yakun lahu kufuwan aḥad, lahul-mulku wa lahul-ḥamdu, wa  huwa 'alā kulli shay'in qadīr",
      translationEn: "There is no deity but Allah, having no partners. The One, the Eternal, Who has not begotten nor was begotten, and there is none equal or comparable to Him. For Him is the Kingdom and for Him is all praise, and He has power over all things.",
      translationUr: "اللہ کے سوا کوئی معبود نہیں اس کا کوئی شریک نہیں، وہ ایک ہے، بے نیاز ہے، نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے اور اس کے برابر کا کوئی نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے اور وہ ہر چیز پر قادر ہے۔",
      theologicalContext: "Synthesizes the famous Surah Al-Ikhlas declarations to define absolute divine simplicity and refute any anthropomorphism or division of the godhead.",
      quranicReference: "Surah Al-Ikhlas [112:1-4]"
    },
    {
      id: 15,
      name: "5th Kalima: Wilayah & Imamah (Declaration of the 12 Imams)",
      nativeName: "كلمة الولاية والأئمة الاثني عشر",
      arabic: "رَضِيتُ بِٱللَّٰهِ رَبًّا، وَبِٱلْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِیًّا، وَبِعَلِیٍّ وَٱلْحَسَنِ وَٱلْحُسَيْنِ وَعَلِیٍّ وَمُحَمَّدٍ وَجَعْفَرٍ وَمُوسَىٰ وَعَلِیٍّ وَمُحَمَّدٍ وَعَلِیٍّ وَٱلْحَسَنِ وَٱلْحُجَّةِ الْقَائِمِ الْمَهْدِيِّ أئِمَّةً وَسَادَةً وَقَادَةً، بِهِمْ أَتَوَلَّىٰ وَمِنْ أَعْدَائِهِمْ أَتَبَرَّأُ",
      transliteration: "Raḍītu billāhi Rabban, wa bil-Islāmi dīnan, wa bi-Muḥammadin Nabīyan, wa bi-'Alīyin wal-Ḥasani wal-Ḥusayni wa 'Alīyin wa Muḥammadin wa Ja'farin wa Mūsā wa 'Alīyin wa Muḥammadin wa 'Alīyin wal-Ḥasani wal-Ḥujjatil Qā'imil Mahdīyi A'immatan wa sādatan wa qādatan, bihim atawallā wa min a'dā'ihim atabarra'u",
      translationEn: "I am pleased with Allah as Lord, Islam as religion, Muhammad as Prophet, and Ali, Hasan, Husayn, Ali, Muhammad, Jafar, Musa, Ali, Muhammad, Ali, Hasan, and the Living Proof Al-Mahdi as my Imams, masters, and guides; I swear allegiance to them and declare dissociation from their enemies.",
      translationUr: "میں راضی ہوں اللہ کے رب ہونے پر، اسلام کے دین ہونے پر، محمد (صلی اللہ علیہ وسلم) کے نبی ہونے پر، اور علیؑ، حسنؑ، حسینؑ، علیؑ (زین العابدین)، محمدؑ (باقر)، جعفرؑ (صادق)، موسیؑ (کاظم)، علیؑ (رضا)، محمدؑ (تقی)، علیؑ (نقی)، حسنؑ (عسکری)، اور حجت القائم المہدیؑ کے اپنے ائمہ، سردار اور رہبر ہونے پر۔ میں ان سے محبت کا رشتہ رکھتا ہوں اور ان کے دشمنوں سے بیزاری کا اعلان کرتا ہوں۔",
      theologicalContext: "The declaration of 'Tawalla' (devotion to the Ahl al-Bayt) and 'Tabarra' (distinction from their oppressors). This forms a pillar of faith (Furoo-e-Deen) under Ja'fari theology.",
      quranicReference: "Surah Al-Ma'idah [5:55] & Sunni/Shia Hadith of Al-Ghadir"
    },
    {
      id: 16,
      name: "6th Kalima: Bara'at & Tabarra (Rejection of Tyranny)",
      nativeName: "كلمة البراءة والرفض للباطل",
      arabic: "بَرِئْتُ مَنِ ٱلْكُفْرِ وَٱلشِّرْكِ وَٱلطُّغْيَانِ وَمِنْ أَعْدَاءِ أَهْلِ بَيْتِ رَسُولِ ٱللَّٰهِ، تَبَرَّأْتُ مِنهُمْ فِي ٱلدُّنْيَا وَٱلْآخِرَةِ، وَأَسْلَمْتُ لِلَّٰهِ وَأَقُولُ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ عَلِيٌّ وَلِيُّ ٱللَّٰهِ",
      transliteration: "Bari'tu minal-kufri wash-shirki waṭ-ṭughyāni wa min a'dā'i Ahli Bayti Rasūlillāhi, tabarra'tu minhum fid-dunyā wal-ākhirati, wa-aslamtu lillāhi wa-aqūlu lā ilāha illallāhu Muḥammadur rasūlullāhi 'Alīyun walīyullāh",
      translationEn: "I dissociate myself from disbelief, polytheism, tyranny, and from the enemies of the Household of Allah's Messenger. I declare free of them in this world and the hereafter, and I submit to Allah and declare: There is no deity but Allah, Muhammad is the messenger of Allah, and Ali is the Wali of Allah.",
      translationUr: "میں کفر، شرک، سرکشی اور رسول اللہ کے اہل بیت کے دشمنوں سے بیزاری کا اظہار کرتا ہوں، دنیا اور آخرت میں ان سے بیزار ہوں اور میں نے اللہ کی اطاعت قبول کی اور کہتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، محمد (صلی اللہ علیہ وسلم) اللہ کے رسول ہیں اور علیؑ اللہ کے ولی ہیں۔",
      theologicalContext: "The ultimate proclamation of rejecting injustice, corruption, and spiritual rebellion, reaffirming that true belief can only exist once false idols and oppressors are actively rejected.",
      quranicReference: "Surah Al-Mumtahanah [60:4]"
    }
  ];

  // Dynamic state simulation for recitation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeAudioPlaying !== null) {
      const activeList = activeTab === "sunni" ? sunniKalimas : shiaKalimas;
      const kalimaObj = activeList.find(k => k.id === activeAudioPlaying);
      if (kalimaObj) {
        const wordsCount = kalimaObj.arabic.split(" ").length;
        setCurrentWordIndex(0);
        
        timer = setInterval(() => {
          setCurrentWordIndex(prev => {
            if (prev >= wordsCount - 1) {
              clearInterval(timer);
              setActiveAudioPlaying(null);
              return -1;
            }
            return prev + 1;
          });
        }, 850); // Highlight word every 850ms to simulate slow beautiful recitation
      }
    } else {
      setCurrentWordIndex(-1);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeAudioPlaying]);

  const triggerAudioSim = (id: number) => {
    const activeList = activeTab === "sunni" ? sunniKalimas : shiaKalimas;
    const kalimaObj = activeList.find(k => k.id === id);
    
    if (activeAudioPlaying === id) {
      window.speechSynthesis.cancel();
      setActiveAudioPlaying(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(kalimaObj?.arabic || "");
      utterance.lang = "ar";
      
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => v.lang.startsWith('ar') && v.name.toLowerCase().includes('male'));
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      setActiveAudioPlaying(id);
    }
  };

  const copyToClipboard = (kalima: Kalima) => {
    const textToCopy = `=== ${kalima.name} ===\n\n[Arabic Script]\n${kalima.arabic}\n\n[Transliteration]\n${kalima.transliteration}\n\n[English Translation]\n"${kalima.translationEn}"\n\n[Urdu Translation]\n"${kalima.translationUr}"\n\n[Scholarly Context]\n${kalima.theologicalContext}\n\nSourced via Muslimify School of Thought Comparison.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(kalima.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copyAllSummary = () => {
    let fullText = "============ MUSLIMIFY MULTI-SECT SIX KALIMAS STUDY ============\n\n";
    fullText += "--- SUNNI compilation (Consensus of Hanafi, Deobandi, Barelvi, Ahl-e-Hadith) ---\n";
    sunniKalimas.forEach(k => {
      fullText += `\n* ${k.name} (${k.nativeName}):\n  ${k.arabic}\n  Transliteration: ${k.transliteration}\n  English: ${k.translationEn}\n  Urdu: ${k.translationUr}\n`;
    });
    fullText += "\n\n--- SHIA compilation (Fiqh-e-Ja'fariyah Imami Declarations) ---\n";
    shiaKalimas.forEach(k => {
      fullText += `\n* ${k.name} (${k.nativeName}):\n  ${k.arabic}\n  Transliteration: ${k.transliteration}\n  English: ${k.translationEn}\n  Urdu: ${k.translationUr}\n`;
    });
    
    navigator.clipboard.writeText(fullText);
    setIsCopiedSummary(true);
    setTimeout(() => setIsCopiedSummary(false), 2000);
  };

  const activeList = activeTab === "sunni" ? sunniKalimas : shiaKalimas;

  const filteredKalimas = activeList.filter(k => 
    k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.arabic.includes(searchQuery) ||
    k.translationEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.translationUr.includes(searchQuery) ||
    k.theologicalContext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in" id="six-kalimas-section-root">
      
      {/* Radiant Top Banner */}
      <div className="relative rounded-3xl overflow-hidden islamic-pattern-banner p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 shrink-0 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/20 rounded-full border border-yellow-400/30 font-mono text-[9px] text-[#FFD700] uppercase tracking-widest font-extrabold">
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            Ecumenical Jurisprudence Panel
          </div>
          <h2 className="text-3xl font-black font-display text-white tracking-normal uppercase">
            The Six Kalimas <span className="text-islamic-gold">Multi-Sect Complete Guide</span>
          </h2>
          <p className="text-xs text-slate-200 font-medium max-w-xl">
            Study and compare the core credal formulations of the diverse schools of thought (Ahl al-Sunnah, Fiqh-e-Ja'fariyah, and academic spiritual branches) in Islam. Designed for family learning and pluralist reconciliation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 z-10">
          <button
            onClick={() => setCurrentLang(prev => prev === "en" ? "ur" : "en")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-900 border border-emerald-700/50 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-emerald-800 transition-all"
          >
            Switch Language: {currentLang === "en" ? "English" : "Urdu"}
          </button>
          <button
            onClick={copyAllSummary}
            className="flex items-center gap-2 px-4.5 py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            {isCopiedSummary ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied All Kalimas!</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-yellow-400" />
                <span>Export Multi-Sect Summary</span>
              </>
            )}
          </button>
        </div>
        
        {/* Calligraphy ambient watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 font-amiri text-8xl pointer-events-none select-none p-4 font-bold max-w-xs overflow-hidden h-24 uppercase tracking-widest">
          لا اله الا الله
        </div>
      </div>

      {/* Primary Section Segment Controller */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white dark:bg-[#0b2416] p-2.5 rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-sm">
        
        <div className="flex flex-1 w-full sm:w-auto p-1 bg-slate-150/70 dark:bg-slate-950/60 rounded-2xl gap-1">
          <button
            onClick={() => {
              setActiveTab("sunni");
              setActiveAudioPlaying(null);
            }}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
              activeTab === "sunni"
                ? "bg-gradient-to-r from-emerald-800 to-[#0d4e35] text-white shadow-md font-black"
                : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900/50"
            }`}
          >
            Ahl al-Sunnah (Sunni)
          </button>
          
          <button
            onClick={() => {
              setActiveTab("shia");
              setActiveAudioPlaying(null);
            }}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
              activeTab === "shia"
                ? "bg-gradient-to-r from-emerald-800 to-[#0d4e35] text-white shadow-md font-black"
                : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900/50"
            }`}
          >
            Fiqh-e-Ja'fariyah (Shia)
          </button>
          
          <button
            onClick={() => {
              setActiveTab("scholarship");
              setActiveAudioPlaying(null);
            }}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
              activeTab === "scholarship"
                ? "bg-gradient-to-r from-emerald-800 to-[#0d4e35] text-white shadow-md font-black"
                : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900/50"
            }`}
          >
            Academic Wisdom
          </button>
        </div>

        {activeTab !== "scholarship" && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Kalima or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/40 p-2.5 pl-10 text-xs text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-islamic-gold placeholder-slate-450 font-bold"
            />
          </div>
        )}
      </div>

      {/* Tabs Layout Rendering */}
      {activeTab === "scholarship" ? (
        
        /* Educational and ecumenical scholarship tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0c2317] p-8 rounded-3xl border border-slate-200/80 dark:border-white/5 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Landmark className="w-5 h-5 text-islamic-gold" />
              <span>Unified Core (The Essence of Tawheed)</span>
            </h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
              Regardless of historical disputes, theological schools (Aqeedah/Kalam), or schools of jurisprudence (Hanafi, Shafi'i, Maliki, Hanbali, Ja'fari), all Muslims are united on the core tenets of the first two testimonies:
            </p>

            <div className="bg-gradient-to-br from-[#0d4e35]/5 to-yellow-500/5 p-5 rounded-2xl border border-yellow-500/10 space-y-3.5">
              <div className="flex items-center gap-2.5 text-[11px] font-black text-[#0d4e35] dark:text-[#6ee7b7] uppercase tracking-widest">
                <Heart className="w-4 h-4 fill-current text-rose-500" />
                <span>Undisputed Consensus Principles</span>
              </div>
              <ul className="space-y-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-islamic-gold font-bold">1.</span>
                  <span><strong>Oneness of Allah (Tawheed):</strong> No Muslim sect assigns associates to Allah's essential design or divinity (Shirk).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-islamic-gold font-bold">2.</span>
                  <span><strong>Final Prophethood (Khatm-e-Nubuwwat):</strong> Believing in the Holy Prophet Muhammad (S.A.W.) as the final messenger sent for all mankind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-islamic-gold font-bold">3.</span>
                  <span><strong>Respect for Revelation:</strong> Complete adherence to the Noble Quran as the uncorrupted word of God.</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">The Context of "Six Kalimas"</h4>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Interestingly, the specific list of "Six Kalimas" as a numbered block is primarily a pedagogical (scholastic) convention formulated in South Asia (Pakistan, India, Bangladesh). It was designed by classical scholars to help young students and converts easily learn, memorize, and recall key concepts of theology. Arabic or Arab-majority countries do not typically use this exact "Six Kalimas" bundle, but rather memorize separate Quranic and Prophetic supplications (duas).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0c2317] p-8 rounded-3xl border border-slate-200/80 dark:border-white/5 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Scale className="w-5 h-5 text-islamic-gold" />
              <span>Differences & Theological Nuances</span>
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4.5 rounded-2xl border border-slate-250/20 dark:border-white/5 relative">
                <h4 className="text-xs font-black text-emerald-800 dark:text-[#a0ecd0] mb-1.5 uppercase tracking-wide">
                  1. Ahl al-Sunnah (Sunni) School
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Sectarian branches such as <strong>Barelvi, Deobandi, and Ahl-e-Hadith</strong> operate on complete structural agreement regarding the standard Six Kalimas. Minor differences lie in whether they incorporate extra prophetic prayers or emphasize spiritual chains, but they all teach, memorize, and swear the identical 6 Kalimas.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/40 p-4.5 rounded-2xl border border-slate-250/20 dark:border-white/5">
                <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
                  2. Fiqh-e-Ja'fariyah (Shia) School
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Because Shia theology places high importance on the spiritual leadership of Imam Ali (A.S.) and the twelve infallible Imams (Ahl al-Bayt) as a divine continuation of prophetic stewardship, they append the phrase <em>"Ali-un-Wali-Ullah"</em> (Ali is the friend of Allah) to the primary kalimat Tayyibah and Shahadah. This serves as a vital declaration of allegiance (Tawalla).
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/40 p-4.5 rounded-2xl border border-slate-250/20 dark:border-white/5">
                <h4 className="text-xs font-black text-rose-850 dark:text-rose-400 mb-1.5 uppercase tracking-wide font-mono">
                  Bara'at / Tabarra Concept
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  The Shia 6th declaration focuses on "Tabarra", meaning dissociation from the oppressors of the Prophetic household. Sunnis also reject tyranny but include active lists of daily moral sins (such as backbiting, rumors, and polytheism) in their corresponding 6th declaration (Rad-de-Kufr).
                </p>
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* Active List Card Render with Custom Search */
        <div className="space-y-6" id="kalimas-cards-container">
          
          {/* Information Notice Alert box */}
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-islamic-gold shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed">
              {activeTab === "sunni" ? (
                <span><strong>Consensus Guide:</strong> These 6 Kalimas are identical for <strong>Barelvi, Deobandi, and Ahl-e-Hadith (Salafi)</strong> sub-schools. They are taught globally in madrasas and children learning programs.</span>
              ) : (
                <span><strong>Fiqh-e-Ja'fariyah Shia Guide:</strong> These are custom-compiled creeds highlighting <strong>Wilayah & Bara'at</strong> in the exact phrasing practiced in mainstream Twelver (Ithna Ashari) households.</span>
              )}
            </div>
          </div>

          {filteredKalimas.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#0c2317] rounded-3xl border border-slate-250/20 dark:border-white/5 space-y-3.5">
              <Search className="w-10 h-10 text-slate-300 mx-auto animate-pulse" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">No Kalimas matched your search criteria.</p>
              <button 
                onClick={() => setSearchQuery("")} 
                className="px-4 py-2 bg-slate-100 dark:bg-slate-950 text-[10.5px] font-bold rounded-xl cursor-pointer hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredKalimas.map((kalima) => {
                const isPlaying = activeAudioPlaying === kalima.id;
                const arabicWords = kalima.arabic.split(" ");

                return (
                  <div 
                    key={kalima.id}
                    className="bg-white dark:bg-[#0c2317] rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 space-y-6 relative overflow-hidden"
                  >
                    {/* Small Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4.5 border-b border-slate-100 dark:border-white/5">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase font-mono block">
                          Memorization Companion
                        </span>
                        <h3 className="text-lg font-black font-display text-slate-900 dark:text-white mt-0.5">
                          {kalima.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {kalima.quranicReference && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-amber-500/20 text-[#D4AF37] hover:text-white dark:text-amber-400 font-mono text-[9px] font-bold rounded-full">
                            <Sparkles className="w-3 h-3" />
                            {kalima.quranicReference}
                          </span>
                        )}
                        
                        <button
                          onClick={() => triggerAudioSim(kalima.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold uppercase tracking-wider cursor-pointer border transition-all ${
                            isPlaying
                              ? "bg-rose-500 border-rose-600 text-white animate-pulse"
                              : "bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-white/10"
                          }`}
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? "animate-bounce" : ""}`} />
                          <span>{isPlaying ? "Stop Reciting" : "Audio Guide"}</span>
                        </button>

                        <button
                          onClick={() => copyToClipboard(kalima)}
                          className="p-1.5 bg-slate-50 dark:bg-slate-950/40 hover:bg-emerald-50 dark:hover:bg-[#0d4e35]/30 text-slate-500 dark:text-slate-300 hover:text-emerald-700 border border-slate-200 dark:border-white/10 rounded-xl transition-all cursor-pointer"
                          title="Copy Kalima Details"
                        >
                          {copiedId === kalima.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Massive Beautiful Calligraphy Arabic Text Frame */}
                    <div className="bg-[#FAF8F2] dark:bg-[#030e09] p-6 rounded-2xl border border-[#ece4cf] dark:border-emerald-900/30 text-center tracking-normal space-y-4">
                      
                      <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-black flex items-center justify-center gap-1.5 select-none pt-1">
                        <span>Original Sacred Scripture</span>
                        {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>}
                      </div>

                      <div 
                        dir="rtl"
                        className="text-right text-3xl md:text-4xl leading-loose font-bold font-amiri text-[#0d4e35] dark:text-[#6ee7b7] py-4 select-all flex flex-wrap justify-end gap-x-3.5 gap-y-4"
                        style={{ fontFamily: "var(--font-amiri, serif)" }}
                      >
                        {arabicWords.map((word, wordIdx) => {
                          const isWordHighlighted = isPlaying && wordIdx === currentWordIndex;
                          return (
                            <span 
                              key={wordIdx} 
                              className={`transition-all duration-300 rounded-lg px-2 py-0.5 ${
                                isWordHighlighted 
                                  ? "bg-rose-500 text-white scale-110 shadow-md font-extrabold translate-y-[-2px]" 
                                  : ""
                              }`}
                            >
                              {word}
                            </span>
                          );
                        })}
                      </div>

                      {isPlaying && (
                        <div className="w-full bg-slate-200 dark:bg-slate-950/60 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full transition-all duration-300 ease-linear"
                            style={{ width: `${((currentWordIndex + 1) / arabicWords.length) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>

                    {/* Transliteration */}
                    <div className="space-y-1 bg-slate-50/75 dark:bg-slate-950/20 p-4.5 rounded-2xl border border-slate-100 dark:border-white/5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-mono">
                        Phonetic Pronunciation Guide (Latin)
                      </span>
                      <p className="text-xs text-[#0d4e35] dark:text-emerald-450 italic font-semibold leading-relaxed">
                        {kalima.transliteration}
                      </p>
                    </div>

                    {/* Bilingual Meanings Section */}
                    <div className="p-4.5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-1 bg-slate-50/50 dark:bg-slate-950/10">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-mono">
                        Translation ({currentLang === "en" ? "English" : "اردو"})
                      </span>
                      <p className={`text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold ${currentLang === "ur" ? "text-right" : ""}`} style={currentLang === 'ur' ? { direction: 'rtl' } : {}}>
                        "{currentLang === "en" ? kalima.translationEn : kalima.translationUr}"
                      </p>
                    </div>

                    {/* Scholarly Explanatory panel */}
                    <div className="p-4 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors border border-yellow-500/10 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest font-mono">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Sectarian Context & School Details</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                        {kalima.theologicalContext}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
