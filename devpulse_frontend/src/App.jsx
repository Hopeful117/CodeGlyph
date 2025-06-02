import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './pages/articles';
import Header from './components/header';
import About from './pages/about';

import './App.css'

function App() {
  return (
    <>
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />   
      </Routes>
    </Router>
    </>
  );
 
}

export default App
