
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/Context';
import logoRouge from '../images/logo-rouge.png';

export default function Accueil() {
    const { user } = useContext(UserContext);
    return (
        <div className="presentation">
            <div className="card">

                <img className="card-img-top" src={logoRouge} alt="logo" />
            </div>

            <div className="card">
                <div className="card-block">
                    <h2 className="card-text">Rejoignez le réseau social de Groupomania</h2>

                    <div className="d-grid">
                        <button type="submit" className="btn">
                            Inscription <Link to="/signUp">Inscription</Link>
                        </button>
                    </div>
                    <p className='card-text'>Vous avez déjà un compte ?</p>

                    <div className="d-grid">
                        <button type="submit" className="btn">
                            {!user.isAuth && <li><Link to="/login">Connexion</Link> </li>}
                        </button>
                    </div>

                </div>
            </div>
        </div >

    )
}


