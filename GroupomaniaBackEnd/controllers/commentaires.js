const connect = require("../db_connection");


exports.getAllCommentaires = (req, res, next) => {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "groupomania"
    });

    con.connect(function (err) {
        if (err) res.status(500).json({ error });
        con.query("SELECT * FROM commentaires", function (err, result, fields) {
            if (err) res.status(500).json({ error });
            console.log(result);
            res.status(200).json(result)
        });
    });
};

exports.createCommentaire = (req, res, next) => {
    //try permet de gérer les erreurs sans bloquer le back end
    try {
        console.log(req.body);
        console.log(req.body.message);
       
        
    /*  if(req.auth.userId.toString() !==req.body.userId.toString()) {
                    
            res.status(401).json({message: "Vous n'êtes pas autorisé à créer ce post"})
            return;
        }
        let imageUrl='';
        if(req.file && req.file.filename)
            imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`; */

        connect.query(
            `INSERT  INTO commentaires (message) VALUES ("${req.body.message}")`,
            function (error, result, fields) {
                
                console.log(result);
                if (error) res.status(500).json({ error });

                connect.query("SELECT * FROM commentaires ", function (error, result, fields) {
                    if (error) res.status(500).json({ error });
                
                    res.status(201).json(result);
                });
            }
        );
    } catch (erreur) {
        console.log(erreur);
        res.status(400).json({ erreur });
    }
};
//afficher un seul commentaire
exports.getOneCommentaires = (req, res, next) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "groupomania"
    });

    con.connect(function (err) {
        if (err) res.status(500).json({ error });
        con.query(`SELECT * FROM commentaires WHERE id = ${req.params.id}`, function (err, result, fields) {
            if (err) res.status(500).json({ error });
            console.log(result);
            res.status(200).json(result)
        });
    });
};