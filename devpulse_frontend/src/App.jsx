import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/articles';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
    
      </Routes>
    </Router>
  );
 
}

export default App
