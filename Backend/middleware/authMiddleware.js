import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;
  const token = bearerToken || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    req.user = { id: decoded.id };
    next();
  });
};

export default protect;
