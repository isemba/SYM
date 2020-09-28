import { Color } from "./Colors";
import Languages, {MoodLanguages} from "./Language";


export const Moods = [
    {title: MoodLanguages.STRESSED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.HAPPY, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.ANXIOUS, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.COMPASSIONED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.DEMOTIVATED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.DEPRESSED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.DISTRACTED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.GRATEFUL, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.IN_PAIN, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.INCAPABLE, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.NEED_SPACE, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.LONELY, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.SAD, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.SLEEPLESS, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.TIRED, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
    {title: MoodLanguages.UNEASY, uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}
];

export const DiscoverList = [
    { 
        title: Languages.SELF_REALISATON, 
        meditations: [
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER }
        ] 
    },
    { 
        title: Languages.QUICK_START, 
        meditations: [
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER }
        ] 
    },
    { 
        title: Languages.ELEMENTS, 
        meditations: [
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER }
        ] 
    },
    { 
        title: Languages.SEVEN_STEPS, 
        meditations: [
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER }
        ] 
    },
    { 
        title: Languages.MEDITATION_WITH_MANTRA, 
        meditations: [
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER },
            { lock: true, color: Color.MENU, title: Languages.POPULAR, desc: Languages.DISCOVER }
        ] 
    }
]

// const PopularColorList = [
//     Color.LIGHT_TEXT_COLOR,
//     Color.MENU,
//     Color.MAIN_DARK,
// ];
//
//
// const popularCards = [
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 4  },
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 5  },
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 2  },
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 1  },
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 8  },
//     { lock: false, colorIndex: 1, title: "", desc: "", imageIndex: 9  },
// ];