const lang = "tr";
const Languages = {
    TODAY:{ en: "Today", tr: "Bugün"},
    DISCOVER:{ en: "Discover", tr: "Keşfet"},
    MUSIC:{ en: "Music", tr: "Müzik"},
    BLOG:{ en: "Blog", tr: "Blog"},
    PROFILE:{ en: "Profile", tr: "Profil"},
    SETTINGS:{ en: "Settings", tr: "Ayarlar"},
    HOW_ARE_YOU_FEELING:{ en: "How are you feeling?", tr: "Nasıl Hissediyorsun?"},
    WORD_OF_THE_DAY:{ en: "Word of the day", tr: "Günün Sözü"},
    POPULAR:{ en: "Popular", tr: "Popüler"},
    SELF_REALISATON:{ en: "Self Realisation", tr: "Aydınlanma Meditasyonu"},
    QUICK_START:{en: "Quick Start", tr: "Hızlı Başla"},
    ELEMENTS:{en: "Elements", tr: "Elementler"},
    SEVEN_STEPS:{en: "Seven Steps", tr: "Yedi Adım"},
    MEDITATION_WITH_MANTRA:{ en: "Meditation with Mantra", tr: "Mantralı Meditasyon" },
    THREE_CHANNEL_BALANCING:{ en: "Three Channel Balancing", tr: "Üç Kanal Dengeleme" },
    MEDITATION_WITH_AFFIRMATIONS:{ en: "Meditation With Affirmations", tr: "Olumlamalı Meditasyon" },
    BREATH_EXERCISES:{ en: "Breath Exercises", tr: "Nefes Egzersizleri" },
    STRESS_MANAGAMENT:{ en: "Stress Management", tr: "Stres Yönetimi" },
    ATTENTION_MEDITATION:{ en: "Attention Meditation", tr:  "Dikkat Meditasyonu" },
    MEDITATION_WITH_MUSIC:{ en: "Meditation With Music", tr:  "Müzikli Meditasyon" },
    OMKAR_TECHNIQUE:{ en: "Omkar Technique", tr:  "Omkar Tekniği" },
    GRADITUDE_AND_THANK:{ en: "Graditude and Thank", tr:  "Şükran ve Teşekkür" },
    MEDITATION_MUSICS:{ en: "Meditation Musics", tr:  "Meditasyon Müzikleri" },
    FREQUENCY_MUSICS:{ en: "Frequency Musics", tr:  "Frekans Müzikleri" },
    NATURE_SOUNDS:{ en: "Nature Sounds", tr:  "Doğa Sesleri" },
    SLEEP_MUSICS:{ en: "Sleep Sounds", tr:  "Uyku Sesleri" },
    CHILL_AMBIENT_MUSICS:{ en: "Chill & Ambient Musics", tr:  "Chill & Ambiyans Müzikleri" },
    CLASSIC_MUSICS:{ en: "Classic Musics", tr:  "Klasik Müzikler" },


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
    try {
        return obj[lang];
    } catch (error) {
        console.error(error);
       return ''; 
    }
    
}

export default Languages;
