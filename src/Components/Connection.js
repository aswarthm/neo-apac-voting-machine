import { Button } from "react-bootstrap"
function Connection({connectWalletHandler,connectButtonText,walletAddress}) {
    return (
        <div >
            <div className="title">
            <h1 style={{textAlign:"center",padding:"20px",fontSize:"60px"}}>
                Sarkar E-Vote
            </h1>
            </div>
            <Button style={{margin:"20px 20px 0 20px"}} onClick={connectWalletHandler}>{connectButtonText}</Button>
            <div style={{padding:"10px 20px 20px 20px"}}>
                <h3>
                    Wallet Address: {walletAddress}
                </h3>
            </div>
        </div>
    )
}
export default Connection