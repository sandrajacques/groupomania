import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inscription() {
    return (
<div className='form-connexion'>
        <form>
            <h3>Inscription</h3>
            <div className="mb-3">
                <label>Adresse mail

                </label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Entrez votre adresse mail"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Entrez votre mot de passe"
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
                <button type="submit" className="btn btn-primary">
                    Valider
                </button>
            </div>

            {/*  <div className="text-center">
                <Button color="primary">Register</Button>
            </div> */}
        </form>
        </div>
    );
};






