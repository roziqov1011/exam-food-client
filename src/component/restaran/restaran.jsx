import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../../context/contex";
import { RESTARANS } from "../../Query";
import "./restaran.css"

function Restaran() {
    const { categoryID  } = useParams();
    const {id, setId} = useContext(Context)
    const { data: regionData } = useQuery(RESTARANS, {
        variables: { categoryID : id }
        })
    return(
        <div className='card-list'>
    {
    regionData && regionData.Restarans.map((e, i) => (
    <div   key={i} className="card">
     <div className="card-body">
          <Link to={`branch/${e.id}`} className="card-title">{e.name}</Link>
          <button href="#" className="btn btn-primary">{e.name}</button>
        </div>
    </div>
    ))
    }
    </div>
    )
}
export default Restaran;