import {formatDateTime} from '../utils';
import{useState, useContext} from 'react';
import{UserContext} from '../context/Context';
import Commentaire from './Commentaire';


function Post(props) {
  const [listCommentaires, setListCommentaires] = useState([])
  const [inputContenu, setInputContenu] = useState('');
  const { user } = useContext(UserContext);
 
  const datePost = new Date(props.horodatage);
  
  function ajouterCommentaire() {
    console.log("verification input du commentaire");
  console.log(inputContenu);
  
    fetch('http://localhost:3001/api/commentaires', {
      method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message:inputContenu})
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
    props.supprimerCePost(props.idPost);
    console.log("supprimerPost");
  }
  return (
    <div className="card p-3">
      <h2>{props.texte}</h2>
      {formatDateTime(datePost)}
      {/* <div className="card_title title-black"> */}

      {props.lienImage && <div className="card_image"><img src={props.lienImage} alt="post" /></div>}


      {/* <p className="id-post">{props.idPost}</p> */}



      <div className="boutons">
        <button  className="btn btn"><i className="bi bi-hand-thumbs-up"></i></button>
        <button  className="btn btn"><i className="bi bi-chat"></i></button>       
        <button onClick={supprimerPost} className="btn btn-delete"><i className="bi bi-trash3"></i></button>

      </div>
      <div className='formAjoutCommentaire'>
      <input type='text' placeholder="insérer le contenu du post" value={inputContenu} onChange={(e) => setInputContenu(e.target.value)} />
      <button onClick={ajouterCommentaire}>valider</button>
      </div>
      <div className="listeCommentaires">
      {listCommentaires.map(commentaire => <Commentaire key={commentaire.id} textCom={commentaire.message}  />)}
    
    </div>
   </div>
  )
}
export default Post;