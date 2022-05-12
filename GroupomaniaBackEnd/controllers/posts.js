const fs = require("fs");
const connect = require("../db_connection");

exports.createPost = (req, res, next) => {
    //try permet de gérer les erreurs sans bloquer le back end 
    try { 
        console.log(req.body);
    const postObject = (req.body.post);

    connect.query(`INSERT  INTO posts (contenu) VALUES ("${postObject.contenu}")`, function (error, result, fields){

        if (error) res.status(500).json({ error });
        
        res.status(201).json({ message: "Post ajouté avec succés !" })
    }); 
        
    } catch (erreur) {
        res.status(400).json({ erreur })
    }
    
}


        
        
//afficher un seul post
exports.getOnePosts = (req, res, next) => {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "groupomania"
    });

    con.connect(function (err) {
        if (err) res.status(500).json({ error });
        con.query(`SELECT * FROM posts WHERE id = ${req.params.id}`, function (err, result, fields) {
            if (err) res.status(500).json({ error });
            console.log(result);
            res.status(200).json(result)
        });

        
    });
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
        connect.query(`DELETE FROM posts WHERE id=${req.params.id};DELETE FROM commentaires WHERE posts_id=${req.params.id}`, function (error, result, fields){
            if (error) res.status(500).json({ error });
            
            res.status(200).json({ message: "Posts supprimé avec succés !" })
        }); 
        
        /*Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() =>
                            res.status(200).json({ message: "Objet supprimé !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                });
            })
            .catch((error) => res.status(500).json({ error }));*/
    };
    //affiche la liste de tous les posts
    exports.getAllPosts = (req, res, next) => {         
            connect.query("SELECT * FROM posts", function (error, result, fields) {
                if (error) res.status(500).json({ error });
                //console.log(result);
                res.status(200).json(result)
            });              
    };
    
    exports.like = (req, res, next) => {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                switch (req.body.like) {
                    case 1:
                        let compteurLikes = sauce.likes || 0;
                        compteurLikes++;
                        let users = sauce.usersLiked || [];
                        users.push(req.body.userId);
                        Sauce.updateOne(
                            { _id: req.params.id },
                            { likes: compteurLikes, usersLiked: users }
                        )
                            .then(() => {
                                console.log("liké");
                                res.status(200).json({ message: "liké ok !" });
                            })

                            .catch((error) => {
                                console.log(error);
                                res.status(400).json({
                                    error: error,
                                });
                            });
                        break;
                    case -1:
                        let compteurDislikes = sauce.dislikes || 0;
                        compteurDislikes++;
                        let users2 = sauce.usersDisliked || [];
                        users2.push(req.body.userId);
                        Sauce.updateOne(
                            { _id: req.params.id },
                            { dislikes: compteurDislikes, usersDisliked: users2 }
                        )
                            .then(() => {
                                console.log('disliké');
                                res.status(200).json({ message: "disliké ok !" });
                            })

                            .catch((error) => {
                                res.status(400).json({
                                    error: error,
                                });
                            });
                        break;
                    default:
                        if (sauce.usersLiked.includes(req.body.userId)) {
                            let compteurLikes = sauce.likes || 0;
                            compteurLikes--;
                            let users = sauce.usersLiked || [];
                            users = users.filter(uId => uId != req.body.userId);
                            Sauce.updateOne(
                                { _id: req.params.id },
                                { likes: compteurLikes, usersLiked: users }
                            )
                                .then(() => {
                                    console.log("retrait du like");
                                    res.status(200).json({ message: "retrait du like ok !" });
                                })

                                .catch((error) => {
                                    console.log(error);
                                    res.status(400).json({
                                        error: error,
                                    });
                                });
                        }
                        else {
                            let compteurDislikes = sauce.dislikes || 0;
                            compteurDislikes--;
                            let users2 = sauce.usersDisliked || [];
                            users2 = users2.filter(u2Id => u2Id != req.body.userId);
                            Sauce.updateOne(
                                { _id: req.params.id },
                                { dislikes: compteurDislikes, usersDisliked: users2 }
                            )
                                .then(() => {
                                    console.log("retrait du dislike");
                                    res.status(200).json({ message: "retrait du dislike ok !" });
                                })

                                .catch((error) => {
                                    res.status(400).json({
                                        error: error,
                                    });
                                });
                        }
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({
                    error: error,
                });
            });
    };
