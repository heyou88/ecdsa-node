import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex} from 'ethereum-cryptography/utils'
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {
  const [publicKey, setPublicKey] = useState("");

  async function onChange(evt) {
    const publicKey = evt.target.value;
    //const address  = toHex(secp.getPublicKey(privateKey))
    const address = publicKey
    setPublicKey(publicKey)
    setPrivateKey(privateKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        public key
        <input placeholder="Type an address, for example: 0x1" value={publicKey} onChange={onChange}></input>
        Address: {address.slice(0,10)}...
      </label>

      <div className="balance">Balance: {balance}</div>
      <div>
        <h4>public key:04561e0615f99073719c535022f34d1e52069322a8bd4d7bdff94ea585fa432fe4b1084a52e32f3a979a366cb2abdb6a848b4dba34b1c09b90fd85449b1f1fc5d4</h4>
      </div>
    </div>
  );
}

export default Wallet;
