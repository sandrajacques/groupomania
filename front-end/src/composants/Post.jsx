import Commentaire from "./Commentaire";

 function Post(props) {
   const commentaires = [
     'Commentaire 1',
      'Commentaire 2',
      'Commentaire 3',
   ]
   const texte = props.texte;
     console.log(props);
  return (
    <div className="card 1">
  <div className="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
  <div className="card_title title-white">
    <p>{texte}</p>
    <div className='commentaires'>{commentaires.map(com=> <Commentaire key={com} textCom={com}/>)}</div>
      </div>
</div>
      
  )
}




export default Post;