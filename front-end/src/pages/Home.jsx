import { useEffect, useState } from 'react'
import Post from '../composants/Post'


/*utilisation de useEffect pour charger les données du backend au lancement de la page*/
function Home() {
    const [listPost, setListPost] = useState([])

    const [inputContenu, setInputContenu] = useState('');
    const [inputImg, setInputImg] = useState('');

    function ajouterPost() {

        const postContenu = new FormData();
        postContenu.append("post", JSON.stringify({ post: { contenu: inputContenu } }));
        postContenu.append("image", inputImg);
    

        fetch('http://localhost:3001/api/posts', { 
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' }, 
            body:postContenu 
           // body: JSON.stringify({ post: { contenu: inputContenu } }) })
            
    }).then(res => {
                if (res.status === 201) {
                    //cloner le state listTaches
                    const listTemporaire = [...listPost];
                    //créer un nouveau post 
                    const newPost = { id: listTemporaire.length + 1, contenu: inputContenu, };
                    //ajouter la nouveau post au tableau temporaire
                    listTemporaire.push(newPost);
                    //rafraichir le state
                    setListPost(listTemporaire);
                    //vider le input
                    setInputContenu('');
                }
                else{
                    alert('erreur: ', res.status);
                }
            }              
        )
    }


useEffect(() => {
    fetch('http://localhost:3001/api/posts')
        .then(res => res.json())
        .then(data => setListPost(data))
        .catch(err => alert(err))
}, [])



//supprimer un post
function supprimerUnPost(idPost) {
    //supprimer sur le backend

    fetch('http://localhost:3001/api/posts/' + idPost, { method: 'DELETE', })
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

return (
    <div>
        <h1>File d'actualités</h1>
        <input type='text' placeholder="insérer le contenu du post" value={inputContenu} onChange={(e) => setInputContenu(e.target.value)}/>
        <label>
        <input type="file" onChange={(e)=> setInputImg(e.target.files[0])}/>
        </label>
        <button onClick={ajouterPost}>valider</button>
        <div className='cards-list'>
            {listPost.map(post => <Post key={post.id} idPost={post.id} supprimerCePost={supprimerUnPost} texte={post.contenu} />)}
        </div>
    </div>
)
}

export default Home
