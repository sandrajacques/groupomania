import { formatDateTime } from '../utils';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/Context';
import Commentaire from './Commentaire';


function Post(props) {
  const [listCommentaires, setListCommentaires] = useState([])
  const [inputContenu, setInputContenu] = useState('');
  const [listLikes, setListLikes] = useState([])
  const { user } = useContext(UserContext);

  const datePost = new Date(props.horodatage);

  useEffect(() => {
    const token = user.token;
    fetch('http://localhost:3001/api/commentaires/' + props.idPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setListCommentaires(data))
      .catch(err => console.log(err))

    fetch('http://localhost:3001/api/likes/' + props.idPost, {

    })
      .then(res => res.json())
      .then(data => setListLikes(data))
      .catch(err => console.log(err))
  }, [])



  function ajouterCommentaire() {
    console.log("verification input du commentaire");
    console.log(inputContenu);

    fetch('http://localhost:3001/api/commentaires', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputContenu, postId: props.idPost, userId: user.id })
    })

      .then(res => {
        if (res.status === 201) {
          res.json()
            .then(nouvelleListCommentaires => {
              setInputContenu('');
              console.log('affichage nouvelle liste');
              console.log(nouvelleListCommentaires);
              setListCommentaires(nouvelleListCommentaires);
            })
        }
        else {
          alert('erreur: ', res.status);
        }
      }
      )
      .catch(err => alert('erreur: ', err));
  }

  function supprimerPost() {
    props.supprimerCePost(props.idPost,props.lienImage);
    console.log("supprimerPost");
  }

  function supprimerUnComm(idComm) {
    //supprimer sur le backend

    fetch('http://localhost:3001/api/commentaires/' + idComm, { method: 'DELETE', })
      .then(res => {
        if (res.status === 200) {
          //supprimer sur le frontend        
          //cloner le state 
          const listCommentairesClone = [...listCommentaires]
          //filtrer les commentaires qui ne sont pas les mêmes que l'idComm
          const listCommFiltre = listCommentairesClone.filter(comm => comm.id !== idComm)
          //raffraichir le state
          setListCommentaires(listCommFiltre)
        }
        else {
          alert('erreur')
        }
      })

  }

  function ajouterLike() {
    const dejaLike=listLikes.find(like => (like.idAuthor == user.id)); 
    if (!dejaLike) {
    fetch('http://localhost:3001/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: props.idPost, idAuthor: user.id })
    })

      .then(res => {
        if (res.status === 201) {
          res.json()
            .then(nouvelleListLikes => {

              console.log('affichage nouvelle liste');
              console.log(nouvelleListLikes);
              setListLikes(nouvelleListLikes);
            })
        }
        else {
          alert('erreur: ', res.status);
        }
      }
      )
      .catch(err => alert('erreur: ', err));
      return;
    }
    fetch('http://localhost:3001/api/likes/' + props.idPost + '/' + user.id, { method: 'DELETE', })
      .then(res => {
        if (res.status === 201) {
         res.json()
         .then(resultats => setListLikes(resultats));
        }
        else {
          alert('erreur')
        }
      })
  }
  function updatePost() {
    const { idPost, texte, lienImage } = props;
    props.updatePost(idPost, texte, lienImage);
  }



  return (
    <div className="card p-3">
      <h2>{props.texte}</h2>
      {formatDateTime(datePost)}
      {/* <div className="card_title title-black"> */}

      {props.lienImage && <div className="card_image"><img src={props.lienImage} alt="post" /></div>}


      {/* <p className="id-post">{props.idPost}</p> */}



      <div className="boutons">
        
        <button onClick={ajouterLike} className="btn btn"> {listLikes.find(like => (like.idAuthor == user.id)) ? <i class="bi bi-hand-thumbs-up-fill"></i> : <i className="bi bi-hand-thumbs-up"></i>}
          {listLikes.length > 0 ? listLikes.length:"  j'aime"}
        </button>
        <button className="btn btn"><i className="bi bi-chat"></i></button>
        {((user.id === props.idAuthor) || (user.isAdmin)) ?
          <button onClick={supprimerPost} className="btn btn-delete"><i className="bi bi-trash3"></i></button>:null}
  
  {(user.id === props.idAuthor) &&
          <button onClick={updatePost} className="btn btn-delete"><i className="bi bi-pencil-square"></i></button>}


      </div>
      <div className='formAjoutCommentaire'>
        <input type='text' placeholder="insérer le contenu du post" value={inputContenu} onChange={(e) => setInputContenu(e.target.value)} />
        <button onClick={ajouterCommentaire}>valider</button>
      </div>
      <div className="listeCommentaires">
        {listCommentaires.map(commentaire => <Commentaire key={commentaire.id} userId={user.id} idAuthor={commentaire.idAuthor} textCom={commentaire.message} idComm={commentaire.id} supprimerCeComm={supprimerUnComm} />)}

      </div>
    </div>
  )
}
export default Post;