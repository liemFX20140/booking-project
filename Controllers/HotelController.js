const HotelModel = require('../models/Hotel');
const TransModel = require('../models/Transaction');

const isDateOverlap = (startDate1, endDate1, startDate2, endDate2) => {
  let s1 = new Date(startDate1).getTime();
  let e1 = new Date(endDate1).getTime();
  let s2 = new Date(startDate2).getTime();
  let e2 = new Date(endDate2).getTime();
  return (s1 > s2 && s1 < e2) || (s1 < s2 && s2 < e1);
};

exports.getHotel = async (req, res, next) => {
  const hotels = await HotelModel.find();
  res.send(JSON.stringify(hotels));
};

exports.findHotel = async (req, res, next) => {
  const { destination, date, options } = req.body;
  const Peoples = Number(options.adult) + Number(options.children);
  console.log(Peoples);
  const results = await HotelModel.find().populate('rooms');
  const hotelsAtDestination = results.filter((hotel) =>
    hotel.city
      .replaceAll(' ', '')
      .toLowerCase()
      .includes(destination.replaceAll(' ', '').toLowerCase())
  );
  let hotelHasRoom = [];
  hotelsAtDestination.forEach((hotel) => {
    let availableRoom = [];
    hotel.rooms.forEach((room) => {
      if (room.maxPeople < Peoples) return;
      if (!room.trasactions) availableRoom.push(room);
      else {
        const isBooked = room.transactions.filter((transactions) => {
          isDateOverlap(
            transactions.dateStart,
            transactions.dateEnd,
            date.startDate,
            date.endDate
          );
        });
        if (!isBooked) availableRoom.push(room);
      }
    });
    if (availableRoom && availableRoom.length >= options.room) {
      hotelHasRoom.push(hotel);
    }
  });
  res.send(JSON.stringify(hotelHasRoom));
};

exports.findHotelById = async (req, res, next) => {
  const id = req.params.id;
  const hotelById = await HotelModel.findOne({ _id: id }).populate({
    path: 'rooms',
    populate: { path: 'transactions' },
  });
  res.send(JSON.stringify(hotelById));
};

exports.deleteHotelById = async (req, res, next) => {
  const id = req.params.id;
  const hotel = await HotelModel.findOne({ _id: id });
  const trans = await TransModel.find({ hotel: hotel._id });
  if (trans.length === 0) {
    await hotel.remove();
    const hotels = await HotelModel.find();
    res.status(200).send(JSON.stringify(hotels));
  } else {
    res.status(500).send(JSON.stringify('This hotel has a transaction'));
  }
};

exports.addNewHotel = async (req, res, next) => {
  const {
    name,
    address,
    cheapestPrice,
    desc,
    distance,
    featured,
    photos,
    rooms,
    type,
    title,
    city,
    rating,
  } = req.body.hotel;
  const hotel = new HotelModel({
    name: name,
    address: address,
    cheapestPrice: cheapestPrice,
    desc: desc,
    distance: distance,
    featured: featured,
    photos: [photos],
    rooms: [rooms],
    type: type,
    title: title,
    city: city,
    rating,
  });
  const hotelByName = await HotelModel.find({ name: name });
  if (hotelByName.length === 0) {
    hotel.save();
    res.status(200);
  } else {
    res.status(501).send(JSON.stringify('Duplicated'));
  }
};

exports.editHotel = async (req, res, next) => {
  const {
    name,
    address,
    cheapestPrice,
    desc,
    distance,
    featured,
    photos,
    _id,
    type,
    title,
    city,
    rating,
  } = req.body.hotel;
  await HotelModel.findByIdAndUpdate(
    _id,
    {
      name,
      address,
      cheapestPrice,
      desc,
      distance,
      featured,
      photos,
      type,
      title,
      city,
      rating,
    },
    { new: true }
  );
  res.status(200).send(JSON.stringify('Hotel have been edited'));
};
