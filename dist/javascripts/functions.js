export const transformDate = function (rawDate) {
    let correctDate = new Date(rawDate);
    return `${correctDate.getDate()}.${correctDate.getMonth()+1}.${correctDate.getFullYear()}`
}

export const transformData = function (arr) {
    return arr.map(item => {
        return item.dataValues;
    });
};