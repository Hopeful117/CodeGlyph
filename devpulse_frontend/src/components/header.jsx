import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontext";


export default function Header(){
    const { isLoggedIn, logout } =useAuth();
   
 

  const handleLogout = () => {
   logout()
   
  
  };
    return(
        <header className="header">
            <h1 className="ibm-plex-sans-title">CodeGlyph</h1>
            <nav className="ibm-plex-sans-title">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            {isLoggedIn ? (
          <>
           <NavLink to ={'/bookmark'}>Bookmark</NavLink>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
           
           
          </>
        ) :
            <>
            <NavLink to ={'/register'}>Register</NavLink>
            <NavLink to={'/login'}>Login</NavLink>
            </>
    }
            
            </nav>
        </header>
    )
}