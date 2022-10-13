const fs = require("fs");
const connect = require("../db_connection");

exports.createPost = (req, res) => {
    //try permet de gérer les erreurs sans bloquer le back end
    try {
        const postObject = JSON.parse(req.body.post);

        if (req.auth.userId.toString() !== req.body.idAuthor.toString()) {
            res.status(401).json({
                message: "Vous n'êtes pas autorisé à créer ce post",
            });
            return;
        }
        let imageUrl = "";
        if (req.file && req.file.filename)
            imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        console.log(postObject);
        connect.query(
            `INSERT  INTO posts (contenu, imgUrl, horodatage, idAuthor) VALUES ("${postObject.contenu}", "${imageUrl}", "${postObject.horodatage}","${postObject.idAuthor}")`,
            function (error, result, fields) {
                console.log(result);
                if (error) {
                    res.status(500).json({ error });
                    return;
                }

                connect.query(
                    "SELECT * FROM posts order by horodatage desc",
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

//afficher un seul post
exports.getOnePosts = (req, res, next) => {
    connect.query(
        `SELECT * FROM posts WHERE id = ${req.params.id}`,
        function (err, result, fields) {
            if (err) res.status(500).json({ error });
            console.log(result);
            res.status(200).json(result);
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                }`,
        }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deletePosts = (req, res, next) => {
    /*  if(req.auth.userId.toString() !==req.body.userId.toString()) {
                    
        res.status(401).json({message: "Vous n'êtes pas autorisé à créer ce post"})
        return;
    } */
    try {
       /*  console.log("requete photo");
        console.log(req.headers);
        const filename = req.headers.photo.split("/images/")[1];

        fs.unlink(`images/${filename}`, () => {//supprimer l'image de la sauce à supprimer */
            connect.query(
                `DELETE FROM posts WHERE id=${req.params.id};DELETE FROM commentaires WHERE posts_id=${req.params.id}`,
                function (error, result, fields) {
                    if (error) res.status(500).json({ error });

                    res.status(200).json({ message: "Posts supprimé avec succés !" });
                });
        //});
    } catch (error) {
res.status(500).json({ error });
    }
};
//affiche la liste de tous les posts
exports.getAllPosts = (req, res, next) => {
    connect.query(
        "SELECT * FROM posts order by horodatage desc",
        function (error, result, fields) {
            if (error) res.status(500).json({ error });
            //console.log(result);
            res.status(200).json(result);
        }
    );
};

