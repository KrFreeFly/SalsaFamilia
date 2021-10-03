//отрисовка главной страницы
exports.index =  function(req, res) {
    res.render("index.hbs", {
        title : "База данных Salsa Familia",
    });
};