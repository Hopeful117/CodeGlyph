export default function Article ({url,title,source,language,date,description}){


    return(
    <div className="article">
         <a href={url} target="_blank" rel="noopener noreferrer">
            <h2 className="ibm-plex-sans-title">{title}</h2>
          </a>
          {
          description &&<p>{description}</p>
          }

          
          <p className="text-sm text-gray-600">{source} • {language}</p>
          <p>{date}</p>
    </div>
    )
}