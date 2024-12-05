const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;



// ehdotus
// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const { userId } = jwt.verify(token, process.env.JWT_SECRET); // Tarkista JWT
//     req.user = await User.findById(userId).select("_id"); // Hae käyttäjä
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Request is not authorized" });
//   }
// };
