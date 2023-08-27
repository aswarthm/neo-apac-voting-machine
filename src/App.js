import { useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./CONTRACT";
import {useNavigate} from "react-router-dom"
import Connection from "./Components/Connection";
import Card from "./Components/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import AddCandidate from "./Components/AddCandidate";
function App() {
  const ethers = require('ethers')
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet')
  const [errorMessage, setErrorMessage] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [candidateCount, setcandidateCount] = useState([])
  const [currentPath, setCurrentPath] = useState('/')
  const connectWalletHandler = () => {
    //console.log("hey")
    console.log(window.web3,window.ethereum)
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnectButtonText('Wallet Connected');
          console.log("hey", connectButtonText)

        })
        .catch(error => {
          setErrorMessage(error.message);

        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }
  const navigate = useNavigate();
  const routeChange = (path) => {
    setCurrentPath(path)
    navigate(path,{replace:true})
  }
  const accountChangedHandler = (newAccount) => {
    setWalletAddress(newAccount);
    console.log(walletAddress)
    updateEthers();
    console.log(contract)
  }
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  }
  //window.ethereum.on('accountsChanged', accountChangedHandler);

  //window.ethereum.on('chainChanged', chainChangedHandler);
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    console.log("1")
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    console.log("2")
    let tempContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, tempSigner);
    setContract(tempContract);
    console.log("3")
    console.log(tempContract)
  }
  const getCurrentValue = async () => {
    let val = await contract.candidateCount()
    for (let i = 1; i <= val; i++) {
      voteDetails = []
      await getCandidate(i)
    }
    setcandidateCount(candidateDetails)
  }
  let candidateDetails = []
  let voteDetails = []
  const renderedCards = () => {
    getCurrentValue()

  }
  const handleSubmit=async (e,name,party,imageUrl)=>{
    e.preventDefault()
    await contract.addCandidate(name,party,imageUrl)
  }
  const getCandidate = async (index) => {

    let candidate_info = await contract.candidates(index)
    //console.log(candidate_info)
    let vote_info = await contract.votes(index)
    voteDetails = [...voteDetails, candidate_info]
    //console.log(vote_info)
    voteDetails = [...voteDetails, vote_info]
    //console.log(voteDetails)
    candidateDetails = [...candidateDetails, voteDetails]
    console.log(candidateDetails)
  }
  const renderedCandidates = candidateCount.map((item, index) => {
    console.log(item)
    return (
      <Card item={item}></Card>
    )
  })
  const setId = (e, index) => {
    e.preventDefault()
    contract.toggle(index)
  }
  const RenderPages = () => {
    if (currentPath === "/") {
      return (
        <div>
          <Connection connectWalletHandler={connectWalletHandler} connectButtonText={connectButtonText} walletAddress={walletAddress}></Connection>
          <Button onClick={renderedCards} style={{ margin: "10px 20px " }}>Update members</Button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderedCandidates}
          </div>
          <Button onClick={() => routeChange('/addcandidate')} style={{ margin: "10px 20px " }}>Add Candidates</Button>
        </div>

      )
    }
    else if(currentPath==="/addcandidate"){
      return(
        <AddCandidate handleSubmit={handleSubmit}></AddCandidate>
      )
    }
  }

  return (
    <div className="App">
      <RenderPages></RenderPages>
    </div>
  );
}

export default App;
