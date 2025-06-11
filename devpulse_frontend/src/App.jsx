import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './pages/articles';
import Header from './components/header';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';
import Bookmark from './pages/bookmark';




import './App.css'

function App() {
  return (
    <>
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />   
        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/bookmark' element={<Bookmark/>}/>
      </Routes>
    </Router>
    </>
  );
 
}

export default App
