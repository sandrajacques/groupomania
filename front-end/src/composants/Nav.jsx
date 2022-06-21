import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>            
        {/*  <div className="input-group md-form form-sm form-1 pl-0">
                <div className="input-group-prepend">
                    <span className="input-group-text purple lighten-3" id="basic-text1">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
                    <input
                        className="form-control my-0 py-1"
                        type="text"
                        placeholder="recherche"
                        aria-label="Search" ></input>              
            </div>         */}           
            
            <ul className='navigation'>
                <li><Link to="/">Accueil</Link> </li>
                <li><Link to="/profil">Profil</Link> </li>
                <li><Link to="/login">Connexion</Link> </li>
                <li><Link to="/signUp">Inscription</Link> </li>

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
