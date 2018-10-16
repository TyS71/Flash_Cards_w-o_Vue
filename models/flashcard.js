const mongoose = require('mongoose');

let flashcardSchema = new mongoose.Schema({
	front: {
				type: String, 
				required: 'Front can\'t be blank'
			},
	back: {
		type: String, 
		required: 'Back can\'t be blank' 
	},
	category: {
		type: String, 
		required: 'Must be part of a category'
	},
	time_created: {
		type: Date,
		default: Date.now
	}
})

let Flashcard = mongoose.model('flashcard', flashcardSchema);




module.exports = Flashcard; 