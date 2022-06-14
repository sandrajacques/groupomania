
function Post(props) {
  function supprimerPost() {
    props.supprimerCePost(props.idPost);
    console.log("supprimerPost");
  }
  return (
    <div className="card 1">
      {props.lienImage && <div className="card_image"><img src={props.lienImage} alt="post" /></div>}
      <div className="card_title title-black">
        <p>{props.texte}</p>
        <p className="id-post">{props.idPost}</p>
        <button onClick={supprimerPost} className="btn-delete">Supprimer</button>
      </div>
    </div>
  )
}
export default Post;