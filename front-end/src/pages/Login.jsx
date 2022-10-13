import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/Context';

export default function Login() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    let navigate = useNavigate();

    function envoyerFormulaire(e) {
        e.preventDefault();
        const infosLogin = { email: inputEmail, pwd: inputPassword };
        // la requête http POST permet d'envoyer des données au backend
        fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(infosLogin)
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(retourBackend => {
                        console.log("photo ok");
                        console.log(retourBackend);
                    setUser({...user, ...retourBackend, isAuth:true});
                    
                        navigate("/home");
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
            <form onSubmit={envoyerFormulaire}>{/*associer une action à la validation du formulaire*/}
                <h3>Connexion</h3>
                <div className="mb-3">
                    <label>Adresse mail

                    </label>
                    {/*dynamiser l'input*/}
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Entrez votre adresse mail"
                        value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Entrez votre mot de passe"
                        value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Se souvenir de moi
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn">
                        Valider
                    </button>
                </div>
                {/*  <p className="forgot-password text-right">
                Mot de passe<Link to="/Password>Forgot">Mot de passe oublié</Link> 
            </p> */}
            </form>
        </div>
    )
}


