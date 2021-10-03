exports.transformDate = function (rawDate) {
    let correctDate = new Date(rawDate);
    return `${correctDate.getDate()}.${correctDate.getMonth()+1}.${correctDate.getFullYear()}`
}

/*export const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'salsafamilia',
    password: '4815162342'
});*/