const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransSchema = new Schema({
  user: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  hotel: { type: mongoose.Types.ObjectId, ref: 'Hotel', require: true },
  room: {
    required: true,
    type: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
  },
  dateStart: {
    required: true,
    type: Date,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Transaction', TransSchema);
