import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/Context'

export default function Nav() {
    const { user } = useContext(UserContext);

    return (
        <nav class="d-flex align-items-center">
            <h3>
                Bienvenue {user.prenom + ' ' + user.nom}
            </h3>

            <ul className='navigation'>
                <li><Link to="/home">Accueil</Link> </li>
                <li><Link to="/profil">Profil</Link> </li>
                { !user.isAuth && <li><Link to="/login">Connexion</Link> </li>}
                {/* <li><Link to="/signUp">Inscription</Link> </li> */}
                {user.isAuth &&<li><Link to="/logout">Déconnexion</Link> </li>}


            </ul>

        </nav>
    )
}
