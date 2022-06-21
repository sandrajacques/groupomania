import React from 'react'
import { useEffect, useState } from 'react'

export default function Profil() {
  const [profil, setProfil] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/user/profil/1')
      .then(res => res.json())
      .then(data => setProfil(data))
      .catch(err => alert(err))
  }, [])

  return (
    <><h1><p>{JSON.stringify(profil)}</p></h1>
    <div className="container rounded mt-5 mb-5">
      <div className="row">

        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" alt='avatar' src="" />

            <span className="font-weight-bold"></span>
            <span className="text-black-50">edogaru@mail.com.my</span>
          </div>
        </div>

        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right"> Votre Profil</h4>
              {/* <p>{JSON.stringify(profil)}</p> */}
            </div>

            <div className="row mt-2">
              <div className="col-md-6"><label className="labels">Nom</label>
                <input type="text" className="form-control" placeholder="Nom" value="" />
              </div>
              <div className="col-md-6"><label className="labels">Prénom</label>
                <input type="text" className="form-control" value="" placeholder="Prénom" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12"><label className="labels">Numéro portable</label>
                <input type="text" className="form-control" placeholder="entrer numéro de portable" value="" /></div>
              <div className="col-md-12"><label className="labels">Adresse </label>
                <input type="text" className="form-control" placeholder="entrer votre adresse" value="" /></div>
              <div className="col-md-12"><label className="labels">Complément d'adresse</label>
                <input type="text" className="form-control" placeholder="apt, Bat, etage" value="" /></div>
              <div className="col-md-12"><label className="labels">Code postal</label>
                <input type="text" className="form-control" placeholder="entrer code postal" value="" /></div>
              <div className="col-md-12"><label className="labels">Ville</label>
                <input type="text" className="form-control" placeholder="entrer votre ville" value="" /></div>
              <div className="col-md-12"><label className="labels">Pays</label>
                <input type="text" className="form-control" placeholder="entrer votre pays" value="" /></div>
              <div className="col-md-12"><label className="labels">Email</label>
                <input type="text" className="form-control" placeholder="entrer votre adresse email" value="" /></div>
              <div className="col-md-12"><label className="labels">Poste</label>
                <input type="text" className="form-control" placeholder="Poste occupé au sein de l'entreprise" value="" /></div>
            </div>

            <div className="mt-5 text-center">
              <button className="btn profile-button" type="button">Enregistrer le Profil</button>
            </div>
          </div>
        </div>

        
      </div>
    </div></>
 /*  <h1>profil</h1>
      <p>{JSON.stringify(profil)}</p> */
    
  )
} 
