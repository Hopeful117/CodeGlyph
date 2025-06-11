
import { saveArticle } from "../api/articles";


export default function SaveButton({url,title,source,language,date,description}){
  
    const save = async(e)=>{
     e.preventDefault();
     saveArticle(url,title,source,language,date,description)
 
   
   


    }
    return(
        <button className='filter-button' onClick={save}>save</button>
    )

}