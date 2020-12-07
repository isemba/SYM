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
