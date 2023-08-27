import {useState} from "react"
import { Button } from "react-bootstrap"
function AddCandidate({handleSubmit}){
    const [name,setName]=useState('')
    const [party,setParty]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    return(
        <div>
            <div className="candidate">
            <h3 style={{textAlign:"center",padding:"20px",fontSize:"60px"}}>
                Enter the details of the candidate
            </h3>
            </div>
            <div className="details">
            <form onSubmit={(e)=>handleSubmit(e,name,party,imageUrl)}>
                <h4 style={{padding:"10px",fontSize:"30px"}}>
                    Enter the Name of the Candidate
                </h4>
                <input className="b1" type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}></input>
                <h4 style={{padding:"10px",fontSize:"30px"}}>
                    Enter the Party of the Candidate
                </h4>
                <input className="b1" type="text" placeholder="Party" onChange={(e)=>{setParty(e.target.value)}}></input>
                <h4 style={{padding:"10px",fontSize:"30px"}}>
                    Enter the image url of the candidate
                </h4>
                <input className="b1"type="text" placeholder="ImageUrl" onChange={(e)=>{setImageUrl(e.target.value)}}></input><br></br>
                <Button className="b1"type="submit">Add Candidate</Button>
            </form>
            </div>
            
        </div>
    )
}
export default AddCandidate
