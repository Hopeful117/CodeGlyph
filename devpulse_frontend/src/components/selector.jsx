export default function Selector({options,onChange,value}){

    return(
        <select value={value} onChange={onChange}>
            <option value="">All</option>
             {options && options.map((option,index) => (
            <option key={index} value={option}>
              {option}
            </option>
              ))}
        </select>
        
    )
}