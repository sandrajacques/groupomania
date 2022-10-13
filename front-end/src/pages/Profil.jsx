import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Nav from '../composants/Nav';
import avatar from '../images/avatar.png';
import { UserContext } from '../context/Context';
import { useNavigate } from "react-router-dom";

export default function Profil() {
  
  const [inputImg, setInputImg] = useState('');
  const [image, setImage] = useState(null);
  const [inputNom, setInputNom] = useState('');
  const [inputPrenom, setInputPrenom] = useState('');  
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    setInputNom(user.nom);
    setInputPrenom(user.prenom);
    setInputImg(user.photo);
    
  }, [])

  useEffect(() => {
    try {
      if (typeof inputImg === "string") {
        setImage(inputImg);
      }
      else {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setImage(e.target.result);
        }
        fileReader.readAsDataURL(inputImg);
      }
    } catch (error) {
      console.log(error.message);
    }

  }, [inputImg]);

  function changerProfil(){
    
      const profilContenu = new FormData();//insérer un fichier dans un formulaire html 
      profilContenu.append("profil", JSON.stringify({
          nom: inputNom, prenom:inputPrenom
      }));
      profilContenu.append("image", inputImg);
    
      fetch('http://localhost:3001/api/user/profil/'+ user.id, {
          method: 'PUT',
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
          body: profilContenu
          // body: JSON.stringify({ post: { contenu: inputContenu } }) })

      }).then(res => {
          if (res.status === 201) {
            alert('votre profil a bien été sauvegardé');
          }
          else {
              alert('erreur: ', res.status);
          }
      }
      )
          .catch(err => alert('erreur: ', err));
  }
  function deleteProfil(){
      
    fetch('http://localhost:3001/api/user/profil/'+ user.id, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'photo':'user.photo'
        },
      

    }).then(res => {
        if (res.status === 200) {
          alert('votre profil a bien été supprimé');
          navigate("/logout");
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
    <Nav></Nav>
    
    <div className="container rounded mt-5 mb-5">
      <div className="row">

        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="avatar" width="150px" alt='avatar' src={image ? image:avatar} />
            <input type="file" onChange={(e) => setInputImg(e.target.files[0])} />

            <span className="font-weight-bold"></span>
            
          </div>
        </div>

        <div className="col-md-5 border-right">
        {user.isAdmin ?<span className="badge badge-success">Admin</span>:null}
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right"> Votre Profil</h4>
              {/* <p>{JSON.stringify(profil)}</p> */}
            </div>

            <div className="row mt-2">
              <div className="col-md-12"><label className="labels">nom</label>
                <input type="text" className="form-control" placeholder="Nom" value={inputNom} onChange={(e) => setInputNom(e.target.value)} />
              </div>
              <div className="col-md-12 mt-3"><label className="labels">Prénom</label>
                <input type="text" className="form-control" placeholder="Prénom"  value={inputPrenom} onChange={(e) => setInputPrenom(e.target.value)} />
              </div>
            </div>

            
            <div className="mt-5 text-center">
              <button onClick={changerProfil} className="btn profile-button" type="button">Enregistrer le Profil</button>
            </div>
            <div className="mt-5 text-center">
              <button onClick={deleteProfil} className="btn btn-danger profile-button" type="button">Supprimer le Profil</button>
            </div>
          </div>
        </div>

        
      </div>
    </div></div>
  )
} 
