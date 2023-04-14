const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
  },
  featured: {
    type: String,
    required: true,
  },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    required: true,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model('Hotel', HotelSchema);
