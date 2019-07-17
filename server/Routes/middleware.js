const formatNewUser = (req, res, next) => {

  function _getRandomProfileAvatar() {
    const avatars = [
      "/img/avatar-1.png",
      "/img/avatar-2.png",
      "/img/avatar-3.png",
      "/img/avatar-4.png",
      "/img/avatar-5.png",
      "/img/avatar-6.png",
    ];
    const randomIdx = Math.abs(Math.floor(Math.random() * avatars.length - 1));
    return avatars[randomIdx];
  }

  req.body.name = req.body.name.toLowerCase();
  if (!req.body.imageUrl) {
    req.body.imageUrl = _getRandomProfileAvatar();
  }

  next();
};


module.exports = {
  formatNewUser
};

