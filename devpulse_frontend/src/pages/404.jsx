import { Link } from "react-router"

export default function Error404(){
    return(
        <main className="error"> 
            <h1>404</h1>
            <p>Oups! La page que vous demandez n'exise pas.</p>
            <Link to ={`/`} className="link">Retourner sur la page d'accueil</Link>
        </main>

    )
}