const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  hotel: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
  roomNumber: { type: Number, require: true },
  roomType: { type: mongoose.Types.ObjectId, ref: 'RoomType' },
  transactions: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Transaction' }],
  },
  title: {
    required: true,
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  maxPeople: {
    required: true,
    type: Number,
  },
  desc: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
