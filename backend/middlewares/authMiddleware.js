import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

dotEnv.config();

const isAuthenticated = (req, res, next) => {
    if (!req.cookies.token)
        return res.status(401).json({ error: "Unauthorized Access!" });

    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({ error: "Unauthorized Access!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
};

export { isAuthenticated };