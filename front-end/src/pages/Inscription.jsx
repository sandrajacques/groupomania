import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Inscription() {
    //states pour gérer les input du formulaire d'inscription
    const [inputName, setInputName] = useState('');
    const [inputPrenom, setInputPrenom] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    //Déclation de navigate pour nous permettre de naviguer vers une autre page par programmmation
    let navigate = useNavigate();

    function envoyerFormulaire(e) {
        e.preventDefault();
        const infosInscription = { email: inputEmail, password: inputPassword, name: inputName, prenom: inputPrenom };
        // la requête http POST permet d'envoyer des données au backend
        fetch('http://localhost:3001/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(infosInscription)
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(retourBackend => {
                        alert(retourBackend.message);
                        navigate("/");//aprés vérification de l'inscription redirection vers la page d'accueil
                    })
                }
                else {
                    res.json().then(retourBackend => {
                    alert( retourBackend.message);})
                }
            }
            )
            .catch(err => alert(err))
    }
    return (
    <div className='form-connexion'>
        <form onSubmit={envoyerFormulaire}>
            <h3>Inscription</h3>
            <div className="mb-3">
                <label>Nom</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrez votre nom"
                    value={inputName} onChange={(e) => setInputName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label>Prénom</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrez votre prénom"
                    value={inputPrenom} onChange={(e) => setInputPrenom(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label>Adresse mail</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Entrez votre adresse mail"
                    value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label>Password</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Entrez votre mot de passe"
                    value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}/>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn">
                Valider l'inscription
                </button>
            </div>
        </form>
    </div>
        );
};






