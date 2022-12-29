import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/Context';
import logoRouge from '../images/logo-rouge.png';

export default function Accueil() {
    const { user } = useContext(UserContext);
    return (
        <div className="presentation">
            <div className="card">
                <img className="card-img-top"
                    src={logoRouge}
                    alt="logo" />
            </div>
            <div className="card">
                <div className="card-block">
                    <h2 className="card-text">Rejoignez le réseau social de Groupomania</h2>
                    <div className="d-grid align-items-center">
                        <Link to="/signUp" className="btn">Inscription</Link>
                    </div>
                    <p className='card-text'>Vous avez déjà un compte ?</p>
                    <div className="d-grid align-items-center">
                        {
                            !user.isAuth && <Link to="/login" className='btn'>Connexion</Link>
                        }
                    {/* //si l'utilisateur n'est pas authentifié, affichage du lien de la page login */}
                    </div>
                </div>
            </div>
        </div>

    )
}
