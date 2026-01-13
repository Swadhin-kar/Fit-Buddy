import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  // console.log("Cookies received:", req.cookies);

  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default protect;