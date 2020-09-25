const lang = "tr";
const Languages = {
    TODAY:{ en: "Today", tr: "Bugün"},
    MEDITATION:{ en: "Meditation", tr: "Meditasyon"},
    MUSIC:{ en: "Music", tr: "Müzik"},
    BLOG:{ en: "Blog", tr: "Blog"},
    PROFILE:{ en: "Profile", tr: "Profil"},
    SETTINGS:{ en: "Settings", tr: "Ayarlar"},
    HOW_ARE_YOU_FEELING:{ en: "How are you feeling?", tr: "Nasıl Hissediyorsun?"},
    POPULAR:{ en: "Popular", tr: "Popüler"},
};

export const MoodLanguages = {
    STRESSED: { en: "Stressed", tr: "Stresli" },
    HAPPY: { en: "Happy", tr: "Mutlu" },
};


export function getLanguageText(obj) {
    return obj[lang];
}

export default Languages;
