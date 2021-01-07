const ThemeColors = [
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
        LIGHT_TEXT_COLOR: "#fff"
    },
    {
        MAIN_BG_GRADIENT: ["rgb(109,71,43)", "rgb(47,23,16)"],
        HEADER_GRADIENT: ["rgb(213,239,119)", "rgb(103,179,87)"],
        MAIN_DARK: "rgb(255,0,0)",
        MAIN: "#7bf501",
        LIGHT: "#e0b6a0",
        MENU: "rgb(11,0,0)",
        TITLE: "rgba(48,16,62, 0.4)",
        MOOD_BG: "rgb(98,150,100)",
        ACTIVE_TITLE: "rgb(111,108,215)",
        DARK_TEXT_COLOR: "#000",
        LIGHT_TEXT_COLOR: "#a3f304"
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

