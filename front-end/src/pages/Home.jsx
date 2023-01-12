import { useEffect, useState, useContext, useRef } from 'react'
import Post from '../composants/Post'
import { UserContext } from '../context/Context';
import { useNavigate } from "react-router-dom";



/*utilisation de useEffect pour charger les données du backend au lancement de la page*/
function Home() {
    const { user } = useContext(UserContext);
    const [listPost, setListPost] = useState([])

    const [inputContenu, setInputContenu] = useState('');
    const [inputUpdateContenu, setInputUpdateContenu] = useState('');

    const [inputImg, setInputImg] = useState('');
    const [inputUpdateImg, setInputUpdateImg] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [updateIdPost, setUpdateIdPost] = useState('');

    const [updateImgFile, setUpdateImgFile] = useState(null);

    const inputImgRef = useRef(null);

    let navigate = useNavigate();
    useEffect(() => {// cette fonction s'execute à l'ouverture de la page en cours
        if (!user.token) {//vérification que l'utilisateur est authentifié
            navigate('/');
        }
        const token = user.token;
        fetch('http://localhost:3001/api/posts', {//affichage des Post
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setListPost(data))
            .catch(err => alert(err))
    }, [])

    function ajouterPost() {

        const postContenu = new FormData();//insérer un fichier dans un formulaire html
        postContenu.append("post", JSON.stringify({
            contenu: inputContenu, horodatage: new Date().toISOString(), idAuthor: user.id
        }));
        postContenu.append("image", inputImg);
        postContenu.append('idAuthor', user.id);


        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body: postContenu
            // body: JSON.stringify({ post: { contenu: inputContenu } }) })

        }).then(res => {
            if (res.status === 201) {
                res.json()
                    .then(nouvelleListPosts => {
                        setInputContenu('');
                        setInputImg('');
                        inputImgRef.current.value = null;
                        console.log('affichage nouvelle liste');
                        console.log(nouvelleListPosts);
                        setListPost(nouvelleListPosts);
                    })
            }
            else {
                alert('erreur: ', res.status);
            }
        }
        )
            .catch(err => alert('erreur: ', err));
    }
    //supprimer un post
    function supprimerUnPost(idPost, lienImage) {
        //supprimer sur le backend

        fetch('http://localhost:3001/api/posts/' + idPost, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
                photo: lienImage
            },
        })
            .then(res => {
                if (res.status === 200) {
                    //supprimer sur le frontend
                    //cloner le state
                    const listPostClone = [...listPost]
                    //filtrer les posts qui ne sont pas les mêmes que l'idPost
                    const listPostFiltre = listPostClone.filter(post => post.id !== idPost)
                    //raffraichir le state
                    setListPost(listPostFiltre)
                }
                else {
                    alert('erreur')
                }
            })

    }
    // Fonctions pour modifier un Post
    useEffect(() => {//Pour visualiser l'img qu'on a choisi pour le post
        try {
            if (typeof inputUpdateImg === "string") {
                setUpdateImgFile(inputUpdateImg);
            }
            else {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    setUpdateImgFile(e.target.result);
                }
                fileReader.readAsDataURL(inputUpdateImg);
            }
        } catch (error) {
            console.log(error.message);
        }

    }, [inputUpdateImg]);
    // la fonction s'executera à chaque fois que la variable  inputUpdatImg changera
    function openModal(idPost, texte, lienImage) {
        //fonction associée au bouton de mise à jour d'un post 
        setInputUpdateContenu(texte);
        setInputUpdateImg(lienImage);
        setUpdateIdPost(idPost);
        setShowModal(true);//condition qui va afficher la modal
    }

    function hideModal() {
        setShowModal(false);//condition qui ne va pas afficher la modal
    }

    function savePost() {

        const postContenu = new FormData();//insérer un fichier dans un formulaire html
        postContenu.append("post", JSON.stringify({
            contenu: inputUpdateContenu,

        }));
        if (inputUpdateImg !== '')
            postContenu.append("image", inputUpdateImg);

        fetch('http://localhost:3001/api/posts/' + updateIdPost, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body: postContenu

        }).then(res => {
            if (res.status === 200) {
                alert('modification enregistrée avec succés !');
                fetch('http://localhost:3001/api/posts', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                    .then(res => res.json())
                    .then(data => setListPost(data))
                    .catch(err => alert(err))

                setShowModal(false);
            }
            else {
                alert('erreur: ', res.status);
            }
        }
        )
            .catch(err => alert('erreur: ', err));
    }

    return (
        <div className="container">

            <h1>File d'actualités</h1>

            <input className="form-control" type='text' placeholder="insérer le contenu du post" value={inputContenu} onChange={(e) => setInputContenu(e.target.value)} />

            <input ref={inputImgRef} className="form-control" type="file" onChange={(e) => setInputImg(e.target.files[0])} />

            <button className="btn m-auto w-25" onClick={ajouterPost}>valider</button>

            <div className='cards-list'>
                <div className="card_title title-black">
                    {listPost.map(post => <Post key={post.id} idPost={post.id} idAuthor={post.idAuthor} updatePost={openModal} supprimerCePost={supprimerUnPost} texte={post.contenu} lienImage={post.imgUrl} horodatage={post.horodatage} />)}
                </div>
            </div>

            <div className={showModal ? "modal display-modal" : "modal hide-modal"}  >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Mise à jour Post</h5>
                        <button type="button" className="close" onClick={hideModal}>
                            <span aria-hidden="true"><i class="bi bi-x-circle"></i></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input type="text" className="form-control" value={inputUpdateContenu} onChange={(e) => setInputUpdateContenu(e.target.value)} />
                        </div>
                        <div className="card_image"><img src={updateImgFile} alt="post" /></div>

                        <label>
                            <input type="file" onChange={(e) => setInputUpdateImg(e.target.files[0])} />
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={savePost}>Enregistrer</button>
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Fermer</button>
                    </div>
                </div>
            </div>





        </div>

    )
}

export default Home


