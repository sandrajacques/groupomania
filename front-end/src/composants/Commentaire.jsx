import { useEffect } from "react";


export default function Commentaire(props) {
  function supprimerComm() {
    props.supprimerCeComm(props.idComm);
    
  }
  useEffect(()=>{ console.log("vérification props");
  console.log(props);},[]);
 
  return (
    <div>
      {props.textCom}
      {(props.userId===props.idAuthor)&& 
      <button onClick={supprimerComm} className="btn btn-delete"><i className="bi bi-trash3"></i></button>}
    </div>
    
  )
}
