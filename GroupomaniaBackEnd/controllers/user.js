const connect = require("../db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log("login");
    console.log(req.body);
    connect.query(`SELECT * FROM utilisateurs WHERE email = "${req.body.email}"`, function (error, result, fields) {
        if (error){
            res.status(500).json({ message: JSON.stringify(error) });
            return;
        };        
        console.log(result);
        if (result.length == 0) {
            res.status(401).json({ message: "Utilisateur non trouvé !" });
            return;}
        const utilisateur = result[0];
        if (utilisateur.password == req.body.password) {    
        res.status(200).json({message:"utilisateur authentifié"});
        }else{
            res.status(401).json({ message: "Mot de passe incorrect !" });
        }
    });

    //res.status(500).json({"message": "authentification réussie"});

   /*  User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error })); */
};
exports.profil = (req, res, next) => {
    console.log(req.body);
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
