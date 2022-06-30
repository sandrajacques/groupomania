import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/Context'

export default function Nav() {
    const { user } = useContext(UserContext);

    return (
        <nav>
            <h3>
                Bienvenue {user.prenom + ' ' + user.nom}
            </h3>
            
            <ul className='navigation'>
                <li><Link to="/home">Accueil</Link> </li>
                <li><Link to="/profil">Profil</Link> </li>
                { !user.isAuth && <li><Link to="/login">Connexion</Link> </li>}
                {/* <li><Link to="/signUp">Inscription</Link> </li> */}
                {user.isAuth &&<li><Link to="/logout">Déconnexion</Link> </li>}

                <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text grey lighten-3" id="basic-text1">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                    <input
                        className="form-control my-0 py-1 white "
                        type="text"
                        placeholder="recherche"
                        aria-label="Search" ></input>
                </div>
            </ul>

        </nav>
    )
}
