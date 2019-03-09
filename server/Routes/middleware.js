const formatNewUser = (req, res, next) => {
  console.log(req.session);
  next();
};


module.exports = {
  formatNewUser
};

