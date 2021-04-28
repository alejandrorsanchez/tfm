const jwt = require('jsonwebtoken');
const env = require('../enviroment');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.decode(token, env.SECRET_KEY);
  req.username = payload.username;
  next();
}
