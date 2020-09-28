const lang = "tr";
const Languages = {
    TODAY:{ en: "Today", tr: "Bugün"},
    DISCOVER:{ en: "Discover", tr: "Keşfet"},
    MUSIC:{ en: "Music", tr: "Müzik"},
    BLOG:{ en: "Blog", tr: "Blog"},
    PROFILE:{ en: "Profile", tr: "Profil"},
    SETTINGS:{ en: "Settings", tr: "Ayarlar"},
    HOW_ARE_YOU_FEELING:{ en: "How are you feeling?", tr: "Nasıl Hissediyorsun?"},
    POPULAR:{ en: "Popular", tr: "Popüler"},
    SELF_REALISATON:{ en: "Self Realisation", tr: "Aydınlanma Meditasyonu"},
    QUICK_START:{en: "Quick Start", tr: "Hızlı Başla"},
    ELEMENTS:{en: "Elements", tr: "Elementler"},
    SEVEN_STEPS:{en: "Seven Steps", tr: "Yedi Adım"},
    MEDITATION_WITH_MANTRA:{en: "Meditation with Mantra", tr: "Mantralı Meditasyon"}
};

export const MoodLanguages = {
    STRESSED: { en: "Stressed", tr: "Stresli" },
    HAPPY: { en: "Happy", tr: "Mutlu" },
    TIRED: { en: "Tired", tr: "Yorgun" },
    DEMOTIVATED: { en: "Demotive", tr: "Demotive" },
    INCAPABLE: { en: "Incapable", tr: "Yetersiz" },
    LONELY: { en: "LONELY", tr: "Yalnız" },
    IN_PAIN: { en: "In Pain", tr: "Ağrılı" },
    SAD: { en: "Sad", tr: "Üzgün" },
    GRATEFUL: { en: "Grateful", tr: "Minettar" },
    UNEASY: { en: "Uneasy", tr: "Rahatsız" },
    DEPRESSED: { en: "Depressed", tr: "Depresif" },
    DISTRACTED: { en: "Distracted", tr: "Dikkati Dağılmış" },
    NEED_SPACE: { en: "Need Space", tr: "Alana İhtiyacım Var" },
    COMPASSIONED: { en: "Compassioned", tr: "Şefkatli" },
    SLEEPLESS: { en: "Sleepless", tr: "Uykusuz" },
    ANXIOUS: { en: "Anxious", tr: "Endişeli" }
};


export function getLanguageText(obj) {
    return obj[lang];
}

export default Languages;
