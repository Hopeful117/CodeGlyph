import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api/articles';
import { fetchArticlesBySource } from '../api/articles';
import { fetchSources } from '../api/articles';
import { fetchArticlesByTag } from '../api/articles';
import { fetchArticlesBySourceAndTag } from '../api/articles';
import { fetchTag } from '../api/articles';
import { fetchRepos } from '../api/articles';
import Article from '../components/article';
import Repo from '../components/repos';
import Selector from '../components/selector';


 

  

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [sources,setSources]=useState([]);
  const [tags,setTags]=useState([]);
  const [selectedSource,setSelectedSource]= useState(null);
  const [selectedTag,setSelectedTag]=useState(null);
  const [repos,SetRepos]=useState([])
  

  const loadArticles = async (page = 1) => {
    try {
       let res;
      loadTags()
      loadSources()
    if (selectedSource && selectedTag==null) {
    
      res = await fetchArticlesBySource(selectedSource, page);
      const existingTag=res.data.results.map(article=>article.language)
      const cleanTag=[...new Set(existingTag)]
      setTags(cleanTag)
    } 
    if (selectedTag && selectedSource==null){
       res = await fetchArticlesByTag(selectedTag, page);
      const existingSource=res.data.results.map(article=>article.source)
      const cleanSource=[...new Set(existingSource)]
      setSources(cleanSource)
    
      
       
      
    } 
    if (selectedTag==null && selectedSource==null){
      res = await fetchArticles(page);
      
    }
    if(selectedTag != null && selectedSource !=null){
      res = await fetchArticlesBySourceAndTag(selectedSource,selectedTag,page)
    }

    setArticles(res.data.results);
    setNextPage(res.data.next);
    setPrevPage(res.data.previous);
    }
    catch(error) {
      console.error("error loading articles:",error)
    }
  };


 



  const loadSources=async()=>{
    const res = await fetchSources();
    setSources(res.data.sources)
  }
  const loadTags=async()=>{
    const res = await fetchTag();
    setTags(res.data.tags)
  }
  const loadRepo=async()=>{
 
    const res=await fetchRepos()
    SetRepos(res.data.results)
  }





  useEffect(() => {
    loadArticles();
    loadSources()
    loadTags()
    loadRepo()
    
  }, []);


   useEffect(() => {
    loadArticles();
  }, [selectedSource,selectedTag]);
  
  
  
const watchSources=(e)=>{
  if (e.target.value !=""){
    setSelectedSource(e.target.value)
  }
  else{
    setSelectedSource(null)
  }
  }

  const watchTags=(e)=>{
  if (e.target.value !=""){
    setSelectedTag(e.target.value)
  }
  else{
    setSelectedTag(null)
  }
  }








  return (
    <main>
      <div className="articles">
      <h1 className="ibm-plex-sans-title">Articles</h1>
     
      <h3 className="ibm-plex-sans-title">Sources</h3>
      <Selector options={sources} value={selectedSource}  onChange={watchSources}></Selector>
     
      <h3 className="ibm-plex-sans-title">Tags</h3>
      <Selector options={tags} value={selectedTag}  onChange={watchTags}></Selector>
     

      {articles && articles.map((article) => (
        <div key={article.id} className="gallery">
        <Article url={article.url} title={article.title}source={article.source}language={article.language} date={article.published_at} description={article.summary}/> 
        
        
        </div>
      ))}

      <div className="pagination">
        {prevPage && <button className="filter-button" onClick={() => loadArticles(new URL(prevPage).searchParams.get('page')||'1')}>Previous</button>}
        {nextPage && <button className="filter-button" onClick={() => loadArticles(new URL(nextPage).searchParams.get('page')||'1')}>Next</button>}
      </div>
    </div>
    <div className="repo">
      <h1 className="ibm-plex-sans-title">GitHub top Repos</h1>
      {repos && repos.map((repo)=>(
        <div key={repo.id} className="gallery">
        <Repo url={repo.url} title={repo.title} description={repo.summary}/>
        </div>
    
      ))}
    </div>
        
    </main>
  );
};

export default ArticleList;