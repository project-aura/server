const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    attributes: {
        Aura: String,
    },
    img: String,
    categories: String,
    
}, { timestamps: true, }, // mongo creates the timestamp
);

const Fake = mongoose.model('fake', schema);

module.exports = Fake;