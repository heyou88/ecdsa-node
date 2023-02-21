import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'
export default function Sign ({address,  recipient,setRecipient,sendAmount, setSendAmount,privateKey, setPrivateKey}){

  const setValue = (setter) => (evt) => setter(evt.target.value)
  // const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("")
  const [recoverBit, setRecoverBit] = useState("")
  const [nounce, setNounce] = useState ("")

  // function hashMessage (message){
  //   return keccak256(utf8ToBytes(message))
  // }

  function message(){
  const message = JSON.stringify({
  recipient,
  sendAmount
})
return keccak256(utf8ToBytes(message))
}

async function getSig(evt){
   evt.preventDefault();
  if(privateKey && recipient && sendAmount){
    const sig = await secp.sign(message(), privateKey,{recovered: true})
    setSignature(sig[0].toString())
    setRecoverBit(sig[1])
    //setSignature(sig[0].toString)
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
    <div className="balance">recover bit: {recoverBit}</div>
    <input type="submit" className="button" value="Generate Signature" />
    <div>
      <h4>
        privateKey: 703bd0c6fce541daea5575c0eb046e19a3085a9a3188f770de16a6f1ec6e0344
      </h4>
      <h4>
        recipient: 049fd4c6ce31d89c3d7ff09d5aa965aae7560bb7c61ceb5c90ce26a259630a308ab0477ac630e79890bde3a6e2c52938380b0644dc57f1f4eff81d9a71bd5681a1
      </h4>
    </div>
  </div>
  </form>
);
}
