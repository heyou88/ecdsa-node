import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from './Generator';
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("")
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [nounce, setNounce] = useState ("")
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey = {privateKey}
        setPrivateKey = {setPrivateKey}
      />
      <Transfer setBalance={setBalance}
                address={address}
                sendAmount={sendAmount}
                setSendAmount={setSendAmount}
                recipient={recipient}
                setRecipient={setRecipient}
                 />
      <Sign
         privateKey={privateKey}
         setPrivateKey = {setPrivateKey}
         signature = {signature}
         setSignature = {setSignature}
         sendAmount={sendAmount}
         setSendAmount={setSendAmount}
         recipient={recipient}
         setRecipient={setRecipient}
         nounce ={nounce}
         setNounce = {setNounce}/>

    </div>
  );
}

export default App;
