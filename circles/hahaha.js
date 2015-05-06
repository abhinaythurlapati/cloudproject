var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);


mongoose.connect('mongodb://localhost/test');
console.log("hello world");
	var movieSchema = new mongoose.Schema({
		title: { type: String }
	, rating: String
	, releaseYear: Number
	, hasCreditCookie: Boolean
	});

//	Compile a 'Movie' model using the movieSchema as the structure.
//	Mongoose also creates a MongoDB collection called 'Movies' for these documents.
	var Movie = mongoose.model('Movie', movieSchema);
var thor = new Movie({
  title: 'Thor'
, rating: 'PG-13'
, releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, hasCreditCookie: true
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.log(thor);
});

Movie.find(function(err, movies) {
  if (err) return console.error(err);
  console.log(movies);
});
