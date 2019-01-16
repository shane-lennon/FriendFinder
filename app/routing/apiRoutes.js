var path = require('path');
var friends = require('../data/friends');

module.exports = function (app) {

    app.get("/api/friends", function (request, response) {
        console.log(request.url);
        response.json(friends);
    });

    // Create New Friend Profile - takes in JSON input
    app.post("/api/friends", function (request, response) {
        // request.body hosts is equal to the JSON post sent from the form submit button
        // This works because of our body parsing middleware
        var newFriend = request.body;
        var matchPosition = 0;
        var matchDifference = 99999999;

        for (let i = 0; i < friends.length; i++) {
            var difference = totalDifference(newFriend.scores, friends[i].scores);
            console.log(friends[i].name);
            console.log("Total Difference is: " + difference + "\n");
            

            if (difference < matchDifference) {
                matchDifference = difference;
                matchPosition = i;
            }
        }

        console.log(newFriend);
        var match = friends[matchPosition];

        friends.push(newFriend);
        console.log(match);
        response.json(match);
        //console.log(friends)
    });
}

function totalDifference(array1, array2) {
    var difference = []

    for (i = 0; i < array1.length; i++) {
        difference[i] = Math.abs(array1[i] - array2[i]);
    }
    
    return difference.reduce(add, 0);
}

function add(a, b) {
    return a + b;
}