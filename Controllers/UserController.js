const UserModel = require('../models/User');

exports.postAddUser = async (req, res, next) => {
  const { email, password, isAdmin } = req.body.user;
  const addedUser = new UserModel({
    username: email,
    password: password,
    email: email,
    isAdmin: isAdmin,
  });
  const users = await UserModel.find({ username: email });
  if (users.length === 0) {
    addedUser.save();
    res.status(200).send(JSON.stringify('ok'));
  } else res.status(400).send(JSON.stringify('Username already exists'));
};

exports.postUserLogIn = async (req, res, next) => {
  const { email, password, isAdmin } = req.body.user;
  //find user trung username va password
  const matchUser = await UserModel.findOne({
    email: email,
    password: password,
    isAdmin: isAdmin,
  });

  if (!!matchUser) {
    req.session.isLogin = true;
    req.session.user = matchUser;
    res.send(JSON.stringify(matchUser));
  } else res.status(501).send(JSON.stringify('error'));
};

exports.getClient = async (req, res, next) => {
  const clients = await UserModel.find({ isAdmin: false });
  console.log(clients);
  res.status(200).send(JSON.stringify(clients));
};

exports.getLogin = async (req, res, next) => {
  if (req.session.isLogin === true) res.send(JSON.stringify(req.session.user));
  else res.status(401).end();
};

exports.getLogOut = async (req, res, next) => {
  req.session.destroy();
  res.end();
};
