exports.transformDate = function (rawDate) {
    let correctDate = new Date(rawDate);
    return `${correctDate.getDate()}.${correctDate.getMonth()+1}.${correctDate.getFullYear()}`
}

exports.query = function (sqlQuery, arg) {
    return new Promise(function (resolve, reject) {
        pool.query(sqlQuery, arg, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.transformData = function (arr) {
    return arr = arr.map(item => {
        return item = item.dataValues;
    });
};