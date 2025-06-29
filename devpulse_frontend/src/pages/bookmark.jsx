import { fetchBookmark } from "../api/articles"
import Article from "../components/article";
import { useState,useEffect } from "react";
import { useSavedArticle } from "../context/bookmarkContext";

export default function Bookmark(){
    const [articles, setArticles] = useState([]);
    const { savedUrls} = useSavedArticle();

    useEffect(()=>{
        const getbookMark = async() =>{
        let res;
        try {
            res=await fetchBookmark()
            setArticles(res.data.results);
        }
        catch(error) {
      console.error("error loading articles:",error)
    }
    
    }
    getbookMark()



    },[savedUrls])
   
   
    return(
        <main className="bookmark">
         {articles.map((article) => (
               <div key={article.id} className="gallery">
                      <Article url={article.url} title={article.title}source={article.source}language={article.language} date={article.published_at} description={article.summary}/> 
                
                </div>
         ))}
        
    
        </main>
         )
}