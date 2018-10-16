const express = require('express'),
			app = express(),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose');
			methodOverride = require('method-override'),
			axios = require('axios');
      
const db = require('./models');

mongoose.connect('mongodb://localhost/flashcards');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, resp){
	resp.sendFile('./index.html');
})

app.get('/api/flashcards', function(req, resp){
	db.Flashcard.find()
	.then(function(flashcards){
		resp.send(flashcards);
	}).catch(function(err){
		resp.send(err);
	})
});

app.post('/api/flashcards', function(req, resp){
	db.Flashcard.create(req.body)
	.then(function(newFlashcard){
		resp.redirect('/');
	}).catch(function(err){
		resp.send(err);
	})
});

app.get('/api/flashcards/:id', function(req, resp){
	db.Flashcard.findById(req.params.id)
	.then(function(flashcard){
		resp.json(flashcard);
	}).catch(function(err){
		resp.send(err);
	})
});

app.put('/api/flashcards/:id', function(req,resp){
	db.Flashcard.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(function(flashcard){
		resp.json(flashcard);
	}).catch(function(err){
		resp.send(err);
	})
});

app.delete('/api/flashcards/:id', function(req, resp){
	db.Flashcard.findByIdAndDelete(req.params.id)
	.then(function(){
		resp.send('Item was deleted');
	}).catch(function(err){
		resp.send(err);
	})
});

app.listen(8000, function(){
	console.log('flashcards app server is running...'); 
});
