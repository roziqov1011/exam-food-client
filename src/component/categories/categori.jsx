import "./categori.css"
import { useParams } from "react-router-dom";
import { COUNTRIES } from "../../Query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import restaran from "../restaran/restaran";
import { useContext } from "react";
import { Context } from "../../context/contex";

function Categori() {
    const {id, setId} = useContext(Context)
    const { data } = useQuery(COUNTRIES)
    return(
        <>
        <div className='card-list'>
        {
        data && data.categorys.map((e, i) => (
        <div  key={i} className="card" >
            {/* <h3 onClick={()=> setCountryID(e.id)} key={i}>{e.name}</h3> */}

            <div className="card-body">
            <Link to={`/restaran/${e.id}`} onClick={()=> setId(e.id)}>{e.name}</Link>
            <button href="#" className="btn btn-primary">{e.name}</button>
            </div>
        </div>
        ))
         }
        </div>
        </>
    )
}
export default Categori;