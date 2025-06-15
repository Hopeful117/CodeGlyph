import { createContext } from "react";
import { fetchBookmark } from "../api/articles";
import { deleteArticle } from "../api/articles";
import { saveArticle } from "../api/articles";
import{useState,useEffect,useContext}from "react"

const SavedContext = createContext();

export const SavedProvider = ({children})=>{
    const [savedUrls,setSavedUrls]=useState([]);

    const loadSaved= async ()=>{
        const res =  await fetchBookmark();
        setSavedUrls(res.data.results.map(a=>a.article_details.url));
    };

    const toggleSave = async (url)=>{
        if(savedUrls.includes(url)){
            await deleteArticle(url)
            setSavedUrls(prev=>prev.filter(u=>u !== url))

        }
        else{
            await saveArticle(url)
            setSavedUrls(prev=>[...prev,url]);
            


        }
    
    };

  useEffect(() => { loadSaved(); }, []);
  return(  <SavedContext.Provider value={{ savedUrls, toggleSave,loadSaved }}>
      {children}
    </SavedContext.Provider>
  );

}

export const useSavedArticle = () => useContext(SavedContext);