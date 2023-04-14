exports.isLogin = async (req, res, next) => {
  if (req.session.isLogin === true) next();
  else res.status(401).end();
};

exports.isAdmin = async (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) next();
    else res.status(401).end();
  } else res.status(401).end();
};
