const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'secret-jwt-cat', function(err, decoded) {
        if (err) {
            console.error(err.toString());
            //if (err) throw new Error(err)
            return res.status(401).json({"error": true, "message": 'Unauthorized access.', err });
        }
        req.decoded = decoded;
        next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}