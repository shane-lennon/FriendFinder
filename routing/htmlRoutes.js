var path = require('path');

module.exports = function (app) {

    app.get("/", function (request, response) {
        console.log(request.url);
        response.sendFile(path.join(__dirname, "/../public/index.html"));
    });

    app.get("/survey", function (request, response) {
        console.log(request.url);
        response.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // Catch-all will send any other path back to main path
    app.get('*',function (request, response) {
        response.redirect('/');
    });
}