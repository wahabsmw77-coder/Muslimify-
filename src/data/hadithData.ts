import { Hadith } from "../types";

export const HADITH_BOOKS = [
  // Sunni Compilations
  { id: "bukhari", name: "Sahih al-Bukhari", total: 7563, author: "Imam Bukhari", grade: "Sahih Only", sect: "Sunni" },
  { id: "muslim", name: "Sahih Muslim", total: 3033, author: "Imam Muslim", grade: "Sahih Only", sect: "Sunni" },
  { id: "tirmidhi", name: "Sunan al-Tirmidhi", total: 3956, author: "Imam Tirmidhi", grade: "Sahih, Hasan, Daif", sect: "Sunni" },
  { id: "abudawud", name: "Sunan Abu Dawud", total: 5274, author: "Imam Abu Dawud", grade: "Sahih, Hasan, Daif", sect: "Sunni" },
  { id: "nasai", name: "Sunan al-Nasa'i", total: 5758, author: "Imam Nasa'i", grade: "Sahih, Hasan, Daif", sect: "Sunni" },
  { id: "ibnmajah", name: "Sunan Ibn Majah", total: 4341, author: "Imam Ibn Majah", grade: "Sahih, Hasan, Daif", sect: "Sunni" },
  { id: "nawawi", name: "40 Hadith Al-Nawawi", total: 42, author: "Imam Al-Nawawi", grade: "All Sahih/Hasan", sect: "Sunni" },
  { id: "malik", name: "Muwatta Malik", total: 1720, author: "Imam Malik", grade: "Sahih/Hasan", sect: "Sunni" },
  { id: "musnad_ahmad", name: "Musnad Ahmad", total: 27647, author: "Imam Ahmad ibn Hanbal", grade: "Sahih, Hasan, Daif", sect: "Sunni" },
  { id: "riyad_salihin", name: "Riyad as-Salihin", total: 1896, author: "Imam al-Nawawi", grade: "Sahih/Hasan Selects", sect: "Sunni" },

  // Shia Compilations
  { id: "kafi", name: "Al-Kafi", total: 16121, author: "Sheikh al-Kulayni", grade: "Various (Sahih, Hasan, Daif)", sect: "Shia" },
  { id: "la_yahduruhu_faqih", name: "Man La Yahduruhu al-Faqih", total: 9044, author: "Sheikh al-Saduq", grade: "Reliable & Authentic", sect: "Shia" },
  { id: "tahdhib_ahkam", name: "Tahdhib al-Ahkam", total: 13907, author: "Sheikh al-Tusi", grade: "Scholarly selection", sect: "Shia" },
  { id: "istibsar", name: "Al-Istibsar", total: 5511, author: "Sheikh al-Tusi", grade: "Scholarly selection", sect: "Shia" },
  { id: "nahj_balagha", name: "Nahj al-Balagha", total: 241, author: "Imam Ali (compiled by Sharif Razi)", grade: "Extremely Fluent Sermons", sect: "Shia" },
  { id: "sahifa_sajjadiyya", name: "Al-Sahifa al-Sajjadiyya", total: 54, author: "Imam Zayn al-Abidin", grade: "Authentic Supplications", sect: "Shia" },

  // Ibadi Compilations
  { id: "musnad_rabia", name: "Musnad al-Rabia ibn Habib", total: 1005, author: "Imam Al-Rabia ibn Habib", grade: "Authentic / Sahih list", sect: "Ibadi" }
];

