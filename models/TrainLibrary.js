const mongoose = require('mongoose');

const trainLibrarySchema = new mongoose.Schema({
    train_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['aerobic', 'anaerobic', 'streching', 'other'],
        required: true
    },
    note: {
        type: String
    }
});

module.exports = mongoose.model('TrainLibrary', trainLibrarySchema);