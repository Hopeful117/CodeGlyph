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
        <main>
         {articles.map((article) => (
                <div key={article.article} className="gallery">
                <Article url={article.article_details.url} title={article.article_details.title}source={article.article_details.source}language={article.article_details.language} date={article.article_details.published_at} summary={article.article_details.summary}/> 
                
                
                </div>
         ))}
        
    
        </main>
         )
}