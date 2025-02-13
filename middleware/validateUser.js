import jwt from "jsonwebtoken";

export const validateUser = (req, res, next) => {
  const accesstoken = req.headers["authorization"]?.split(" ")[1];
  if (!accesstoken) return res.sendStatus(401);

  jwt.verify(accesstoken, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.email = decoded.email;
    next();
  });
};
