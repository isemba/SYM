const lang = "en";
const Languages = {
    TODAY:{ en: "Today", tr: "Bugün"},
    MEDITATION:{ en: "Meditation", tr: "Meditasyon"},
    MUSIC:{ en: "Music", tr: "Müzik"},
    BLOG:{ en: "Blog", tr: "Blog"},
    PROFILE:{ en: "Profile", tr: "Profil"},
    SETTINGS:{ en: "Settings", tr: "Ayarlar"},
    HOW_ARE_YOU_FEELING:{ en: "How are you feeling?", tr: "Nasıl Hissediyorsun?"},
    POPULAR:{ en: "Popular", tr: "Popüler"}
};


export function getLanguageText(obj) {
    return obj[lang];
}

export default Languages;
