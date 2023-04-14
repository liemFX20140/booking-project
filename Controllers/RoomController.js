const mongoose = require('mongoose');
const RoomModel = require('../models/Room');
const HotelModel = require('../models/Hotel');

exports.getRoom = async (req, res) => {
  const rooms = await RoomModel.find();
  res.send(JSON.stringify(rooms));
};

exports.delRoomById = async (req, res) => {
  const id = req.params.id;
  const room = await RoomModel.findOne({ _id: id });
  if (room.transactions.length === 0) {
    await room.remove();
    const rooms = await RoomModel.find();
    res.status(200).send(JSON.stringify(rooms));
  } else {
    res.status(500).send(JSON.stringify('This room has a transaction'));
  }
};

exports.addRoom = async (req, res) => {
  const { price, desc, rooms, title, hotel, maxPeople } = req.body.room;
  const roomNumbers = rooms.split(',');
  try {
    const hotelById = await HotelModel.findById(hotel);
    const newRoom = new RoomModel({
      hotel: hotelById,
      title: title,
      maxPeople: maxPeople,
      price: price,
      desc: desc,
      roomNumbers: roomNumbers,
      _id: new mongoose.Types.ObjectId(),
      createdAt: Date.now(),
    });
    await hotelById.updateOne(
      hotel,
      { $push: { rooms: newRoom._id } },
      { new: true }
    );
    await newRoom.save();
    res.status(200).send(JSON.stringify('OK'));
  } catch {
    (err) => console.log(err);
  }
};

exports.editRoom = async (req, res, next) => {
  const { _id, price, desc, rooms, title, maxPeople } = req.body.room;
  const roomNumbers = rooms.split(',');
  await RoomModel.findByIdAndUpdate(
    _id,
    { price, desc, rooms: roomNumbers, title, maxPeople, updateAt: Date.now() },
    { new: true }
  );
  res.status(200).send(JSON.stringify('Room has been edited'));
};
