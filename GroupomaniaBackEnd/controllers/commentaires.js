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