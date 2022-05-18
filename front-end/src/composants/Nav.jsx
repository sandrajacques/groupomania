import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
      <nav>
          <ul>
    <li><Link to="/">Accueil</Link> </li>
    <li><Link to="/profil">Profil</Link> </li>
    <li><Link to="/login">Connexion</Link> </li>
    <li><Link to="/signUp">Inscription</Link> </li>
    </ul>
    </nav>
  )
}
