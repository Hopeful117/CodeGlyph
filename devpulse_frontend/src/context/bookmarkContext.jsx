import { createContext, useState, useEffect, useContext } from "react";
import { fetchBookmark, deleteArticle, saveArticle } from "../api/articles";
import { useAuth } from "./authcontext";

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedUrls, setSavedUrls] = useState([]);
  const { isLoggedIn } = useAuth();

  const loadSaved = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetchBookmark();
        const urls = res.data.results.map(article => article.url);
        setSavedUrls(urls);
      } catch (error) {
        console.error("Erreur lors du chargement des articles sauvegardés :", error);
      }
    }
  };

  const toggleSave = async (url) => {
    try {
      if (savedUrls.includes(url)) {
        await deleteArticle(url);
        setSavedUrls(prev => prev.filter(u => u !== url));
      } else {
        await saveArticle(url);
        setSavedUrls(prev => [...prev, url]);
      }
    } catch (error) {
      console.error("Erreur lors du toggle save :", error);
    }
  };

  useEffect(() => {
    loadSaved();
  }, [isLoggedIn]); // relancer le chargement si l'utilisateur se connecte

  return (
    <SavedContext.Provider value={{ savedUrls, toggleSave, loadSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSavedArticle = () => useContext(SavedContext);
