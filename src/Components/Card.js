import { useState } from "react"
import { Button } from "react-bootstrap"
function Card({item}){
    return(
        <div className="indiCard">
            <div className="cardHeader">
                <h1>Candidate Name:{item[0].name}</h1>
                <h3>Candidate Party:{item[0].party}</h3>
            </div>
            <div className="buttoncircle">
                <h3>No of votes obtained:{parseInt(item[1]._hex)}</h3>
            </div>
        </div>
    )
}
export default Card