const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      errorMessage: "No token. Authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.log("jwt error: ", err);
    res.status(401).json({
      errorMessage: "Invalid token",
    });
  }
};
