export const IBADAT_DATA = {
  salahInfo: {
    title: { en: "Salah Guidelines by Sect", ur: "نماز کے فرقہ وارانہ طریقہ کار" },
    sects: {
      hanafi: {
        title: { en: "Hanafi School (حنفی مسلک)", ur: "حنفی طریقہ" },
        desc: { en: "The dominant Sunni school in South Asia, Central Asia, and Turkey. Characterized by placing hands below the navel for men, silent Ameen, and reciting Al-Fatihah silently in congregational prayers.", ur: "جنوبی ایشیا اور ترکی کا بڑا فقہی مسلک۔ مرد ناف کے نیچے ہاتھ باندھتے ہیں، آمین آہستہ اور باجماعت نماز میں مقتدی خاموش رہتا ہے۔" },
        steps: [
          {
            name: { en: "Niyyah & Takbir", ur: "نیت اور تکبیر تحریمہ" },
            desc: { en: "Raise hands to the earlobes for men, shoulder/chest level for women, and say 'Allahu Akbar' while standing.", ur: "مرد ہاتھوں کو کانوں کی لو تک، اور خواتین کندھوں تک اٹھا کر 'اللہ اکبر' کہیں۔" },
            dua: {
              ar: "اللَّهُ أَكْبَرُ",
              en: "Allah is the Greatest",
              ur: "اللہ سب سے بڑا ہے"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001001.mp3"
          },
          {
            name: { en: "Sana (Opening Supplication)", ur: "ثناء (سبحانک اللھم)" },
            desc: { en: "Fold hands below the navel (right over left) and recite Sana silently.", ur: "ناف کے نیچے دایاں ہاتھ بائیں ہاتھ پر رکھ کر ثناء پڑھیں۔" },
            dua: {
              ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
              en: "Glory be to You, O Allah, and Yours is the praise, and blessed is Your name, and exalted is Your majesty, and there is none worthy of worship but You.",
              ur: "اے اللہ! تو پاک ہے، اور تیری تعریفیں ہیں، اور تیرا نام برکت والا ہے، اور تیری شان بہت بلند ہے، اور تیرے سوا کوئی معبود نہیں"
            },
            audio: "https://audio.qurancdn.com/reciters/3/001001.mp3"
          },
          {
            name: { en: "Al-Fatihah recitation", ur: "سورۃ الفاتحہ کی تلاوت" },
            desc: { en: "Recite Surah Al-Fatihah silently followed by another Surah. Say 'Ameen' silently.", ur: "سورۃ الفاتحہ اور پھر کوئی اور سورت پڑھیں۔ آمین آہستہ کہیں۔" },
            dua: {
              ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۞ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۞ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
              en: "Praise be to Allah, Lord of the worlds. The Beneficent, the Merciful. Master of the Day of Judgment. You alone we worship and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.",
              ur: "سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ نہایت مہربان، بہت رحم والا۔ روز جزا کا مالک۔ ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ ہی سے مدد چاہتے ہیں۔ ہمیں سیدھے راستے پر چلا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب کیا گیا اور نہ گمراہوں کا۔"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001001.mp3"
          },
          {
            name: { en: "Ruku (Bowing)", ur: "رکوع" },
            desc: { en: "Bow down with your head level with your back, grasp knees, and recite Lord glorification 3 times.", ur: "اللہ اکبر کہتے ہوئے جھکیں اور رکوع میں تسبیح پڑھیں۔" },
            dua: {
              ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
              en: "Glory be to my Lord, the Almighty (recite 3 times)",
              ur: "پاک ہے میرا پروردگار عظمت والا (تین مرتبہ کہیں)"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001002.mp3"
          },
          {
            name: { en: "Sajdah (Prostration)", ur: "سجدہ" },
            desc: { en: "Prostrate placing knees first, then hands, then nose and forehead on the ground. Recite 3 times.", ur: "زمین پر سجدہ کریں اور تسبیح پڑھیں۔" },
            dua: {
              ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
              en: "Glory be to my Lord, the Most High (recite 3 times)",
              ur: "پاک ہے میرا پروردگار جو سب سے بلند ہے (تین مرتبہ کہیں)"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001003.mp3"
          },
          {
            name: { en: "Qa'dah & Tashahhud (Sitting)", ur: "قعدہ اور تشہد" },
            desc: { en: "Sit on your left foot with the right foot upright. Point the right index finger upwards at 'La ilaha'.", ur: "بائیں پاؤں پر بیٹھ جائیں اور تشہد پڑھیں۔" },
            dua: {
              ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
              en: "All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and on the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is His servant and Messenger.",
              ur: "تمام زبانی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ سلام ہو آپ پر اے نبی، اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ سلام ہو ہم پر اور اللہ کے نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد اس کے بندے اور رسول ہیں۔"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001004.mp3"
          }
        ]
      },
      shafii: {
        title: { en: "Shafi'i & Maliki (شافعی و مالکی)", ur: "شافعی و مالکی طریقہ" },
        desc: { en: "Prominent in the Middle East, East Africa, and Southeast Asia. Folds hands above the navel or lets them hang natural (Maliki Sadl), recites Al-Fatihah aloud to all in congregation, and says 'Ameen' aloud.", ur: "مشرق وسطیٰ اور جنوب مشرقی ایشیا کا بڑا مسلک۔ ہاتھ سینے پر باندھے جاتے ہیں یا کھلے چھوڑے جاتے ہیں (مالکی سدل) اور آمین بلند آواز سے کہی جاتی ہے۔" },
        steps: [
          {
            name: { en: "Intention & Takbir", ur: "نیت اور تکبیر تحریمہ" },
            desc: { en: "Form your intention in your heart, raise your palms facing the Qiblah to shoulder height, and say 'Allahu Akbar'.", ur: "دل میں نیت کریں، اپنے ہاتھوں کے پنجے قبلہ رخ اٹھائیں اور 'اللہ اکبر' کہہ کر ہاتھ باندھیں۔" },
            dua: {
              ar: "اللَّهُ أَكْبَرُ",
              en: "Allah is Greatest",
              ur: "اللہ سب سے بڑا ہے"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001001.mp3"
          },
          {
            name: { en: "Dua of Tawajjuh (Opening)", ur: "دعائے توجہ" },
            desc: { en: "Fold hands on the chest (right over left wrist) and recite the specific Shafi'i opening dua.", ur: "ہاتھوں کو ناف سے اوپر سینے پر باندھ کر دعائے الوجہ پڑھیں۔" },
            dua: {
              ar: "وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ، إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
              en: "I have turned my face sincerely towards He who created the heavens and the earth, a true believer and Muslim, and I am not of the polytheists. Verily, my prayer, my sacrifice, my living, and my dying are all for Allah, Lord of the worlds.",
              ur: "میں نے یکسو ہو کر اپنا رخ اس ذات کی طرف کیا جس نے زمین اور آسمانوں کو پیدا کیا ہے، اور میں مشرکین میں سے نہیں ہوں۔ بے شک میری نماز، میری قربانی، میرا جینا اور میرا مرنا سب رب العالمین کے لیے ہے۔"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001002.mp3"
          },
          {
            name: { en: "Al-Fatihah & Recitation", ur: "قرائت سورۃ الفاتحہ" },
            desc: { en: "Reciting Al-Fatihah is binding on the follower too. Recitings are done aloud in Fajr, Maghrib, Isha, saying 'Ameen' loudly.", ur: "مقتدی کے لیے بھی سورہ فاتحہ پڑھنا لازمی ہے۔ آمین بلند آواز سے کہنا مسنون ہے۔" },
            dua: {
              ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۞ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ...",
              en: "In the name of Allah, the Beneficent, the Merciful. Praise be to Allah, Lord of the worlds...",
              ur: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے، سب تعریفیں اللہ کے لیے جو سب جہانوں کا رب ہے..."
            },
            audio: "https://everyayah.com/data/ar.alafasy/001003.mp3"
          },
          {
            name: { en: "Qunut in Fajr", ur: "دعائے قنوت فجر" },
            desc: { en: "Recite the Qunut supplication standing after rising from the Ruku of the second Unit of Fajr.", ur: "نماز فجر کی دوسری رکعت کے رکوع سے اٹھنے کے بعد کھڑے کھڑے قنوت پڑھیں۔" },
            dua: {
              ar: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ...",
              en: "O Allah, guide me among those whom You have guided, grant me well-being among those whom You have granted well-being, take me into Your care among those whom You have taken into care...",
              ur: "اے اللہ! مجھے ہدایت دے ان لوگوں میں جنہیں تو نے ہدایت دی، اور عافیت دے ان میں جنہیں تو نے عافیت دی، اور میری کارسازی فرما ان میں جن کی تو نے کارسازی فرمائی..."
            },
            audio: "https://everyayah.com/data/ar.alafasy/001005.mp3"
          }
        ]
      },
      shia: {
        title: { en: "Shia Ja'fari School (جعفری فقہ)", ur: "اہلِ تشیع (جعفری طریقہ)" },
        desc: { en: "Based on Ja'fari jurisprudence. Prayers are offered with arms straight down (Sadl), no congregational 'Ameen', recitation of a full Surah is required, and Sajdah is offered on earth or clay turbah.", ur: "اہلِ تشیع مکتبِ فکر کا طریقہ کار۔ ہاتھ کھلے چھوڑ کر (سدل) نماز ادا کی جاتی ہے، آمین بلند آواز میں نہیں کہی جاتی اور سجدہ صرف پاک مٹی کی ٹکیہ (تربہ) پر کیا جاتا ہے۔" },
        steps: [
          {
            name: { en: "First Takbir & Sadl", ur: "پہلی تکبیر اور سدل" },
            desc: { en: "Raise hands to the ears, say 'Allahu Akbar' and leave them hanging straight at the sides.", ur: "ہاتھوں کو کانوں تک اٹھائیں اور 'اللہ اکبر' کہیں۔ ہاتھ باندھنے کی بجائے دونوں اطراف میں کھلے چھوڑیں (سدل)۔" },
            dua: {
              ar: "اللَّهُ أَكْبَرُ",
              en: "Allah is Greatest",
              ur: "اللہ سب سے بڑا ہے"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001001.mp3"
          },
          {
            name: { en: "Recitation (Qira'at)", ur: "قرائت" },
            desc: { en: "Recite Surah Al-Fatihah, then a complete Surah (such as Al-Ikhlas) with Bismillah. Saying 'Ameen' is forbidden.", ur: "سورۃ الفاتحہ پڑھیں اور اس کے بعد کوئی اور سورت مکمل پڑھنا ضروری ہے۔ 'آمین' کہنا جائز نہیں مانا جاتا۔" },
            dua: {
              ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
              en: "In the name of Allah, the Beneficent, the Merciful. Say: He is Allah, the Creator, the One. Allah, the Self-Sufficient. He does not beget, nor was He begotten. And there is none comparable to Him.",
              ur: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ کہو: وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس کی کوئی اولاد ہے نہ وہ کسی کی اولاد ہے۔ اور اس کا کوئی ہمسر نہیں۔"
            },
            audio: "https://everyayah.com/data/ar.alafasy/0112001.mp3"
          },
          {
            name: { en: "Qunut in every unit", ur: "قنوت (دوسری رکعت میں)" },
            desc: { en: "Raise palms to face level before Ruku in the second unit, supplicating with custom prayers.", ur: "دوسری رکعت کے رکوع سے پہلے ہاتھ چہرے کے برابر اٹھا کر دعا (قنوت) پڑھیں۔" },
            dua: {
              ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
              en: "Our Lord, grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire.",
              ur: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی حاصل فرما اور ہمیں دوزخ کے عذاب سے بچا۔"
            },
            audio: "https://everyayah.com/data/ar.alafasy/002201.mp3"
          },
          {
            name: { en: "Sajdah with Turbah", ur: "تربہ پر سجدہ" },
            desc: { en: "Place forehead onto a small circular block of clay from Karbala (Turbah). Recite glorification.", ur: "پیشانی مٹی کی ٹکیہ (سجدہ گاہ یا تربہ) پر رکھ کر سجدے کی تسبیح پڑھیں۔" },
            dua: {
              ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
              en: "Glory be to my Lord the Most High, and with His praise.",
              ur: "پاک ہے میرا سب سے بلند رب اور میں اس کی حمد کرتا ہوں"
            },
            audio: "https://everyayah.com/data/ar.alafasy/001004.mp3"
          }
        ]
      }
    }
  },
  fasting: {
    title: { en: "Fasting (Sawm)", ur: "روزہ (صوم)" },
    suhoorDua: {
      ar: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      en: "I intend to keep the fast for tomorrow in the month of Ramadan.",
      ur: "میں نے رمضان کے مہینے کے کل کے روزے کی نیت کی"
    },
    iftarDua: {
      ar: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      en: "O Allah, I fasted for You and I break my fast with Your provision.",
      ur: "اے اللہ! میں نے تیرے لیے روزہ رکھا اور تیرے رزق سے افطار کیا"
    },
    schools: {
      general: { en: "Abstain from food, drink, and intimate acts from Fajr until Maghrib.", ur: "فجر سے مغرب تک کھانے، پینے اور مباشرت سے پرہیز کریں۔" }
    }
  },
  hajjUmrah: {
    title: { en: "Hajj & Umrah", ur: "حج و عمرہ" },
    umrahSteps: { en: ["Enter Ihram", "Perform Tawaf (7 rounds)", "Sa'i (7 rounds between Safa and Marwa)", "Shave/shorten hair"], ur: ["احرام باندھنا", "طواف کرنا (7 چکر)", "سعی کرنا (صفا اور مروہ کے درمیان 7 چکر)", "سر منڈوانا/بال چھوٹے کرنا"] },
    hajjSteps: { en: ["Ihram", "Arafah", "Muzdalifah", "Stoning", "Sacrifice", "Tawaf al-Ifadah"], ur: ["احرام", "عرفات", "مزدلفہ", "رمی جمرات", "قربانی", "طواف افاضہ"] }
  },
  janazah: {
    title: { en: "Namaz-e-Janazah", ur: "نماز جنازہ" },
    steps: {
      hani: [
        {
          step: { en: "Takbir 1: Recite Sana", ur: "تکبیر 1: ثناء پڑھیں" },
          dua: {
            ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
            en: "Glory be to You, O Allah, and Yours is the praise, and blessed is Your name, and exalted is Your majesty, and there is none worthy of worship but You.",
            ur: "اے اللہ! تو پاک ہے، اور تیری تعریفیں ہیں، اور تیرا نام برکت والا ہے، اور تیری شان بہت بلند ہے، اور تیرے سوا کوئی معبود نہیں"
          }
        },
        {
          step: { en: "Takbir 2: Recite Durood-e-Ibrahim", ur: "تکبیر 2: درودِ ابراہیمی پڑھیں" },
          dua: {
            ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
            en: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Glorious.",
            ur: "اے اللہ! رحمت فرما محمد صلی اللہ علیہ وسلم پر اور آلِ محمد پر، جیسا کہ تو نے رحمت فرمائی ابراہیم پر اور آلِ ابراہیم پر، بے شک تو قابلِ تعریف، بزرگ ہے۔ اے اللہ! برکت نازل فرما محمد صلی اللہ علیہ وسلم پر اور آلِ محمد پر، جیسا کہ تو نے برکت نازل فرمائی ابراہیم پر اور آلِ ابراہیم پر، بے شک تو قابلِ تعریف، بزرگ ہے۔"
          }
        },
        {
          step: { en: "Takbir 3: Dua for the Deceased", ur: "تکبیر 3: میت کے لیے دعا" },
          dua: {
            ar: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا...",
            en: "O Allah, forgive our living and our dead, those who are present and those who are absent, our young and our old, our males and our females.",
            ur: "اے اللہ! ہمارے زندوں کو، ہمارے مردوں کو، ہمارے حاضر کو، ہمارے غائب کو، ہمارے چھوٹوں کو، ہمارے بڑوں کو، ہمارے مردوں کو اور ہماری عورتوں کو معاف فرما..."
          }
        },
        {
          step: { en: "Takbir 4: Salam", ur: "تکبیر 4: سلام" },
          dua: {
            ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            en: "Peace and mercy of Allah be upon you.",
            ur: "آپ پر اللہ کی سلامتی اور رحمت ہو"
          }
        }
      ],
      shia: [
        {
            step: { en: "Takbir 1: Shahadah", ur: "تکبیر 1: شہادت" },
            dua: {
                ar: "أَشْهَدُ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَأَنَّ عَلِيًّا وَلِيُّ اللَّهِ",
                en: "I bear witness that there is no god but Allah and I bear witness that Muhammad is the messenger of Allah and Ali is the Wali of Allah.",
                ur: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں اور علی اللہ کے ولی ہیں۔"
            }
        },
        {
            step: { en: "Takbir 2: Salawat", ur: "تکبیر 2: صلوات" },
            dua: {
                ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ وَبَارِكْ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
                en: "O Allah, send blessings upon Muhammad and the family of Muhammad, and bless Muhammad and the family of Muhammad.",
                ur: "اے اللہ! محمد اور آلِ محمد پر رحمت نازل فرما اور محمد اور آلِ محمد پر برکت نازل فرما۔"
            }
        },
        {
            step: { en: "Takbir 3: Dua for Believers/Deceased", ur: "تکبیر 3: مومنین اور میت کے لیے دعا" },
            dua: {
                ar: "اللَّهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلِهَذَا الْمَيِّتِ",
                en: "O Allah, forgive the believing men and women and this deceased person.",
                ur: "اے اللہ! مومن مردوں اور مومن عورتوں کی مغفرت فرما اور اس میت کی مغفرت فرما"
            }
        },
        {
            step: { en: "Takbir 4: Dua", ur: "تکبیر 4: دعا" },
            dua: {
                ar: "اللَّهُمَّ إِنَّ هَذَا عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ نَزَلَ بِكَ وَأَنْتَ خَيْرُ مَنْزُولٍ بِهِ",
                en: "O Allah, this is Your servant, son of Your servant, son of Your maidservant, he has arrived before You, and You are the best before whom one can arrive.",
                ur: "اے اللہ! یہ تیرا بندہ، تیرے بندے کا بیٹا اور تیری بندی کا بیٹا ہے، جو تیرے پاس آیا ہے، اور تو بہترین میزبان ہے۔"
            }
        },
        {
            step: { en: "Takbir 5: Salam", ur: "تکبیر 5: سلام" },
            dua: {
                ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
                en: "Peace, mercy, and blessings of Allah be upon you.",
                ur: "آپ پر اللہ کی سلامتی، رحمت اور برکتیں ہوں۔"
            }
        }
      ]
    }
  }
};
