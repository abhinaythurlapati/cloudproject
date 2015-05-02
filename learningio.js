var prompt = require('sync-prompt').prompt;

var name = prompt('What is your name? ');
// User enters "Mike".

console.log('Hello, ' + name + '!');
// -> Hello, Mike!

var hidden = true;
var password = prompt('Password: ', hidden);
// User enters a password, but nothing will be written to the screen.
