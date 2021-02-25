const ThemeColors = [
    {
        MAIN_BG_GRADIENT: ["rgb(162,184,188)", "rgb(96,103,104)"],
        HEADER_GRADIENT: ["rgb(162,184,188)", "rgb(96,103,104)"],
        MAIN_DARK: "rgb(11,0,0)",
        MAIN: "#01f0f5",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "rgba(124 ,118 ,117 , 0.8)",
        ACTIVE_TITLE: "rgba(248,116,162, 0.5)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#fff",
        BOTTOM_BG:"#3e4342",
        BG_VIDEO:require("../assets/videos/waves.mp4"),
        BG_IMAGE:require("../assets/images/bg-waves.png")
    },
    {
        MAIN_BG_GRADIENT: ["rgb(100,63,39)", "rgb(11,0,0)"],
        HEADER_GRADIENT: ["rgb(118,83,65)", "rgb(65,40,28)"],
        MAIN_DARK: "rgb(11,0,0)",
        MAIN: "#01f0f5",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "rgba(0 ,0 ,0 , 0.5)",
        ACTIVE_TITLE: "rgba(248,116,162, 0.5)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#fff",
        BOTTOM_BG:"#321208",
        BG_VIDEO:require("../assets/videos/falling_leaves.mp4"),
        BG_IMAGE:require("../assets/images/bg-fire.png")
    },
    {
        MAIN_BG_GRADIENT: ["rgb(51,69,183)", "rgb(17,35,146)"],
        HEADER_GRADIENT: ["rgb(51,69,183)", "rgb(17,35,146)"],
        MAIN_DARK: "rgb(255,0,0)",
        MAIN: "#7bf501",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "rgb(105,134,112)",
        ACTIVE_TITLE: "rgb(111,108,215)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#fff",
        BOTTOM_BG:"#00006c",
        BG_VIDEO:require("../assets/videos/nightlights.mp4"),
        BG_IMAGE:require("../assets/images/bg-clouds.png")
    }
    ,
    {
        MAIN_BG_GRADIENT: ["rgb(107,148,208)", "rgb(74,117,177)"],
        HEADER_GRADIENT: ["rgb(107,148,208)", "rgb(74,117,177)"],
        MAIN_DARK: "rgb(255,0,0)",
        MAIN: "#7bf501",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "rgb(125,131,241)",
        ACTIVE_TITLE: "rgb(111,108,215)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#fff",
        BOTTOM_BG:"#27518e",
        BG_VIDEO:require("../assets/videos/rain_loop.mp4"),
        BG_IMAGE:require("../assets/images/bg-lightning.png")
    }
    ,
    {
        MAIN_BG_GRADIENT: ["rgb(184,198,201)", "rgb(118,127,128)"],
        HEADER_GRADIENT: ["rgb(184,198,201)", "rgb(118,127,128)"],
        MAIN_DARK: "rgb(255,0,0)",
        MAIN: "#7bf501",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "#C0CED1",
        ACTIVE_TITLE: "rgb(111,108,215)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#fff",
        BOTTOM_BG:"#4f5759",
        BG_VIDEO:require("../assets/videos/waterfall.mp4"),
        BG_IMAGE:require("../assets/images/bg-waves.png")
    }
]

export const ColorSettings = {
    SelectedTheme : 0,
}

export const ChangeTheme = index => {
    ColorSettings.SelectedTheme = index;
    Color = ThemeColors[index];
}

export let Color = ThemeColors[ColorSettings.SelectedTheme];

