const connect = require("../db_connection");
//Créer un like
exports.createLike = (req, res) => {
    //try permet de gérer les erreurs sans bloquer le back end
    try {
        const likeObject = req.body;
        console.log("vérification du like");
        console.log(likeObject);
        /*  if (req.auth.userId.toString() !== req.body.idAuthor.toString()) {
            res.status(401).json({
                message: "Vous n'êtes pas autorisé à créer ce post",
            });
            return;
        } */
        console.log(likeObject);
        connect.query(
            `INSERT  INTO likes (posts_id, idAuthor) VALUES (${likeObject.postId}, ${likeObject.idAuthor})`,
            function (error, result, fields) {
                console.log(result);
                if (error) {
                    res.status(500).json({ error });
                    return;
                }

                connect.query(
                    "SELECT * FROM likes where posts_id = " + likeObject.postId,
                    function (error, result, fields) {
                        if (error) {
                            res.status(500).json({ error });
                            return;
                        }

                        res.status(201).json(result);
                    }
                );
            }
        );
    } catch (erreur) {
        console.log(erreur);
        res.status(400).json({ erreur });
    }
};
//Afficher tous les Likes
exports.getAllLikes = (req, res, next) => {
    connect.query(
        "SELECT * FROM likes where posts_id = " + req.params.id,
        function (error, result, fields) {
            if (error) res.status(500).json({ error });
            //console.log(result);
            res.status(200).json(result);
        }
    );
};
