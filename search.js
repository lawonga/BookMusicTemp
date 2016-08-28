/**
 * Created by tal on 8/28/16.
 */

var data = require("./database.js");

module.exports = function(desired) {
    var minError = Math.abs(desired - data[0].valence);
    var minTrack = data[0].id;

    data.forEach(function(element) {
        var error = Math.abs(desired - element.valence);
        if (error < minError) {
            minError = error;
            minTrack = element.id;
        }
    });

    return element.id;
};
