var model = require("./model");
var mongoose = require("mongoose");

var kermit = {
    firstname: "Kermit",
    salutation: "Mr.",
    addresses: [
        {street: "sesamestreet 1", zip: "11111", country: "tv"}
    ]
}
var goofy = {
    firstname: "Goofy",
    salutation: "Mr.",
    addresses: [
        {street: "sesamestreet 2", zip: "11111", country: "tv"}
    ]
}

// Clear the database of old vegetables
mongoose.model('User').remove(function (error) {
    if (error) throw error;

    // Put the fresh vegetables in the database
    mongoose.model('User').create([kermit, goofy], function (error) {
        if (error) throw error;
    });
});
var post1 = {
    title: "",
    rating: 2,
    text: "this is a great halleluja about kermit."

}