var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define schema and model
var address = new Schema({
    type: String,
    street: String,
    zip: String,
    country: String
}, {_id: false});
var Address = mongoose.model('Address', address);

var user = new Schema({
    firstname: String,
    salutation: {type: "String", enum: ["Mr.", "Mrs."], required:true},
    birthday: Date,
    friends: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ],
    addresses: [address]
});
user.options.gform = {labelAttribute: "firstname"}
var User = mongoose.model('User', user);

// define a tab group for the BlogPost administration
var group = {
    editor: "tab",
    groups: [
        {code: "general", label: "General"},
        {code: "text", label: "Text"}
    ]
}

var blogpost = Schema({
    title: String,
    tags: [String],
    rating: Number,
    text: { type: String},
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}, {gform: {group: group}})

// add additional gform information to the text property.
blogpost.paths.text.options.gform = {
    groupCode: "text",
    label: "The blog entry",
    description: "this should be really interesting stuff.",
    editor: "textarea"
};

var BlogPost = mongoose.model('BlogPost', blogpost);


module.exports.BlogPost = BlogPost;
module.exports.Address = Address;
module.exports.User = User;
