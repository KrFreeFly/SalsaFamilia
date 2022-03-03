//отрисовка главной страницы
export const index =  function(req, res) {
    res.render("index.hbs", {
        title : "База данных Salsa Familia",
    });
};