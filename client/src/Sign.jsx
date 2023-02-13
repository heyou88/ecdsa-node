import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'
  function hashMessage (message){
    return keccak256(utf8ToBytes(message))
  }
export default function Sign ({address,  recipient,setRecipient,sendAmount, setSendAmount}){
  const setValue = (setter) => (evt) => setter(evt.target.value)
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("")
  const [nounce, setNounce] = useState ("")
  function message(){
const message = {
  privateKey,
  recipient,
  sendAmount
}
return hashMessage(message)
}

async function getSig(){
  if(privateKey && recipient && sendAmount){
    const sig =await secp.sign(message(), privateKey,{recovered: true})
    setSignature(sig)
    console.log(sig)
  }
}

return (
  <form className="container transfer" onSubmit={getSig}>
  <div className="container wallet">
    <h1>Signature Generator</h1>

    <label>
      private key
      <input placeholder="Type an private key" value={privateKey} onChange = {setValue(setPrivateKey)} ></input>
      {/* Address: {address.slice(0,10)}... */}
    </label>

    <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

    <div className="balance">signature: {signature}</div>
    <input type="submit" className="button" value="Generate Signature" />
  </div>
  </form>
);
}
