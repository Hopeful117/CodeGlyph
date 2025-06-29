import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './pages/articles';
import Header from './components/header';
import About from './pages/about';
import LoginSuccess from './pages/LoginSuccess';
import Login from './pages/login';
import Bookmark from './pages/bookmark';
import Error404 from './pages/404'




import './App.css'

function App() {
  return (
    <>
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />   
      
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path='/bookmark' element={<Bookmark/>}/>
        <Route path="*" element={<Error404 />} />
        
      </Routes>
    </Router>
    </>
  );
 
}

export default App
