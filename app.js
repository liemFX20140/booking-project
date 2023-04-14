const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpSession = require('express-session');
const cookieParser = require('cookie-parser');
const isLogin = require('./Auth/isAuth').isLogin;
const app = express();
/// middleware
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['POST', 'PUT', 'GET', 'HEAD', 'OPTIONS'],
    credentials: true,
  })
);
app.use(
  ExpSession({
    resave: false,
    secret: 'SESS_SECRET',
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
mongoose.set('strictQuery', false);
app.use(express.json());
/// routes
const userRoute = require('./routes/UserRoute');
const hotelRoute = require('./routes/HotelRoute');
const roomRoute = require('./routes/RoomRoute');
const transactionRoute = require('./routes/TransactionRoute');

app.use(userRoute);
app.use(hotelRoute);
app.use(roomRoute);
app.use(isLogin, transactionRoute);

mongoose
  .connect(
    'mongodb+srv://liemhup:GAhMEdoZcXuoma96@asm2cluster.wvmbxyy.mongodb.net/asm2'
  )
  .then((res) =>
    app.listen((port = 5000), () => {
      console.log('Start at port', port);
    })
  )
  .catch((err) => {
    console.log(err);
  });
