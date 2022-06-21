
function Post(props) {
  function supprimerPost() {
    props.supprimerCePost(props.idPost);
    console.log("supprimerPost");
  }
  return (
    <div className="card">
       <h2>{props.texte}</h2>
      {/* <div className="card_title title-black"> */}

      {props.lienImage && <div className="card_image"><img src={props.lienImage} alt="post" /></div>}

     
      <p className="id-post">{props.idPost}</p>



      <div className="boutonSuppr">
        <button onClick={supprimerPost} className="btn-delete">Supprimer</button>
      </div>
    </div>
    /* </div> */
  )
}
export default Post;