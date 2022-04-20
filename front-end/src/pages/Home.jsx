import {useEffect, useState} from 'react'
import Post from '../composants/Post'

/*utilisation de useEffect pour charger les données du backend au lancement de la page*/
function Home() {
    const [listPost, setListPost] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
            .then(res => res.json())
            .then(data => setListPost(data))
    }, []) 
    useEffect(() => {
        fetch('http://localhost:3001/api/commentaire/id')
            .then(res => res.json())
            .then(data => setListPost(data))
    }, []) 
    return (
        <div>
            <h1>File d'actualités</h1>
        <div className='cards-list'>
                {listPost.map(p=><Post key= {p.id} texte={p.contenu}/>)}
            </div>
            
            
        </div>
    )
}


export default Home;