export const STATIC_HADITHS: Hadith[] = [
  {
    id: "bukhari_1",
    book: "Sahih al-Bukhari",
    hadithNumber: "1",
    chapter: "How the Divine Revelation started to the Apostle",
    arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ",
    translations: {
      en: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.",
      ur: "اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی۔ چنانچہ جس کی ہجرت اللہ اور اس کے رسول کے لیے ہو، اس کی ہجرت اللہ اور اس کے رسول ہی کی طرف مانی جائے گی۔",
      hi: "कर्मों का फल नियत (इरादे) पर निर्भर करता है। प्रत्येक व्यक्ति को वही मिलेगा जिसकी उसने नियत की होगी। अतः जिसकी हिजरत अल्लाह और उसके रसूल के लिए हो, उसकी हिजरत अल्लाह और रसूल के लिए ही मानी जाएगी।",
      bn: "সকল কাজের প্রতিফল নিয়তের ওপর নির্ভরশীল। প্রত্যেক মানুষ তার নিয়ত অনুযায়ী ফল পাবে। অতএব যে ব্যক্তি আল্লাহ ও তাঁর রাসূলের উদ্দেশ্যে হিজরত করে, তার হিজরত আল্লাহ ও রাসূলের দিকেই গণ্য হবে।",
      tr: "Ameller niyetlere göredir. Herkes niyet ettiği şeye ulaşır. Kimin hicreti Allah ve Resulü için ise, hicreti Allah ve Resulü'nedir.",
      id: "Sesungguhnya amalan itu tergantung pada niatnya, dan setiap orang akan mendapatkan apa yang ia niatkan. Barangsiapa yang berhijrah karena Allah dan Rasul-Nya, maka hijrahnya terhitung bagi Allah dan Rasul-Nya."
    },
    grading: "Sahih",
    narrator: "Umar bin Al-Khattab",
    votesUp: 145,
    votesDown: 2
  },
  {
    id: "bukhari_2",
    book: "Sahih al-Bukhari",
    hadithNumber: "9",
    chapter: "Book of Belief (Iman)",
    arabicText: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ",
    translations: {
      en: "A Muslim is the one who avoids harming Muslims with his tongue and hands. And a Muhajir (emigrant) is the one who gives up all that Allah has forbidden.",
      ur: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں اور مہاجر وہ ہے جو ان کاموں کو چھوڑ دے جن سے اللہ تعالیٰ نے منع فرمایا ہے۔",
      hi: "सच्चा मुसलमान वह है जिसके हाथ और ज़ुबान से दूसरे मुसलमान सुरक्षित रहें। और मुहाजिर (हिजरत करने वाला) वह है जो उन चीज़ों को छोड़ दे जिससे अल्लाह ने मना किया है।",
      bn: "প্রকৃত মুসলমান সেই ব্যক্তি, যার জিহ্বা ও হাত থেকে অন্য মুসলমান নিরাপদ থাকে। এবং মহাজির (হিজরতকারী) সেই ব্যক্তি, যে আল্লাহর নিষেধের কাজগুলো ছেড়ে দেয়।",
      tr: "Müslüman, dilinden ve elinden diğer Müslümanların zarar görmediği kimsedir. Muhacir de Allah'ın yasakladığı şeyleri terk edendir.",
      id: "Seorang Muslim adalah orang yang Muslim lainnya selamat dari lisan dan tangannya. Dan seorang Muhajir adalah orang yang meninggalkan apa yang dilarang oleh Allah."
    },
    grading: "Sahih",
    narrator: "Abdullah bin Amr",
    votesUp: 98,
    votesDown: 1
  },
  {
    id: "muslim_1",
    book: "Sahih Muslim",
    hadithNumber: "223",
    chapter: "The Book of Purification",
    arabicText: "الطُّهُورُ شَطْرُ الإِيمَانِ وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
    translations: {
      en: "Purity is half of Iman (Faith). Al-Hamdu Lillah (Praise be to Allah) fills the scale of good deeds.",
      ur: "پاکیزگی اور صفائی ایمان کا نصف حصہ ہے، اور 'الحمد للہ' کا کلمہ (قیامت کے دن) اعمال کے ترازو کو بھر دیتا ہے۔",
      hi: "पवित्रता आधा ईमान है, और 'अल्हम्दु लिल्लाह' तराज़ू को भर देता है।",
      bn: "পবিত্রতা ঈমানের অর্ধেক। আর আল-হামদুলিল্লাহ আমলের পাল্লাকে পূর্ণ করে দেয়।",
      tr: "Temizlik imanın yarısıdır. Elhamdülillah sözü teraziyi (mizanı) doldurur.",
      id: "Kesucian (kebersihan) adalah setengah dari iman. Dan hamdalah (Alhamdulillah) memenuhi timbangan."
    },
    grading: "Sahih",
    narrator: "Abu Malik al-Ash'ari",
    votesUp: 112,
    votesDown: 0
  },
  {
    id: "tirmidhi_1",
    book: "Sunan al-Tirmidhi",
    hadithNumber: "2516",
    chapter: "The Fruits of Ethics and Character",
    arabicText: "مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ حُسْنِ الْخُلُقِ",
    translations: {
      en: "There is nothing heavier in the scales of a believer on the Day of Judgment than good character.",
      ur: "قیامت کے دن مومن کے ترازو میں حسن اخلاق (اچھے اخلاق) سے زیادہ بھاری کوئی چیز نہیں ہو گی۔",
      hi: "क़यामत के दिन मोमिन के तराज़ू में अच्छे अख़्लाक़ (चरित्र) से भारी कोई चीज़ नहीं होगी।",
      bn: "কিয়ামতের দিন মুমিনের পাল্লায় সুন্দর চরিত্রের চেয়ে ভারী আর কোন জিনিস থাকবে না।",
      tr: "Kıyamet gününde müminin mizanında güzel ahlaktan daha ağır gelecek hiçbir şey yoktur.",
      id: "Tidak ada sesuatu pun yang lebih berat dalam timbangan seorang mukmin pada hari kiamat daripada akhlak yang mulia."
    },
    grading: "Sahih",
    narrator: "Abu Darda",
    votesUp: 89,
    votesDown: 2
  },
  {
    id: "tirmidhi_2",
    book: "Sunan al-Tirmidhi",
    hadithNumber: "2687",
    chapter: "The Excellence of seeking Knowledge",
    arabicText: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translations: {
      en: "Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.",
      ur: "جو شخص طلب علم کے راستے پر چلے گا، اللہ تعالیٰ اس کے بدلے اس کے لیے جنت کا راستہ آسان فرما دے گا۔",
      hi: "जो कोई ज्ञान की खोज में किसी मार्ग पर चलता है, अल्लाह उसके लिए स्वर्ग का मार्ग आसान कर देता है।",
      bn: "যে ব্যক্তি জ্ঞানার্জনের উদ্দেশ্যে কোন পথ চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।",
      tr: "Kim ilim talebi için bir yola girerse, Allah ona cennetin yolunu kolaylaştırır.",
      id: "Barangsiapa menempuh suatu jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga."
    },
    grading: "Sahih",
    narrator: "Abu Hurairah",
    votesUp: 124,
    votesDown: 1
  },
  {
    id: "nawawi_1",
    book: "40 Hadith Al-Nawawi",
    hadithNumber: "13",
    chapter: "Loving for Your Brother What You Love for Yourself",
    arabicText: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translations: {
      en: "None of you truly believes until he loves for his brother what he loves for himself.",
      ur: "تم میں سے کوئی شخص اس وقت تک سچا مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے بھی وہی چیز پسند نہ کرے جو وہ اپنے لیے کرتا ہے۔",
      hi: "तुममें से कोई तब तक पूर्ण मोमिन नहीं हो सकता जब तक वह अपने भाई के लिए वही पसंद न करे जो अपने लिए पसंद करता है।",
      bn: "তোমাদের মধ্যে কেউ মুমিন হতে পারবে না যতক্ষণ না সে তার ভাইয়ের জন্য তা-ই ভালোবাসে যা নিজের জন্য ভালোবাসে।",
      tr: "Sizden biriniz kendisi için istediğini kardeşi için de istemedikçe gerçek manada iman etmiş olamaz.",
      id: "Tidak sempurna iman salah seorang di antara kalian sampai ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri."
    },
    grading: "Sahih",
    narrator: "Anas bin Malik",
    votesUp: 105,
    votesDown: 0
  },
  {
    id: "abudawud_1",
    book: "Sunan Abu Dawud",
    hadithNumber: "4941",
    chapter: "The Prohibition of Backbiting and Slander",
    arabicText: "إِنَّ مِنْ أَرْبَى الرِّبَا اسْتِطَالَةَ الرَّجُلِ فِي عِرْضِ أَخِيهِ بِغَيْرِ حَقٍّ",
    translations: {
      en: "One of the worst forms of usury (Riba) is unjustly violating the honor and dignity of one's Muslim brother.",
      ur: "سب سے بدترین سود یہ ہے کہ کوئی شخص ناحق اپنے بھائی کی عزت اور آبرو پر حملہ آور ہو۔",
      hi: "सबसे बुरे ब्याजों में से एक यह है कि कोई व्यक्ति अन्यायपूर्वक अपने भाई की प्रतिष्ठा और सम्मान पर हमला करे।",
      bn: "সবচেয়ে বড় সুদ হল কোনো মুসলমান ভাইয়ের সম্মানহানি করা অন্যায়ভাবে।",
      tr: "Faizin en kötüsü, haksız yere bir Müslümanın şeref ve haysiyetine dil uzatmaktır.",
      id: "Sesungguhnya riba yang paling keji adalah melanggar kehormatan seorang muslim tanpa hak."
    },
    grading: "Sahih",
    narrator: "Sa'id bin Zayd",
    votesUp: 76,
    votesDown: 3
  },
  {
    id: "malik_1",
    book: "Muwatta Malik",
    hadithNumber: "1617",
    chapter: "The Completion of Morals and Character",
    arabicText: "بُعِثْتُ لأُتَمِّمَ حُسْنَ الأَخْلاَقِ",
    translations: {
      en: "I was sent only to perfect and complete noble character and morals.",
      ur: "مجھے صرف اس لیے بھیجا گیا ہے تاکہ میں اچھے اخلاق کی تکمیل کروں۔",
      hi: "मुझे उत्कृष्ट चरित्र और नैतिकता की पूर्णता के लिए ही भेजा गया है।",
      bn: "আমি প্রেরিত হয়েছি কেবল নৈতিক চরিত্রের পূর্ণতা সাধনের জন্য।",
      tr: "Ben güzel ahlakı tamamlamak üzere gönderildim.",
      id: "Sesungguhnya aku diutus hanyalah untuk menyempurnakan akhlak yang mulia."
    },
    grading: "Sahih",
    narrator: "Mu'adh bin Jabal",
    votesUp: 110,
    votesDown: 1
  }
];
