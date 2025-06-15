

import { useSavedArticle } from "../context/bookmarkContext";

export default function SaveButton({url}){
const {savedUrls,toogleSave}=useSavedArticle()
const isSaved = savedUrls.includes(url);

  
    
   


    return(
        <button className='filter-button' onClick={()=>toogleSave(url)}>{isSaved ?'forget':'save'}</button>
    )

}