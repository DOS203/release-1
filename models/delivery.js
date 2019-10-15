const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const deliverySchema = new Schema({
    streetNumber: {
        type: String,
        required: false
    },
    streetName: {
        type: String,
        required: false
    },
    suburb: {
        type: String,
        required: false
    },
    postcode: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    estDel: {
          type: Date,
          default: new Date(+new Date() + 2*24*60*60*1000)
        },
    DeliveryDate: {
        type: String,
        required: false
    },
    DeliveryTime: {
        type: String,
        required: false
    },});

mongoose.model('delivery', deliverySchema);
