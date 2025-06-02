export default function Repo ({title,url,description}){

    return(
    <div className="article">
         <a href={url} target="_blank" rel="noopener noreferrer">
            <h2 className="ibm-plex-sans-title">{title}</h2>
          </a>
          {
          description &&<p>{description}</p>
          }

        
    </div>
    )
}