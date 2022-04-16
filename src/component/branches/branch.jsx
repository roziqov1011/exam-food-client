import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { BRANCHES } from "../../Query";
import "./branch.css"

function Branch() {
    const { restaranID  } = useParams();
    const { data: branchData } = useQuery(BRANCHES, {
        variables: { restaranID }
        })
    return(
        <div className='card-list'>
    {
        branchData && branchData.Branches.map((e, i) => (
        <div key={i}    className="card">
        <div className="card-body">
            <h5 className="card-title">{e.name}</h5>
            <button  href="#" className="btn btn-primary">{e.name}</button>
            </div>
        </div>
        ))
    }
    </div>
    )
}
export default Branch;