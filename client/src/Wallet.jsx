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
    </div>
  );
}

export default Wallet;
