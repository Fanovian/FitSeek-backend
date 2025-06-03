const mongoose = require('mongoose');

const foodLibrarySchema = new mongoose.Schema({
    food_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['staple', 'vegetable', 'fruit', 'meat', 'diary', 'snack', 'drink', 'other'],
        required: true
    },
    note: {
        type: String
    }
});

module.exports = mongoose.model('FoodLibrary', foodLibrarySchema);