import jwt from "jsonwebtoken"
import { jwtSecret } from '../constants'

export const auth = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.jwt ;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        req.cookies.userId = decodedToken._id
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
