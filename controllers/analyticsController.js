exports.getAnalytics = function (request, response) {
    response.render("analytics.hbs", {
        title: "Аналитика",
    });
};

//TODO: write a basic analytics controller: all income and expenses dor 2022 year

//TODO: add filtering and additional functions to analytics