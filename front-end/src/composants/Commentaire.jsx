

export default function Commentaire(props) {
  function supprimerComm() {
    props.supprimerCeComm(props.idComm);
    
  }
  return (
    <div>
      {props.textCom}
      {<button onClick={supprimerComm} className="btn btn-delete"><i className="bi bi-trash3"></i></button>}
    </div>
    
  )
}
