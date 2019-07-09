const formatNewUser = (req, res, next) => {
  req.body.name = req.body.name.toLowerCase();
  next();
};


module.exports = {
  formatNewUser
};

