

import { useSavedArticle } from "../context/bookmarkContext";

export default function SaveButton({url}){
const {savedUrls,toggleSave}=useSavedArticle()
const isSaved = savedUrls.includes(url);

  
    
   


    return(
        <button className='filter-button' onClick={()=>toggleSave(url)}>{isSaved ?'forget':'save'}</button>
    )

}