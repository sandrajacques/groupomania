
function Post(props) {
  function supprimerPost() {
    props.supprimerCePost(props.idPost);
    console.log("supprimerPost");
  }
  return (
    <div className="card p-3">
      <h2>{props.texte}</h2>
      {/* <div className="card_title title-black"> */}

      {props.lienImage && <div className="card_image"><img src={props.lienImage} alt="post" /></div>}


      {/* <p className="id-post">{props.idPost}</p> */}



      <div className="boutons">
        <button  className="btn btn"><i className="bi bi-hand-thumbs-up"></i></button>
        <button  className="btn btn"><i className="bi bi-chat"></i></button>       
        <button onClick={supprimerPost} className="btn btn-delete"><i className="bi bi-trash3"></i></button>

      </div>
    </div>
    /* </div> */
  )
}
export default Post;