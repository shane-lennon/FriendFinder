var fs = require('fs');
var friends = require('../data/friends.json');

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
        var matchPosition = 0;          // Defaults to first profile in data array
        var matchDifference = 0xF5;     // Initial value must exceed highest possible. So...Fleventy-five 

        // Loop through friends array compare total diffence between each and new friend data 
        for (let i = 0; i < friends.length; i++) {
            var difference = totalDifference(newFriend.scores, friends[i].scores);
            console.log(friends[i].name);
            console.log("Total Difference is: " + difference + "\n");
            
            // Determines position of closest (or first exact match) 
            if (difference < matchDifference) {
                matchDifference = difference;
                matchPosition = i;
            }
        }

        console.log(newFriend);
        var match = friends[matchPosition];

        // Append new friend object to data array and return best match for modal display 
        friends.push(newFriend);
        console.log(match);
        response.json(match);

        // Maintain data persistence in file
        fs.writeFile('./data/friends.json', JSON.stringify(friends), 'utf8', function(err){
            if (err) throw err;
        });
    });
}

// Input: Two arrays (of same length or it breaks)
// Output: Takes the absolute value of the difference between each at every index and returns the sum
function totalDifference(array1, array2) {
    var difference = [];
    for (i = 0; i < array1.length; i++) {
        difference[i] = Math.abs(array1[i] - array2[i]);
    }
    return difference.reduce((a,b) => a + b, 0);
}