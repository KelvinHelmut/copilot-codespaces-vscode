// Create web server

// Load modules
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Create schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Set up body-parser
router.use(bodyParser.urlencoded({extended: true}));

// Set up routes
router.get('/', function(req, res) {
  res.render('form');
});

router.post('/', function(req, res) {
  var newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });

  newComment.save(function(err, Comment) {
    if (err) {
      res.send('Error saving comment.');
    } else {
      console.log(Comment);
      res.redirect('/comments');
    }
  });
});

router.get('/comments', function(req, res) {
  Comment.find({}, function(err, data) {
    if (err) {
      res.send('Error retrieving comments.');
    } else {
      res.render('comments', {comments: data});
    }
  });
});

// Export router
module.exports = router;