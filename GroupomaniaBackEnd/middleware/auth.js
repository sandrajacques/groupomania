const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("verification token");
        console.log(token);
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;

        if (!userId) {
            throw "Invalid user ID";
        } else {
            req.auth = { userId };
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
