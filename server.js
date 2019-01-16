// Dependencies
// =============================================================
var express = require("express");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the express app to handle routes
// =============================================================

require('./app/routing/apiRoutes.js')(app);
// =================================================================================
// It is important to note: sequence matters in which route is listed first here.
// Since the 'catch-all' route which defaults to the main page is at the end of the 
// htmlroutes file, it will break any routes that are defined afterward. If a number
// of routing files are used then wildcard defaults should be at the end of the very 
// last one. Anything listed after will never 'get fired'. Also, nodemon rules.
// =================================================================================
require('./app/routing/htmlRoutes.js')(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
}); 