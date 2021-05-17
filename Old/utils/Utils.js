import {CONTENT_URL} from "../environement";

export const getMeditationGroups = list => {
    const groups = [];
    let groupIndex = -1;
    for(let i = 0; i < list.length; i++){
        const med = list[i];

        if(i % 2 === 0){
            groupIndex++;
            groups[groupIndex] = [];
        }

        groups[groupIndex].push(med);
    }

    return groups;
}

export const fixUrls = list => {
    list.forEach(item => {
        //console.log(item)
        if(item.image){
            item.image = CONTENT_URL + item.image;
        }

        if(item.url){
            item.url = CONTENT_URL + item.url;
        }
        if(item.audio){
            item.audio = CONTENT_URL + item.audio;
        }
        if(item.video){
            item.video = CONTENT_URL + item.video;
        }

    });
}
