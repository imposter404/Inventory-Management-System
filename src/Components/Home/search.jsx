import {useState,useContext} from 'react'
import { SearchPortal } from '../in';


export function Search({search,set}){
    const t=useContext(SearchPortal);
    const [close,setClose]=useState(false)
    
    function handelInput(e){
        set(e.target.value)
        e.target.value!="" ? setClose(true) : setClose(false)
    }

    // const search_div=
    // <>
    //             <div className="input">
    //                 <input type="text" value={search} placeholder="Search" onChange={handelInput} />
    //             </div>
    //             {close && (<div className="middle close" onClick={()=>{set("");setClose(false)}}>X</div>)}
    // </>
    return(
            <div className="search search-container">
                {/* {search_div} */}
                <div className="input">
                    <input type="text" value={search} placeholder="Search" onChange={handelInput} />
                </div>
                {close && (<div className="middle close" onClick={()=>{set("");setClose(false)}}>X</div>)}
            </div>
    )
}