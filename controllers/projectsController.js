exports.getProjects = function (require, response) {
    response.render("projects.hbs", {
        title: "Проекты",
    });
};
