const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const validatePassword = (password) => {
  return password.length >= 8;
};
const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, 'password must be at least 8 characters'],
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  transactions: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Transaction' }],
  },
});

module.exports = mongoose.model('User', UserSchema);
