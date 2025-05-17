import jwt from "jsonwebtoken";
import initModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Unauthorization" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user_id = decoded.user_id;

    next();
  });
};

const verifyIsSuperAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Unauthorization" });

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const role = await initModels(sequelize).roles.findOne({
        where: {
          role_id: decoded.role_id,
        },
      });

      if (role.name !== "ADMIN") {
        return res.sendStatus(403);
      }

      next();
    });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden", error });
  }
};

export { verifyToken, verifyIsSuperAdmin };
