const transactionModel = require('../models/Transaction');
const userModel = require('../models/User');
const hotelModel = require('../models/Hotel');
const roomModel = require('../models/Room');
const mongoose = require('mongoose');

exports.addTransaction = async (req, res, next) => {
  const body = req.body;
  const user = await userModel.findOne({ username: body.user });
  const hotel = await hotelModel.findOne({ name: body.hotel });
  const roomIds = [];
  body.bookedRooms.forEach((element) => {
    roomIds.push(element.roomId);
  });
  const bookedRooms = await roomModel.find().where('_id').in(roomIds);
  const newTrans = new transactionModel({
    user: user,
    hotel: hotel,
    room: bookedRooms,
    payment: body.Payment,
    dateStart: body.dateStart,
    dateEnd: body.dateEnd,
    price: body.Total,
    status: body.status,
    _id: new mongoose.Types.ObjectId(),
  });
  await user.updateOne({ $push: { transactions: newTrans._id } });
  // them transactions vao room
  bookedRooms.forEach(async (room) => {
    await room.updateOne({ $push: { transactions: newTrans._id } });
  });
  await newTrans.save();
};

exports.transactionByUserId = async (req, res, next) => {
  const userId = req.params.user;
  const trans = await transactionModel
    .find({ user: userId })
    .populate('hotel')
    .populate('room');
  res.send(JSON.stringify(trans));
};

exports.getTransactions = async (req, res, next) => {
  const trans = await transactionModel
    .find()
    .populate('hotel')
    .populate('user')
    .populate('room');
  res.status(200).send(JSON.stringify(trans));
};
