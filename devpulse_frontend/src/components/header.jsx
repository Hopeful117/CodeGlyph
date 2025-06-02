import { NavLink } from "react-router-dom";


export default function Header(){
    return(
        <header className="header">
            <h1 className="ibm-plex-sans-title">Devpulse</h1>
            <nav className="ibm-plex-sans-title">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            </nav>
        </header>
    )
}